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
            Perkhidmatan
          </Link>
          <Link className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors" href="#about">
            Tentang Kami
          </Link>
          <Link className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors" href="#process">
            Proses
          </Link>
          <Link className="text-sm font-medium px-6 py-2.5 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5" href="/login">
            Log Masuk
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
                Inovasi Penyelesaian Digital untuk Masa Depan
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                Transformasi Perniagaan Anda dengan <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Penyelesaian IT Pintar</span>
              </h1>
              
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl leading-relaxed">
                Kami membina laman web, sistem, dan penyelesaian digital yang hebat khusus untuk pertumbuhan perniagaan anda. Tingkatkan operasi anda dengan teknologi terkini kami.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-600 px-8 text-base font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-500 hover:shadow-cyan-500/40 hover:-translate-y-1">
                  Mula Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="#services" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 text-base font-medium text-slate-200 shadow-sm transition-all hover:bg-slate-800 hover:border-slate-600">
                  Perkhidmatan Kami
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Siapa Kami</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  AR Innovatech Solution adalah rakan teknologi berwawasan yang berdedikasi untuk memperkasakan perniagaan melalui transformasi digital. Kami bukan sekadar membina sistem; kami menjana pertumbuhan.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Pasukan pakar kami menggabungkan kehebatan teknikal dengan wawasan strategik untuk menyampaikan penyelesaian yang bukan sahaja teguh dan berskala tetapi juga selaras dengan matlamat jangka panjang perniagaan anda.
                </p>
                <div className="flex flex-col gap-3 pt-4">
                  {['Pendekatan Berpusatkan Pelanggan', 'Teknologi Inovatif', 'Sistem Sokongan Dipercayai'].map((item) => (
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
                      <div className="text-sm text-slate-400">Pelanggan Gembira</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Code className="h-8 w-8 text-blue-400 mb-3" />
                      <div className="text-2xl font-bold text-white">100+</div>
                      <div className="text-sm text-slate-400">Projek Selesai</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Server className="h-8 w-8 text-indigo-400 mb-3" />
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-slate-400">Masa Operasi</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                      <Globe className="h-8 w-8 text-emerald-400 mb-3" />
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-sm text-slate-400">Sokongan</div>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Perkhidmatan Kami</h2>
              <p className="text-slate-400 text-lg">Penyelesaian IT komprehensif yang disesuaikan untuk memacu perniagaan anda ke hadapan dalam era digital.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Layout,
                  title: "Pembangunan Laman Web",
                  description: "Laman web yang menawan, responsif, dan berprestasi tinggi yang meninggalkan kesan mendalam."
                },
                {
                  icon: Code,
                  title: "Pembangunan Sistem Tersuai",
                  description: "Penyelesaian perisian tersuai yang direka khusus untuk menangani cabaran perniagaan unik anda."
                },
                {
                  icon: BarChart3,
                  title: "Sistem Pengurusan Perniagaan",
                  description: "Perkemaskan operasi dengan alat ERP, CRM, dan pengurusan bersepadu."
                },
                {
                  icon: Globe,
                  title: "Pembangunan Aplikasi Web",
                  description: "Aplikasi berasaskan awan yang berskala dan selamat yang boleh diakses dari mana-mana."
                },
                {
                  icon: Server,
                  title: "Persediaan Pelayan & Awan",
                  description: "Persediaan infrastruktur yang teguh, penyelenggaraan, dan pengoptimuman untuk masa operasi maksimum."
                },
                {
                  icon: MessageSquare,
                  title: "Perundingan & Sokongan IT",
                  description: "Panduan pakar dan sokongan teknikal berterusan untuk memastikan perniagaan anda berjalan lancar."
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Kenapa Pilih Kami</h2>
              <p className="text-slate-400">Kami menyampaikan kecemerlangan melalui inovasi dan dedikasi.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Pasukan Berpengalaman", desc: "Profesional mahir dengan pengalaman industri bertahun-tahun." },
                { title: "Penyelesaian Boleh Ubah Suai", desc: "Sistem fleksibel yang disesuaikan dengan keperluan khusus anda." },
                { title: "Mampu Milik & Berskala", desc: "Penyelesaian kos efektif yang berkembang dengan perniagaan anda." },
                { title: "Sokongan Berterusan", desc: "Bantuan teknikal yang boleh dipercayai bila-bila masa anda memerlukannya." }
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-4">Proses Kami</h2>
              <p className="text-slate-400">Pendekatan yang diperkemas untuk memberikan kejayaan.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              {[
                { step: "01", title: "Perundingan", desc: "Memahami keperluan anda." },
                { step: "02", title: "Perancangan", desc: "Mereka bentuk penyelesaian yang sempurna." },
                { step: "03", title: "Pembangunan", desc: "Membina dengan ketepatan." },
                { step: "04", title: "Pelancaran", desc: "Pelancaran dan sokongan." }
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-6">Hubungi Kami</h2>
                <p className="text-slate-400 mb-8">Bersedia untuk mengubah perniagaan anda? Hubungi kami hari ini untuk konsultasi percuma.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Emel Kami</div>
                      <div className="text-sm text-slate-400">contact@arinnovatechsolution.tech</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Hubungi Kami</div>
                      <div className="text-sm text-slate-400">+60 12-345 6789</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Nama</label>
                      <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Telefon</label>
                      <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="+60..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Emel</label>
                    <input className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Mesej</label>
                    <textarea className="w-full min-h-[120px] rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Beritahu kami tentang projek anda..." />
                  </div>
                  <button className="w-full h-10 rounded-md bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors">
                    Hantar Mesej
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
                Memperkasakan perniagaan dengan penyelesaian digital inovatif. Membina masa depan teknologi, hari ini.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Pautan Pantas</h3>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Perkhidmatan</Link></li>
                <li><Link href="#about" className="hover:text-cyan-400 transition-colors">Tentang Kami</Link></li>
                <li><Link href="#process" className="hover:text-cyan-400 transition-colors">Proses</Link></li>
                <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">Hubungi</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Hubungi</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Facebook</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 AR Innovatech Solution. Hak cipta terpelihara.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Dasar Privasi</Link>
              <Link href="#" className="hover:text-white transition-colors">Terma Perkhidmatan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
