'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Receipt, 
  PieChart, 
  Settings, 
  LogOut, 
  Zap,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Gambaran Keseluruhan', icon: LayoutDashboard },
    { href: '/clients', label: 'Pelanggan', icon: User },
    { href: '/projects', label: 'Projek', icon: Briefcase },
    { href: '/quotations', label: 'Sebut Harga', icon: FileText },
    { href: '/invoices', label: 'Invois', icon: Receipt },
    { href: '/bookkeeping', label: 'Kewangan', icon: PieChart },
    { href: '/settings', label: 'Tetapan', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50/50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold tracking-tight text-xl text-slate-800">AR Innovatech</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
                pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')
                  ? 'bg-primary text-white shadow-md shadow-primary/25' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`h-4 w-4 ${pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard') ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
              {item.label}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors mt-8 font-medium text-sm group"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-500" />
            Log Keluar
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="relative w-72 flex flex-col bg-white h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <span className="font-bold tracking-tight text-xl text-slate-800">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors mt-8 font-medium"
              >
                <LogOut className="h-5 w-5" />
                Log Keluar
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/50">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 flex items-center justify-between z-10 sticky top-0">
          <button 
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Mobile Logo (Centered) */}
          <div className="md:hidden flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-lg text-slate-800">AR Innovatech</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500 mt-1">{user?.email || 'admin@example.com'}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
                {user?.name?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
