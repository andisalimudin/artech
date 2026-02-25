// src/app/(dashboard)/quotations/page.tsx
'use client'

import React from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Mail, 
  CheckCircle2, 
  Clock, 
  MoreVertical 
} from 'lucide-react';

const mockQuotations = [
  {
    id: '1',
    number: 'QT-2026-0001',
    client: 'TechCorp Malaysia',
    date: '2026-02-20',
    total: 26500.00,
    status: 'SENT',
    expiryDate: '2026-03-20'
  },
  {
    id: '2',
    number: 'QT-2026-0002',
    client: 'Global Logistics',
    date: '2026-02-22',
    total: 12720.00,
    status: 'ACCEPTED',
    expiryDate: '2026-03-22'
  },
  {
    id: '3',
    number: 'QT-2026-0003',
    client: 'FinTech Solutions',
    date: '2026-02-25',
    total: 47700.00,
    status: 'DRAFT',
    expiryDate: '2026-03-25'
  }
];

export default function QuotationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground mt-1">Create and manage client price offers.</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Quotation
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search quotations..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Quotation Table */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Number</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Total (Inc. SST)</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockQuotations.map((qt) => (
                <tr key={qt.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-primary">{qt.number}</td>
                  <td className="px-6 py-4">{qt.client}</td>
                  <td className="px-6 py-4 text-muted-foreground">{qt.date}</td>
                  <td className="px-6 py-4 font-semibold">RM {qt.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      qt.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' :
                      qt.status === 'SENT' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {qt.status === 'ACCEPTED' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {qt.status === 'SENT' && <Clock className="mr-1 h-3 w-3" />}
                      {qt.status}
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
