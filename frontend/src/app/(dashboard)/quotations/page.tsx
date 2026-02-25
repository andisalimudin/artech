'use client'

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Mail, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Trash2,
  X,
  FileOutput
} from 'lucide-react';
import api from '@/lib/api';
import { format } from 'date-fns';

interface Quotation {
  id: string;
  number: string;
  date: string;
  expiryDate: string;
  status: string;
  total: number;
  client: {
    name: string;
  };
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clients, setClients] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    date: new Date().toISOString().split('T')[0],
    expiryDate: ''
  });

  useEffect(() => {
    fetchQuotations();
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

  const fetchQuotations = async () => {
    try {
      const response = await api.get('/quotations');
      setQuotations(response.data);
    } catch (error) {
      console.error('Failed to fetch quotations', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/quotations', formData);
      setShowModal(false);
      fetchQuotations();
      setFormData({
        clientId: '',
        projectId: '',
        items: [{ description: '', quantity: 1, unitPrice: 0 }],
        date: new Date().toISOString().split('T')[0],
        expiryDate: ''
      });
    } catch (error) {
      console.error('Failed to create quotation', error);
      alert('Failed to create quotation. Ensure Client ID is valid.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await api.delete(`/quotations/${id}`);
        fetchQuotations();
      } catch (error) {
        console.error('Failed to delete quotation', error);
      }
    }
  };

  const handleConvertToInvoice = async (id: string) => {
    if (confirm('Convert this quotation to an invoice?')) {
      try {
        await api.post(`/quotations/${id}/convert-to-invoice`);
        alert('Quotation converted to invoice successfully!');
        fetchQuotations();
      } catch (error) {
        console.error('Failed to convert quotation', error);
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
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground mt-1">Create and manage client price offers.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> New Quotation
        </button>
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
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : quotations.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center">No quotations found.</td></tr>
              ) : quotations.map((qt) => (
                <tr key={qt.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-primary">{qt.number}</td>
                  <td className="px-6 py-4">{qt.client?.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{format(new Date(qt.date), 'MMM d, yyyy')}</td>
                  <td className="px-6 py-4 font-semibold">RM {Number(qt.total).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      qt.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' :
                      qt.status === 'SENT' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {qt.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleConvertToInvoice(qt.id)}
                        title="Convert to Invoice"
                        className="p-2 hover:bg-slate-200 rounded-full"
                      >
                        <FileOutput className="h-4 w-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(qt.id)}
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
              <h2 className="text-xl font-bold">New Quotation</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateQuotation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <select 
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.clientId}
                    onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="">Select a client...</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Project ID (Optional)</label>
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
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input 
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Items</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <input 
                        placeholder="Description"
                        className="w-full p-2 border rounded-md"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-20">
                      <input 
                        type="number"
                        placeholder="Qty"
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
                        placeholder="Price"
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
                  <Plus className="h-3 w-3 mr-1" /> Add Item
                </button>
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
                  Create Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
