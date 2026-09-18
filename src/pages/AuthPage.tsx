import React, { useState } from 'react';
import { ArrowLeft, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { ActiveTab, AuthUser, UserRole } from '../types';
import { ApiService } from '../services/api';

interface AuthPageProps {
  mode: 'login' | 'register';
  role: UserRole;
  setActiveTab: (tab: ActiveTab) => void;
  onAuthenticated: (token: string, user: AuthUser) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode, role, setActiveTab, onAuthenticated }) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(role === 'admin' ? 'admin@shopnest.in' : '');
  const [password, setPassword] = useState(role === 'admin' ? 'Admin@123' : '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = mode === 'register'
        ? await ApiService.register({ name, email, password })
        : await ApiService.login({ email, password, role });
      localStorage.setItem('shopnest_token', result.token);
      onAuthenticated(result.token, result.user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const isAdmin = role === 'admin';
  return (
    <div className="min-h-[calc(100vh-160px)] bg-[#eaeded] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm p-7 sm:p-9">
        <button onClick={() => setActiveTab('home')} className="text-sm text-[#007185] hover:underline flex items-center gap-1 mb-7"><ArrowLeft className="w-4 h-4" /> Back to shop</button>
        <div className="flex items-center gap-3 mb-6"><div className={`w-11 h-11 rounded-full flex items-center justify-center ${isAdmin ? 'bg-slate-900 text-amber-400' : 'bg-[#e8f3f3] text-[#007185]'}`}>{isAdmin ? <ShieldCheck /> : <UserRound />}</div><div><p className="text-xs uppercase tracking-widest font-bold text-[#c4552d]">{isAdmin ? 'Operations portal' : 'Customer portal'}</p><h1 className="text-2xl font-black text-[#172b3a]">{mode === 'register' ? 'Create your account' : isAdmin ? 'Admin sign in' : 'Welcome back'}</h1></div></div>
        {isAdmin && <div className="bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900 mb-5">Demo admin: <strong>admin@shopnest.in</strong> / <strong>Admin@123</strong></div>}
        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && <label className="block text-sm font-semibold text-slate-700">Full name<input value={name} onChange={event => setName(event.target.value)} required className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#ffb000]" /></label>}
          <label className="block text-sm font-semibold text-slate-700">Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} required className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#ffb000]" /></label>
          <label className="block text-sm font-semibold text-slate-700">Password<input type="password" value={password} onChange={event => setPassword(event.target.value)} minLength={8} required className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#ffb000]" /></label>
          {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</p>}
          <button disabled={busy} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-60 rounded-full py-2.5 font-bold text-slate-900">{busy ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Sign in securely'}</button>
        </form>
        {!isAdmin && <><p className="text-sm text-center text-slate-500 mt-6">{mode === 'register' ? 'Already have an account?' : 'New to ShopNest?'} <button onClick={() => setMode(mode === 'register' ? 'login' : 'register')} className="text-[#007185] font-bold hover:underline">{mode === 'register' ? 'Sign in' : 'Create an account'}</button></p><p className="text-sm text-center text-slate-500 mt-3">Store team? <button onClick={() => setActiveTab('admin')} className="text-[#007185] font-bold hover:underline">Open admin portal</button></p></>}
        <p className="text-xs text-slate-400 mt-7 flex gap-2"><LockKeyhole className="w-4 h-4 shrink-0" /> Your session is protected by a server-issued access token.</p>
      </div>
    </div>
  );
};
