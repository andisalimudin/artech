// src/app/(dashboard)/layout.tsx
'use client'

import React from 'react';
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
  Menu
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <div className="flex h-screen bg-secondary/10">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-background border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold tracking-tight text-xl">AR Innovatech Solution</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === '/dashboard' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </Link>
          <Link href="/projects" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/projects') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <Briefcase className="h-5 w-5" />
            Projects
          </Link>
          <Link href="/quotations" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/quotations') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <FileText className="h-5 w-5" />
            Quotations
          </Link>
          <Link href="/invoices" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/invoices') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <Receipt className="h-5 w-5" />
            Invoices
          </Link>
          <Link href="/bookkeeping" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/bookkeeping') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <PieChart className="h-5 w-5" />
            Financials
          </Link>
          <div className="pt-4 mt-4 border-t px-3">
            <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/settings') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors mt-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-background border-b px-6 flex items-center justify-between z-10">
          <button className="md:hidden p-2 hover:bg-accent rounded-lg">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-accent rounded-full text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold leading-none">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase">{user?.role || 'Staff'}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
