// src/app/(dashboard)/dashboard/page.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Briefcase, 
  Receipt, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Layout
} from 'lucide-react';
import api from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    overdueTasks: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const projectsRes = await api.get('/projects');
      const tasksRes = await api.get('/tasks');
      
      const projects = projectsRes.data;
      const tasks = tasksRes.data;

      setStats({
        totalProjects: projects.length,
        ongoingProjects: projects.filter((p: any) => p.status === 'ONGOING').length,
        completedProjects: projects.filter((p: any) => p.status === 'COMPLETED').length,
        overdueTasks: tasks.filter((t: any) => t.status !== 'DONE' && new Date(t.dueDate) < new Date()).length
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    }
  };

  const chartData = [
    { name: 'Jan', projects: 4, tasks: 24 },
    { name: 'Feb', projects: 3, tasks: 13 },
    { name: 'Mar', projects: 2, tasks: 38 },
    { name: 'Apr', projects: 6, tasks: 40 },
    { name: 'May', projects: 4, tasks: 35 },
    { name: 'Jun', projects: 7, tasks: 45 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Papan Pemuka Utama</h1>
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-white border border-slate-200 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-slate-50 text-slate-700">
            Muat Turun Laporan
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90">
            Cipta Projek
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-slate-500">Jumlah Projek</p>
            <Layout className="h-4 w-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.totalProjects}</div>
          <p className="text-xs text-slate-500 mt-1">Keseluruhan projek</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-slate-500">Projek Sedang Berjalan</p>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.ongoingProjects}</div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="text-blue-600 font-medium">Aktif</span> sekarang
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-slate-500">Projek Selesai</p>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.completedProjects}</div>
          <p className="text-xs text-slate-500 mt-1">
            Telah disiapkan
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-slate-500">Tugasan Lewat</p>
            <AlertCircle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.overdueTasks}</div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="text-rose-600 font-medium">Perlu perhatian</span>
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-900">Pertumbuhan Projek Bulanan</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="projects" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tasks" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-900">Aktiviti Terkini</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">Tugasan Baru Dicipta</p>
                  <p className="text-xs text-slate-500">Dikemaskini oleh Admin</p>
                </div>
                <div className="text-xs text-slate-400">2j lepas</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
