// src/app/(dashboard)/projects/page.tsx
'use client'

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink,
  Calendar,
  Users,
  BarChart2
} from 'lucide-react';

const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    client: 'TechCorp Malaysia',
    status: 'ONGOING',
    progress: 65,
    budget: 25000,
    deadline: '2026-05-15',
    manager: 'Ahmad'
  },
  {
    id: '2',
    name: 'Corporate Website Development',
    client: 'Global Logistics',
    status: 'PLANNING',
    progress: 15,
    budget: 12000,
    deadline: '2026-06-30',
    manager: 'Sarah'
  },
  {
    id: '3',
    name: 'Mobile App Integration',
    client: 'FinTech Solutions',
    status: 'COMPLETED',
    progress: 100,
    budget: 45000,
    deadline: '2026-02-10',
    manager: 'David'
  }
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground mt-1">Manage and track your technology projects efficiently.</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects or clients..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-background border px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-background border px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent">
            Export CSV
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
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
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.client}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.deadline}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {project.manager}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
              <div className="text-sm font-semibold">
                RM {project.budget.toLocaleString()}
              </div>
              <button className="text-primary text-sm font-medium flex items-center hover:underline">
                View Details <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
