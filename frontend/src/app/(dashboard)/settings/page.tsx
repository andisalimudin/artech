// src/app/(dashboard)/settings/page.tsx
'use client'

import React, { useState } from 'react';
import { 
  Save, 
  Globe, 
  Layout, 
  Image as ImageIcon, 
  Type, 
  Plus, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('cms');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your platform and landing page content.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="h-5 w-5" />
          Settings updated successfully!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs Sidebar */}
        <aside className="w-full md:w-64 space-y-1">
          <button 
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'cms' ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            <Layout className="h-4 w-4" />
            Landing Page CMS
          </button>
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'general' ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            <Globe className="h-4 w-4" />
            General Settings
          </button>
        </aside>

        {/* Tab Content */}
        <div className="flex-1 space-y-8 max-w-3xl">
          {activeTab === 'cms' && (
            <div className="space-y-8">
              {/* Hero Section CMS */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Type className="h-4 w-4 text-primary" />
                  <h3 className="font-bold">Hero Section</h3>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Headline</label>
                    <input 
                      type="text" 
                      defaultValue="Modern Solutions for Next-Gen Tech Companies"
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sub-headline</label>
                    <textarea 
                      rows={3}
                      defaultValue="Streamline your project management, financial tracking, and client relations with Artech's all-in-one portal."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </section>

              {/* Services Section CMS */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4 text-primary" />
                    <h3 className="font-bold">Services</h3>
                  </div>
                  <button className="text-xs font-medium text-primary hover:underline">Add Service</button>
                </div>
                <div className="space-y-4">
                  {['Software Development', 'Cloud Computing'].map((service, i) => (
                    <div key={i} className="p-4 rounded-xl border bg-slate-50/50 flex gap-4">
                      <div className="flex-1 space-y-3">
                        <input 
                          type="text" 
                          defaultValue={service}
                          className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm font-medium"
                        />
                        <textarea 
                          rows={2}
                          placeholder="Service description..."
                          className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                        />
                      </div>
                      <button className="text-rose-500 hover:text-rose-600 self-start p-2">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Theme Settings */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <h3 className="font-bold">Branding & Theme</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Theme Color</label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-md bg-blue-600 border cursor-pointer ring-2 ring-primary ring-offset-2"></div>
                      <div className="h-10 w-10 rounded-md bg-emerald-600 border cursor-pointer hover:ring-2 hover:ring-emerald-600/50 ring-offset-2"></div>
                      <div className="h-10 w-10 rounded-md bg-indigo-600 border cursor-pointer hover:ring-2 hover:ring-indigo-600/50 ring-offset-2"></div>
                      <div className="h-10 w-10 rounded-md bg-slate-900 border cursor-pointer hover:ring-2 hover:ring-slate-900/50 ring-offset-2"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          
          {activeTab === 'general' && (
            <div className="p-12 text-center border-2 border-dashed rounded-xl text-muted-foreground">
              General configuration settings will be here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
