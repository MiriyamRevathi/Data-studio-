import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, User, Sparkles } from 'lucide-react';
import { AppView } from '../types.ts';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (view: AppView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('analyst@dataaistudio.local');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both your username/email and password.');
      return;
    }
    // Local authentication check (pure local session)
    onLoginSuccess();
  };

  const handleDemoAccess = () => {
    setUsername('demo@dataaistudio.local');
    setPassword('demo-access');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
            D
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          DATA AI STUDIO
        </h2>
        <p className="mt-1 text-center text-sm text-slate-600">
          Sign in to your local data analytics studio
        </p>
        <div className="mt-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Authentication required to access dashboard actions</span>
          </span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="analyst@dataaistudio.local"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 font-medium">Or instant access</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-emerald-300 rounded-lg shadow-xs text-sm font-semibold text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>One-Click Demo Access</span>
              </button>
            </div>
          </div>

          {/* Return links */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className="font-medium text-slate-500 hover:text-emerald-700 transition-colors"
            >
              &larr; Return to Dashboard
            </button>
            <span className="text-slate-300">&bull;</span>
            <button
              onClick={() => onNavigate('landing')}
              className="font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Landing Page
            </button>
          </div>
        </div>

        {/* Local privacy badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No external accounts required. All sessions run locally.</span>
        </div>
      </div>
    </div>
  );
};
