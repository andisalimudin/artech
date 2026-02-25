// src/app/(public)/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layout, 
  Shield, 
  Zap, 
  Globe, 
  MessageSquare, 
  BarChart3,
  Layers,
  Smartphone,
  Users
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 group" href="#">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">AR Innovatech Solution</span>
        </Link>
        <nav className="ml-auto flex gap-8 items-center hidden md:flex">
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#services">
            Services
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" href="/login">
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-primary bg-primary/5 border-primary/10">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v2.0 is now live
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
                Modern Solutions for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Next-Gen Tech Companies</span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl leading-relaxed">
                Streamline your project management, financial tracking, and client relations with AR Innovatech Solution's all-in-one enterprise portal. Built for scale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login" className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-medium text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#features" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-base font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300">
                  View Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200/60 mt-12 w-full max-w-2xl">
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">$2M+</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Transactions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-500 font-medium mt-1">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Everything you need to scale
              </h2>
              <p className="text-lg text-slate-600">
                Our platform provides comprehensive tools designed specifically for the modern technology industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Layout,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  title: "Project Management",
                  desc: "Track project progress, budgets, and team assignments in real-time with intuitive Kanban boards."
                },
                {
                  icon: BarChart3,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                  title: "Financial Analytics",
                  desc: "Detailed P&L reports, balance sheets, and cash flow statements generated automatically."
                },
                {
                  icon: Shield,
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                  title: "Enterprise Security",
                  desc: "Bank-grade encryption and Role-based access control (RBAC) to keep your sensitive data protected."
                },
                {
                  icon: Smartphone,
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                  title: "Mobile Responsive",
                  desc: "Access your dashboard from anywhere. Fully optimized for mobile and tablet devices."
                },
                {
                  icon: Globe,
                  color: "text-cyan-600",
                  bg: "bg-cyan-50",
                  title: "Global Invoicing",
                  desc: "Create and send multi-currency invoices compliant with international tax regulations."
                },
                {
                  icon: Users,
                  color: "text-rose-600",
                  bg: "bg-rose-50",
                  title: "Team Collaboration",
                  desc: "Built-in chat, file sharing, and task comments to keep your team aligned and productive."
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                  <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="container px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Ready to transform your business?
            </h2>
            <p className="mx-auto max-w-[600px] text-slate-300 text-lg mb-10">
              Join hundreds of forward-thinking companies that trust AR Innovatech Solution for their operations.
            </p>
            <Link href="/login" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-slate-900 shadow-lg transition-all hover:bg-blue-50 hover:scale-105">
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="py-10 border-t bg-white">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold text-slate-900">AR Innovatech Solution</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 AR Innovatech Solution. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
