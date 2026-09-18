import { Request, Response } from 'express';
import { authStore, UserRole } from '../database/authStore';

const getBearerToken = (req: Request) => {
  const header = req.headers.authorization;
  return header?.startsWith('Bearer ') ? header.slice(7) : undefined;
};

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const isRateLimited = (key: string) => {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (!current || current.resetAt < now) { loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 }); return false; }
  current.count += 1;
  return current.count > 8;
};

const requireUser = (req: Request, res: Response, role?: UserRole) => {
  const user = authStore.getUserByToken(getBearerToken(req));
  if (!user || (role && user.role !== role)) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return undefined;
  }
  return user;
};

export class AuthController {
  static register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || typeof password !== 'string' || password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      res.status(400).json({ success: false, message: 'Name, email, and a password with 8+ characters, one uppercase letter, and one number are required' });
      return;
    }
    try {
      res.status(201).json({ success: true, ...authStore.register(name, email, password) });
    } catch (error) {
      res.status(409).json({ success: false, message: (error as Error).message });
    }
  }

  static login(req: Request, res: Response) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }
    if (isRateLimited(`${req.ip}:${String(email).toLowerCase()}`)) {
      res.status(429).json({ success: false, message: 'Too many sign-in attempts. Please try again in 15 minutes.' });
      return;
    }
    try {
      res.json({ success: true, ...authStore.login(email, password, role) });
    } catch (error) {
      res.status(401).json({ success: false, message: (error as Error).message });
    }
  }

  static me(req: Request, res: Response) {
    const user = requireUser(req, res);
    if (user) {
      const { passwordHash: _passwordHash, ...safeUser } = user;
      res.json({ success: true, user: safeUser });
    }
  }

  static logout(req: Request, res: Response) {
    authStore.logout(getBearerToken(req));
    res.json({ success: true });
  }

  static adminUsers(req: Request, res: Response) {
    if (!requireUser(req, res, 'admin')) return;
    res.json({ success: true, users: authStore.listUsers(), overview: authStore.getOverview(), audit: authStore.getAudit() });
  }

  static adminOverview(req: Request, res: Response) {
    if (!requireUser(req, res, 'admin')) return;
    res.json({ success: true, overview: authStore.getOverview(), audit: authStore.getAudit() });
  }

  static updateUserStatus(req: Request, res: Response) {
    const actor = requireUser(req, res, 'admin');
    if (!actor) return;
    const status = req.body.status === 'Suspended' ? 'Suspended' : 'Active';
    const user = authStore.setStatus(actor, req.params.id, status);
    if (!user) {
      res.status(404).json({ success: false, message: 'Customer not found' });
      return;
    }
    res.json({ success: true, status: user.status });
  }
}
