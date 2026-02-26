'use client'

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Trash2,
  X,
  FileText,
  Briefcase
} from 'lucide-react';
import api from '@/lib/api';
import { format } from 'date-fns';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projects: any[];
  _count: {
    projects: number;
    invoices: number;
    quotations: number;
  };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/clients', formData);
      setShowModal(false);
      fetchClients();
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
    } catch (error: any) {
      console.error('Failed to create client', error);
      const message = error.response?.data?.message || 'Gagal mencipta pelanggan baru. Sila pastikan emel unik dan cuba lagi.';
      alert(message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        await api.delete(`/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error('Failed to delete client', error);
      }
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pelanggan</h1>
          <p className="text-muted-foreground mt-1">Urus pangkalan data pelanggan dan hubungan.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Pelanggan Baru
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari pelanggan..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Clients Grid */}
      {isLoading ? (
        <div className="text-center py-10">Memuatkan pelanggan...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <div key={client.id} className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg leading-none tracking-tight mb-1 group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Mail className="mr-2 h-3 w-3" /> {client.email}
                </div>

                <div className="space-y-2 text-sm border-t pt-4">
                  {client.phone && (
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="mr-2 h-3 w-3" /> {client.phone}
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-3 w-3" /> {client.address}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-center text-xs">
                  <div>
                    <div className="font-bold text-lg">{client._count?.projects || 0}</div>
                    <div className="text-muted-foreground">Projek</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{client._count?.quotations || 0}</div>
                    <div className="text-muted-foreground">Sebut Harga</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{client._count?.invoices || 0}</div>
                    <div className="text-muted-foreground">Invois</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground text-center font-mono select-all">
                  ID: {client.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pelanggan Baru</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama Syarikat</label>
                <input 
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
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
                  Cipta Pelanggan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
