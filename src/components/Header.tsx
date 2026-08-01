import React from 'react';
import { 
  BarChart3, 
  Database, 
  LineChart, 
  Activity, 
  FileText, 
  Settings, 
  LogOut, 
  LogIn,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';
import { AppView, User } from '../types.ts';

interface HeaderProps {
  activeView?: AppView;
  currentView?: AppView;
  onNavigate: (view: AppView) => void;
  user?: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  currentView, 
  onNavigate, 
  user, 
  onLogout 
}) => {
  const current = activeView || currentView || 'dashboard';

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'visualization', label: 'Visualization', icon: LineChart },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (viewId: AppView) => {
    if (!user && viewId !== 'dashboard') {
      onNavigate('login');
      return;
    }
    onNavigate(viewId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-emerald-950/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
                D
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">
                  DATA AI STUDIO
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600">
                  Analytics & Viz
                </span>
              </div>
            </button>

            {/* Local Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Local Engine</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Auth Status, Login / Logout */}
          <div className="flex items-center gap-2.5">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                    <UserIcon className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign out and return to landing"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-md border border-slate-200 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Guest</span>
                </div>

                <button
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Return to landing"
                  className="p-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden border-t border-slate-200 bg-slate-50 px-4 py-2 flex items-center justify-between overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded ${
                isActive ? 'text-emerald-800 font-semibold' : 'text-slate-500'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
