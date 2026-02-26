'use client'

import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  Trash2,
  X,
  CreditCard
} from 'lucide-react';
import api from '@/lib/api';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  status: string;
  total: number;
  amountPaid: number;
  client: {
    name: string;
  };
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    date: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await api.get('/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/invoices', formData);
      setShowModal(false);
      fetchInvoices();
      setFormData({
        clientId: '',
        projectId: '',
        items: [{ description: '', quantity: 1, unitPrice: 0 }],
        date: new Date().toISOString().split('T')[0],
        dueDate: ''
      });
    } catch (error) {
      console.error('Failed to create invoice', error);
      alert('Failed to create invoice. Ensure Client ID is valid.');
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) return;
    try {
      await api.post(`/invoices/${selectedInvoiceId}/payments`, { amount: paymentAmount, date: new Date() });
      setShowPaymentModal(false);
      fetchInvoices();
      setPaymentAmount(0);
    } catch (error) {
      console.error('Failed to add payment', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await api.delete(`/invoices/${id}`);
        fetchInvoices();
      } catch (error) {
        console.error('Failed to delete invoice', error);
      }
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invois</h1>
          <p className="text-muted-foreground mt-1">Jejak pembayaran dan urus bil pelanggan.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Invois Baru
        </button>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Nombor</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Pelanggan</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Tarikh Akhir</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Jumlah</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Dibayar</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center">Memuatkan...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-4 text-center">Tiada invois ditemui.</td></tr>
              ) : invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-primary">{inv.number}</td>
                  <td className="px-6 py-4">{inv.client?.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{format(new Date(inv.dueDate), 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 font-semibold">RM {Number(inv.total).toLocaleString()}</td>
                  <td className="px-6 py-4 text-emerald-600">RM {Number(inv.amountPaid).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'OVERDUE' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {inv.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedInvoiceId(inv.id);
                          setShowPaymentModal(true);
                        }}
                        title="Add Payment"
                        className="p-2 hover:bg-slate-200 rounded-full"
                      >
                        <CreditCard className="h-4 w-4 text-emerald-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(inv.id)}
                        className="p-2 hover:bg-slate-200 rounded-full text-red-500"
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

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <div className="bg-background p-6 rounded-lg w-full max-w-2xl shadow-lg my-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Invois Baru</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Pelanggan</label>
                  <select 
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.clientId}
                    onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="">Pilih pelanggan...</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">ID Projek (Pilihan)</label>
                  <input 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.projectId}
                    onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                    placeholder="UUID"
                  />
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
                  <label className="text-sm font-medium">Tarikh Akhir</label>
                  <input 
                    type="date"
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Item</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <input 
                        placeholder="Penerangan"
                        className="w-full p-2 border rounded-md"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-20">
                      <input 
                        type="number"
                        placeholder="Kuantiti"
                        className="w-full p-2 border rounded-md"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                        min="1"
                        required
                      />
                    </div>
                    <div className="w-32">
                      <input 
                        type="number"
                        placeholder="Harga"
                        className="w-full p-2 border rounded-md"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', Number(e.target.value))}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addItem}
                  className="text-sm text-primary flex items-center mt-2 hover:underline"
                >
                  <Plus className="h-3 w-3 mr-1" /> Tambah Item
                </button>
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
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Cipta Invois
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-bold mb-4">Rekod Pembayaran</h2>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Jumlah</label>
                <input 
                  type="number"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-accent"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Simpan Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
