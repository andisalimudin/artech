'use client'

import React, { useState } from 'react';
import { 
  Save, 
  Globe, 
  Layout, 
  Type, 
  CheckCircle2
} from 'lucide-react';
import api from '@/lib/api';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('cms');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [cmsData, setCmsData] = useState({
    headline: 'Modern Solutions for Next-Gen Tech Companies',
    subheadline: 'Streamline your project management, financial tracking, and client relations with Artech\'s all-in-one portal.',
    cta: 'Get Started'
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.post('/cms/hero', { content: cmsData });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tetapan</h1>
          <p className="text-muted-foreground mt-1">Urus platform dan kandungan laman utama anda.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? 'Menyimpan...' : (
            <>
              <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
            </>
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="h-5 w-5" />
          Tetapan berjaya dikemaskini!
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
            CMS Laman Utama
          </button>
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'general' ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-muted-foreground'
            }`}
          >
            <Globe className="h-4 w-4" />
            Tetapan Umum
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
                  <h3 className="font-bold">Seksyen Hero</h3>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tajuk Utama</label>
                    <input 
                      type="text" 
                      value={cmsData.headline}
                      onChange={(e) => setCmsData({...cmsData, headline: e.target.value})}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sub-tajuk</label>
                    <textarea 
                      value={cmsData.subheadline}
                      onChange={(e) => setCmsData({...cmsData, subheadline: e.target.value})}
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Teks Butang CTA</label>
                    <input 
                      type="text" 
                      value={cmsData.cta}
                      onChange={(e) => setCmsData({...cmsData, cta: e.target.value})}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="text-center py-10 text-muted-foreground">
              Tetapan umum akan datang...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
