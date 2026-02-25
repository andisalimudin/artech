'use client'

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Download,
  Calendar,
  Plus,
  Trash2,
  X,
  FileBarChart,
  Filter
} from 'lucide-react';
import api from '@/lib/api';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  account?: {
    name: string;
  };
}

export default function BookkeepingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ income: 0, expenses: 0, net: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'EXPENSE',
    category: 'General'
  });

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch transactions with date filter
      const txResponse = await api.get('/bookkeeping/transactions', {
        params: dateRange
      });
      setTransactions(txResponse.data);
      
      // Fetch P&L Report
      const pnlResponse = await api.get('/bookkeeping/reports/pnl', {
        params: dateRange
      });
      
      setStats({
        income: pnlResponse.data.income,
        expenses: pnlResponse.data.expenses,
        net: pnlResponse.data.netProfit
      });
    } catch (error) {
      console.error('Failed to fetch bookkeeping data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/bookkeeping/transactions', formData);
      setShowModal(false);
      fetchData();
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: 0,
        type: 'EXPENSE',
        category: 'General'
      });
    } catch (error) {
      console.error('Failed to create transaction', error);
      alert('Failed to save transaction');
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Description,Category,Type,Amount\n"
      + transactions.map(t => {
          return `${format(new Date(t.date), 'yyyy-MM-dd')},"${t.description}",${t.account?.name || '-'},${t.type},${t.amount}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `financial_report_${dateRange.startDate}_to_${dateRange.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground mt-1">Monitor your company's financial health.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-2 bg-card p-2 rounded-lg border shadow-sm w-fit">
        <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
        <input 
          type="date" 
          value={dateRange.startDate}
          onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
          className="bg-transparent border-none text-sm focus:ring-0"
        />
        <span className="text-muted-foreground">-</span>
        <input 
          type="date" 
          value={dateRange.endDate}
          onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
          className="bg-transparent border-none text-sm focus:ring-0"
        />
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
          <div className="text-2xl font-bold">RM {Number(stats.income).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">For selected period</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
            <div className="p-2 rounded-full bg-rose-100 text-rose-600">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM {Number(stats.expenses).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">For selected period</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Net Profit</span>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${stats.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            RM {Number(stats.net).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">For selected period</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-primary" /> 
            Recent Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Description</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">No transactions found for this period.</td></tr>
              ) : transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground">{format(new Date(tx.date), 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-xs">
                      {tx.account?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tx.type === 'INCOME' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === 'INCOME' ? '+' : '-'} RM {Number(tx.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Transaction</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateTransaction} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Description</label>
                <input 
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <input 
                    type="number"
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input 
                    type="date"
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <input 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g. Office, Sales"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
