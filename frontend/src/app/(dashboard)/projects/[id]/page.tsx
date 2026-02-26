'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { format } from 'date-fns';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Layout, 
  List, 
  MessageSquare, 
  MoreVertical, 
  Paperclip, 
  Plus, 
  Settings, 
  Users,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  dueDate: string;
  assignedTo?: {
    name: string;
  };
}

interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  client: {
    name: string;
  };
  tasks: Task[];
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '',
    assignedToId: ''
  });

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${params.id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Failed to fetch project details', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks', {
        ...taskForm,
        projectId: params.id
      });
      setShowTaskModal(false);
      fetchProjectDetails(); // Refresh to show new task and update progress
      setTaskForm({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '',
        assignedToId: ''
      });
    } catch (error) {
      console.error('Failed to create task', error);
      alert('Gagal mencipta tugasan');
    }
  };

  if (isLoading) return <div className="p-8 text-center">Memuatkan butiran projek...</div>;
  if (!project) return <div className="p-8 text-center text-red-500">Projek tidak ditemui</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                {project.code}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                project.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                project.status === 'ONGOING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-slate-500 max-w-2xl">{project.description || 'Tiada penerangan'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
              <Settings className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" /> Tugasan Baru
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
          <div>
            <div className="text-sm text-slate-500 mb-1">Pelanggan</div>
            <div className="font-medium text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              {project.client?.name}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Tarikh Akhir</div>
            <div className="font-medium text-slate-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              {project.endDate ? format(new Date(project.endDate), 'MMM d, yyyy') : '-'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">Bajet</div>
            <div className="font-medium text-slate-900">
              RM {Number(project.budget).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1 flex justify-between">
              <span>Kemajuan</span>
              <span className="text-primary font-bold">{project.progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'tasks' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Tugasan
        </button>
        <button 
          onClick={() => setActiveTab('files')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'files' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Fail & Dokumen
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'activity' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Aktiviti
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              {['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].map((status) => (
                <div key={status} className="bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-slate-700">
                      {status === 'TODO' ? 'Untuk Dilakukan' : 
                       status === 'IN_PROGRESS' ? 'Sedang Berjalan' :
                       status === 'REVIEW' ? 'Semakan' : 'Selesai'}
                    </h3>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">
                      {project.tasks?.filter(t => t.status === status).length || 0}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {project.tasks?.filter(t => t.status === status).map((task) => (
                      <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                            task.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            task.priority === 'HIGH' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm text-slate-900 mb-1">{task.title}</h4>
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : '-'}
                          </div>
                          {task.assignedTo && (
                            <div className="flex items-center gap-1">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {task.assignedTo.name[0]}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {project.tasks?.filter(t => t.status === status).length === 0 && (
                      <div className="text-center py-4 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        Tiada tugasan
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Paperclip className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-slate-900 font-medium">Tiada fail dimuat naik</h3>
            <p className="text-slate-500 text-sm mt-1">Muat naik dokumen berkaitan projek di sini.</p>
            <button className="mt-4 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              Muat Naik Fail
            </button>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <List className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-slate-900 font-medium">Tiada aktiviti direkodkan</h3>
            <p className="text-slate-500 text-sm mt-1">Log aktiviti projek akan muncul di sini.</p>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Tugasan Baru</h2>
              <button onClick={() => setShowTaskModal(false)}><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Tajuk Tugasan</label>
                <input 
                  required
                  className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Penerangan</label>
                <textarea 
                  className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <select 
                    className="w-full mt-1 p-2 border border-slate-300 rounded-lg"
                    value={taskForm.status}
                    onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                  >
                    <option value="TODO">Untuk Dilakukan</option>
                    <option value="IN_PROGRESS">Sedang Berjalan</option>
                    <option value="REVIEW">Semakan</option>
                    <option value="DONE">Selesai</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Prioriti</label>
                  <select 
                    className="w-full mt-1 p-2 border border-slate-300 rounded-lg"
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                  >
                    <option value="LOW">Rendah</option>
                    <option value="MEDIUM">Sederhana</option>
                    <option value="HIGH">Tinggi</option>
                    <option value="CRITICAL">Kritikal</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Tarikh Akhir</label>
                <input 
                  type="date"
                  className="w-full mt-1 p-2 border border-slate-300 rounded-lg"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium shadow-sm"
                >
                  Cipta Tugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
