// src/app/(dashboard)/invoices/page.tsx
'use client'

import React from 'react';
import { 
  Plus, 
  Search, 
  Receipt, 
  Download, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';

const mockInvoices = [
  {
    id: '1',
    number: 'INV-2026-0001',
    client: 'TechCorp Malaysia',
    date: '2026-02-21',
    dueDate: '2026-03-21',
    total: 26500.00,
    amountPaid: 26500.00,
    status: 'PAID'
  },
  {
    id: '2',
    number: 'INV-2026-0002',
    client: 'Global Logistics',
    date: '2026-02-23',
    dueDate: '2026-03-23',
    total: 12720.00,
    amountPaid: 0.00,
    status: 'UNPAID'
  },
  {
    id: '3',
    number: 'INV-2026-0003',
    client: 'FinTech Solutions',
    date: '2026-01-15',
    dueDate: '2026-02-15',
    total: 47700.00,
    amountPaid: 10000.00,
    status: 'OVERDUE'
  }
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">Track payments and manage client billing.</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Invoice
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
              <h4 className="text-xl font-bold">RM 36,500.00</h4>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h4 className="text-xl font-bold">RM 12,720.00</h4>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <h4 className="text-xl font-bold">RM 37,700.00</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Invoice #</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Due Date</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Total</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Balance</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-primary flex items-center gap-1">
                    {inv.number}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="px-6 py-4">{inv.client}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.dueDate}</td>
                  <td className="px-6 py-4 font-semibold">RM {inv.total.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-rose-600">
                    RM {(inv.total - inv.amountPaid).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'UNPAID' ? 'bg-blue-100 text-blue-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {inv.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-200 rounded-md transition-colors" title="Download PDF">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-md transition-colors" title="Email Client">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-md transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
