import { createHash, randomBytes, scryptSync } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export type UserRole = 'customer' | 'admin';
export type AccountStatus = 'Active' | 'Suspended';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: AccountStatus;
  joinedAt: string;
  lastLoginAt?: string;
  orders: number;
}

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface AuditEvent {
  id: string;
  type: 'REGISTER' | 'LOGIN' | 'LOGOUT' | 'STATUS_CHANGE';
  actorId: string;
  actorEmail: string;
  targetId?: string;
  details: string;
  timestamp: string;
}

interface PersistedData {
  users: AuthUser[];
  sessions: Session[];
  audit: AuditEvent[];
}

const dataPath = process.env.AUTH_DATA_FILE || path.join(process.cwd(), 'data', 'auth-data.json');
const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
};
const verifyPassword = (password: string, stored: string) => {
  const [salt, digest] = stored.split(':');
  return Boolean(salt && digest) && scryptSync(password, salt, 64).toString('hex') === digest;
};

class AuthStore {
  private data: PersistedData;

  constructor() {
    this.data = this.load();
  }

  register(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.data.users.some(user => user.email === normalizedEmail)) throw new Error('An account with this email already exists');
    const user: AuthUser = {
      id: `usr-${randomBytes(5).toString('hex')}`,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      role: 'customer',
      status: 'Active',
      joinedAt: new Date().toISOString(),
      orders: 0,
    };
    this.data.users.push(user);
    this.record('REGISTER', user, `Customer account created for ${user.name}`);
    this.save();
    return this.createSession(user);
  }

  login(email: string, password: string, role?: UserRole) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.data.users.find(candidate => candidate.email === normalizedEmail);
    if (!user || !verifyPassword(password, user.passwordHash)) throw new Error('Email or password is incorrect');
    if (role && user.role !== role) throw new Error('This account does not have access to this portal');
    if (user.status === 'Suspended') throw new Error('This account has been suspended by an administrator');
    user.lastLoginAt = new Date().toISOString();
    this.record('LOGIN', user, `${user.role} signed in`);
    this.save();
    return this.createSession(user);
  }

  getUserByToken(token: string | undefined) {
    const session = this.data.sessions.find(item => item.token === token && new Date(item.expiresAt) > new Date());
    return session ? this.data.users.find(user => user.id === session.userId) : undefined;
  }

  logout(token: string | undefined) {
    const session = this.data.sessions.find(item => item.token === token);
    const user = session ? this.data.users.find(item => item.id === session.userId) : undefined;
    if (session) this.data.sessions = this.data.sessions.filter(item => item.token !== token);
    if (user) this.record('LOGOUT', user, `${user.role} signed out`);
    this.save();
  }

  listUsers() {
    return this.data.users.map(({ passwordHash: _passwordHash, ...user }) => user);
  }

  getAudit() {
    return [...this.data.audit].reverse().slice(0, 200);
  }

  getOverview() {
    return {
      totalUsers: this.data.users.filter(user => user.role === 'customer').length,
      activeUsers: this.data.users.filter(user => user.role === 'customer' && user.status === 'Active').length,
      suspendedUsers: this.data.users.filter(user => user.role === 'customer' && user.status === 'Suspended').length,
      totalLogins: this.data.audit.filter(event => event.type === 'LOGIN').length,
      totalRegistrations: this.data.audit.filter(event => event.type === 'REGISTER').length,
      activeSessions: this.data.sessions.filter(session => new Date(session.expiresAt) > new Date()).length,
    };
  }

  setStatus(actor: AuthUser, userId: string, status: AccountStatus) {
    const user = this.data.users.find(candidate => candidate.id === userId && candidate.role === 'customer');
    if (!user) return undefined;
    user.status = status;
    this.record('STATUS_CHANGE', actor, `Account ${user.email} changed to ${status}`, user.id);
    this.save();
    return user;
  }

  private createSession(user: AuthUser) {
    const session: Session = {
      token: randomBytes(24).toString('hex'),
      userId: user.id,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    };
    this.data.sessions = this.data.sessions.filter(item => new Date(item.expiresAt) > new Date());
    this.data.sessions.push(session);
    this.save();
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return { token: session.token, user: safeUser };
  }

  private record(type: AuditEvent['type'], actor: AuthUser, details: string, targetId?: string) {
    this.data.audit.push({ id: `evt-${randomBytes(5).toString('hex')}`, type, actorId: actor.id, actorEmail: actor.email, targetId, details, timestamp: new Date().toISOString() });
  }

  private load(): PersistedData {
    if (existsSync(dataPath)) return JSON.parse(readFileSync(dataPath, 'utf8')) as PersistedData;
    const admin: AuthUser = { id: 'usr-admin', name: 'Store Administrator', email: 'admin@shopnest.in', passwordHash: hashPassword('Admin@123'), role: 'admin', status: 'Active', joinedAt: new Date().toISOString(), orders: 0 };
    const initialData = { users: [admin], sessions: [], audit: [] };
    this.write(initialData);
    return initialData;
  }

  private save() { this.write(this.data); }

  private write(data: PersistedData) {
    mkdirSync(path.dirname(dataPath), { recursive: true });
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  }
}

export const authStore = new AuthStore();
