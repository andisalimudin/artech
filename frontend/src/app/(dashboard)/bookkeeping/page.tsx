// src/app/(dashboard)/bookkeeping/page.tsx
'use client'

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RechartsPieChart,
  Pie
} from 'recharts';

const pnlData = [
  { name: 'Jan', income: 45000, expenses: 32000 },
  { name: 'Feb', income: 52000, expenses: 28000 },
  { name: 'Mar', income: 48000, expenses: 35000 },
  { name: 'Apr', income: 61000, expenses: 40000 },
  { name: 'May', income: 55000, expenses: 38000 },
  { name: 'Jun', income: 67000, expenses: 42000 },
];

const expenseBreakdown = [
  { name: 'Payroll', value: 25000, color: '#3b82f6' },
  { name: 'Software', value: 8000, color: '#10b981' },
  { name: 'Marketing', value: 5000, color: '#f59e0b' },
  { name: 'Office', value: 2000, color: '#ef4444' },
];

export default function BookkeepingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground mt-1">Monitor your company's financial health and tax reports.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-background border px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent">
            <Calendar className="mr-2 h-4 w-4" /> This Year
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Income</span>
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM 328,000.00</div>
          <p className="text-xs text-muted-foreground mt-1 text-emerald-600 font-medium">+12.5% vs last year</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
            <div className="p-2 rounded-full bg-rose-100 text-rose-600">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM 215,000.00</div>
          <p className="text-xs text-muted-foreground mt-1 text-rose-600 font-medium">+5.2% vs last year</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Net Profit</span>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM 113,000.00</div>
          <p className="text-xs text-muted-foreground mt-1 text-blue-600 font-medium">34.4% Margin</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Income vs Expenses Bar Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Income vs Expenses</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Income
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                Expenses
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pnlData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `RM${value/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenses" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown Pie Chart */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-bold mb-6">Expense Breakdown</h3>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">RM {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links / Sub-reports */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Balance Sheet', icon: <PieChart className="h-5 w-5" />, color: 'bg-blue-50 text-blue-600' },
          { title: 'Profit & Loss', icon: <TrendingUp className="h-5 w-5" />, color: 'bg-emerald-50 text-emerald-600' },
          { title: 'Cash Flow', icon: <Wallet className="h-5 w-5" />, color: 'bg-amber-50 text-amber-600' },
          { title: 'Tax (SST) Report', icon: <Filter className="h-5 w-5" />, color: 'bg-purple-50 text-purple-600' },
        ].map((report) => (
          <button key={report.title} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${report.color}`}>
                {report.icon}
              </div>
              <span className="font-medium">{report.title}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}
