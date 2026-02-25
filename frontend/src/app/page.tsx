// src/app/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  Users,
  Code,
  Server,
  Cpu,
  Database
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50 selection:bg-cyan-500 selection:text-white">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-3 group" href="#">
          <div className="bg-cyan-500/10 p-2 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
            <Zap className="h-6 w-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AR Innovatech Solution</span>
        </Link>
        <nav className="ml-auto flex gap-8 items-center hidden md:flex">
          <Link className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors" href="#services">
            Services
          </Link>
          <Link className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors" href="#process">
            Process
          </Link>
          <Link className="text-sm font-medium px-6 py-2.5 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5" href="/login">
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-500/20 opacity-20 blur-[100px]"></div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center rounded-full border border-cyan-500/30 px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                Innovating Digital Solutions for the Future
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                Transform Your Business with <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Smart IT Solutions</span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl leading-relaxed">
                We build powerful websites, systems, and digital solutions tailored for your business growth. Elevate your operations with our cutting-edge technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-600 px-8 text-base font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-500 hover:shadow-cyan-500/40 hover:-translate-y-1">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#services" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 text-base font-medium text-slate-200 shadow-sm transition-all hover:bg-slate-800 hover:border-slate-600">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-24 bg-slate-800/50 border-y border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Who We Are</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  AR Innovatech Solution is a forward-thinking technology partner dedicated to empowering businesses through digital transformation. We don't just build systems; we engineer growth.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Our team of experts combines technical prowess with strategic insight to deliver solutions that are not only robust and scalable but also aligned with your long-term business goals.
                </p>
                <div className="flex flex-col gap-3 pt-4">
                  {['Client-Centric Approach', 'Innovative Technology Stack', 'Reliable Support System'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Users className="h-8 w-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-sm text-slate-400">Happy Clients</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Code className="h-8 w-8 text-blue-400 mb-3" />
                      <div className="text-2xl font-bold text-white">100+</div>
                      <div className="text-sm text-slate-400">Projects Done</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Server className="h-8 w-8 text-indigo-400 mb-3" />
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-slate-400">Uptime</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Globe className="h-8 w-8 text-emerald-400 mb-3" />
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-sm text-slate-400">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-24 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Our Services</h2>
              <p className="text-slate-400 text-lg">Comprehensive IT solutions tailored to drive your business forward in the digital age.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Layout,
                  title: "Website Development",
                  description: "Stunning, responsive, and high-performance websites that leave a lasting impression."
                },
                {
                  icon: Code,
                  title: "Custom System Development",
                  description: "Tailor-made software solutions designed specifically to address your unique business challenges."
                },
                {
                  icon: BarChart3,
                  title: "Business Management Systems",
                  description: "Streamline operations with integrated ERP, CRM, and management tools."
                },
                {
                  icon: Globe,
                  title: "Web Application Development",
                  description: "Scalable and secure cloud-based applications accessible from anywhere."
                },
                {
                  icon: Server,
                  title: "Server & Cloud Setup",
                  description: "Robust infrastructure setup, maintenance, and optimization for maximum uptime."
                },
                {
                  icon: MessageSquare,
                  title: "IT Consulting & Support",
                  description: "Expert guidance and ongoing technical support to keep your business running smoothly."
                }
              ].map((service, index) => (
                <div key={index} className="group p-6 bg-slate-800/50 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300">
                  <div className="h-12 w-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-700 group-hover:border-cyan-500/30">
                    <service.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-24 bg-gradient-to-b from-slate-900 to-slate-800 border-y border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Why Choose Us</h2>
              <p className="text-slate-400">We deliver excellence through innovation and dedication.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Experienced Team", desc: "Skilled professionals with years of industry expertise." },
                { title: "Customizable Solutions", desc: "Flexible systems adapted to your specific needs." },
                { title: "Affordable & Scalable", desc: "Cost-effective solutions that grow with your business." },
                { title: "Ongoing Support", desc: "Reliable technical assistance whenever you need it." }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <div className="mx-auto h-12 w-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="w-full py-24 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Our Process</h2>
              <p className="text-slate-400">A streamlined approach to delivering success.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              {[
                { step: "01", title: "Consultation", desc: "Understanding your requirements." },
                { step: "02", title: "Planning", desc: "Designing the perfect solution." },
                { step: "03", title: "Development", desc: "Building with precision." },
                { step: "04", title: "Deployment", desc: "Launching and support." }
              ].map((item, i) => (
                <div key={i} className="relative bg-slate-900 p-6 rounded-xl border border-slate-800 text-center">
                  <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 border-4 border-slate-900">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-24 bg-slate-800/50 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-6">Get In Touch</h2>
                <p className="text-slate-400 mb-8">Ready to transform your business? Contact us today for a free consultation.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email Us</div>
                      <div className="text-sm text-slate-400">contact@arinnovatechsolution.tech</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Call Us</div>
                      <div className="text-sm text-slate-400">+60 12-345 6789</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Phone</label>
                      <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="+60..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email</label>
                    <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Message</label>
                    <textarea className="w-full min-h-[120px] rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Tell us about your project..." />
                  </div>
                  <button className="w-full h-10 rounded-md bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link className="flex items-center gap-2 mb-4" href="#">
                <Zap className="h-6 w-6 text-cyan-500" />
                <span className="text-xl font-bold text-white">AR Innovatech Solution</span>
              </Link>
              <p className="max-w-xs leading-relaxed">
                Empowering businesses with innovative digital solutions. Building the future of technology, today.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
                <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link href="#process" className="hover:text-cyan-400 transition-colors">Process</Link></li>
                <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Facebook</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 AR Innovatech Solution. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
