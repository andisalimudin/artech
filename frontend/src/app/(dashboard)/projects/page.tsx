'use client'

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Calendar,
  Users,
  BarChart2,
  Trash2,
  X
} from 'lucide-react';
import api from '@/lib/api';
import { format } from 'date-fns';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  budget: number;
  progress: number;
  startDate: string;
  endDate: string;
  client: {
    name: string;
  };
}

interface Client {
  id: string;
  name: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '', 
    status: 'PLANNING',
    budget: 0,
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await api.get(`/clients?t=${new Date().getTime()}`);
      console.log('Fetched clients for project form:', response.data.length);
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert('Sila pilih pelanggan dari senarai.');
      return;
    }
    
    try {
      console.log('Creating project with data:', formData);
      await api.post('/projects', formData);
      setShowModal(false);
      fetchProjects();
      setFormData({
        name: '',
        description: '',
        clientId: '',
        status: 'PLANNING',
        budget: 0,
        startDate: '',
        endDate: ''
      });
      alert('Projek berjaya dicipta!');
    } catch (error: any) {
      console.error('Failed to create project', error);
      // More detailed error message if available
      const message = error.response?.data?.message || 'Gagal mencipta projek. Sila cuba lagi.';
      alert(message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengurusan Projek</h1>
          <p className="text-muted-foreground mt-1">Urus dan jejak projek teknologi anda dengan cekap.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Projek Baru
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari projek atau pelanggan..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="text-center py-10">Memuatkan projek...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    project.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                    project.status === 'ONGOING' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {project.status}
                  </div>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg leading-none tracking-tight mb-2 group-hover:text-primary transition-colors">
                  <a href={`/projects/${project.id}`} className="hover:underline">
                    {project.name}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  <Users className="inline h-3 w-3 mr-1" />
                  {project.client?.name || 'Pelanggan Tidak Diketahui'}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <BarChart2 className="mr-2 h-4 w-4" /> Kemajuan
                    </span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  
                  <div className="pt-4 border-t flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {project.endDate ? format(new Date(project.endDate), 'MMM d, yyyy') : 'Tiada Tarikh Akhir'}
                    </div>
                    <div className="font-medium">
                      RM {Number(project.budget).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Projek Baru</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nama Projek</label>
                <input 
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Pelanggan</label>
                <select 
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                >
                  <option value="">-- Pilih Pelanggan --</option>
                  {clients.length > 0 ? (
                    clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))
                  ) : (
                    <option disabled>Tiada pelanggan dijumpai</option>
                  )}
                </select>
                {clients.length === 0 && (
                  <p className="text-xs text-rose-500 mt-1">
                    Tiada pelanggan dalam sistem. Sila pergi ke halaman Pelanggan untuk menambah data dahulu.
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Penerangan</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Bajet (RM)</label>
                  <input 
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="PLANNING">Perancangan</option>
                    <option value="ONGOING">Sedang Berjalan</option>
                    <option value="COMPLETED">Selesai</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tarikh Mula</label>
                  <input 
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tarikh Tamat</label>
                  <input 
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
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
                  Cipta Projek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
