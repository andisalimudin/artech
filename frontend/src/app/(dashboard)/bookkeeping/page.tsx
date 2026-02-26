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
  Upload,
  Pencil,
  ExternalLink
} from 'lucide-react';
import api from '@/lib/api';
import { format, startOfMonth, endOfMonth } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  account?: {
    name: string;
  };
  receiptUrl?: string;
}

export default function BookkeepingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({ income: 0, expenses: 0, net: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  });

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'EXPENSE',
    category: 'General',
    receiptUrl: ''
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
      if (editingId) {
        await api.put(`/bookkeeping/transactions/${editingId}`, formData);
      } else {
        await api.post('/bookkeeping/transactions', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchData();
      resetForm();
    } catch (error) {
      console.error('Failed to save transaction', error);
      alert('Gagal menyimpan transaksi');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Adakah anda pasti mahu memadam transaksi ini?')) return;
    try {
      await api.delete(`/bookkeeping/transactions/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete transaction', error);
      alert('Gagal memadam transaksi');
    }
  };

  const handleEdit = (tx: Transaction) => {
    setFormData({
      date: format(new Date(tx.date), 'yyyy-MM-dd'),
      description: tx.description,
      amount: Number(tx.amount),
      type: tx.type,
      category: tx.account?.name || 'General',
      receiptUrl: tx.receiptUrl || ''
    });
    setEditingId(tx.id);
    setShowModal(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const response = await api.post('/bookkeeping/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, receiptUrl: response.data.url }));
    } catch (error) {
      console.error('Upload failed', error);
      alert('Gagal memuat naik fail');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: format(new Date(), 'yyyy-MM-dd'),
      description: '',
      amount: 0,
      type: 'EXPENSE',
      category: 'General',
      receiptUrl: ''
    });
    setEditingId(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Laporan Kewangan</h1>
          <p className="text-muted-foreground mt-1">Pantau kesihatan kewangan syarikat anda.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="mr-2 h-4 w-4" /> Eksport CSV
          </button>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Transaksi
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
            <span className="text-sm font-medium text-muted-foreground">Jumlah Pendapatan</span>
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM {Number(stats.income).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Untuk tempoh terpilih</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Jumlah Perbelanjaan</span>
            <div className="p-2 rounded-full bg-rose-100 text-rose-600">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">RM {Number(stats.expenses).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Untuk tempoh terpilih</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Keuntungan Bersih</span>
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${stats.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            RM {Number(stats.net).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Untuk tempoh terpilih</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-primary" /> 
            Transaksi Terkini
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Tarikh</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Penerangan</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Kategori</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Jenis</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Resit</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Jumlah</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center">Memuatkan...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center">Tiada transaksi ditemui untuk tempoh ini.</td></tr>
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
                      {tx.type === 'INCOME' ? 'Pendapatan' : 'Perbelanjaan'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {tx.receiptUrl ? (
                      <a 
                        href={`${process.env.NEXT_PUBLIC_API_URL}${tx.receiptUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 text-xs"
                      >
                        <ExternalLink className="h-3 w-3" /> Lihat
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === 'INCOME' ? '+' : '-'} RM {Number(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(tx)}
                        className="p-1 text-slate-500 hover:text-primary transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(tx.id)}
                        className="p-1 text-slate-500 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? 'Kemaskini Transaksi' : 'Tambah Transaksi'}</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateTransaction} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Penerangan</label>
                <input 
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Jumlah (RM)</label>
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
                  <label className="text-sm font-medium">Jenis</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="EXPENSE">Perbelanjaan</option>
                    <option value="INCOME">Pendapatan</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tarikh</label>
                  <input 
                    type="date"
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Kategori</label>
                  <input 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="cth. Pejabat, Jualan"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Muat Naik Resit</label>
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleUpload}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label 
                    htmlFor="receipt-upload"
                    className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent w-full text-sm"
                  >
                    <Upload className="h-4 w-4" />
                    {isUploading ? 'Memuat naik...' : 'Pilih Fail'}
                  </label>
                </div>
                {formData.receiptUrl && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Resit dilampirkan
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {editingId ? 'Kemaskini' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
