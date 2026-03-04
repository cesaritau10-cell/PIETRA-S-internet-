import React from 'react';
import { Wifi, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary p-2 rounded-lg">
              <Wifi className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              PIETRA'S <span className="text-brand-primary">Compare</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#planos" className="hover:text-brand-primary transition-colors">Planos</a>
            <a href="#analisador" className="hover:text-brand-primary transition-colors">Analisador de Fatura</a>
            <a href="#lojas" className="hover:text-brand-primary transition-colors">Lojas Próximas</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/5553984782570" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all shadow-sm"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">53 984782570</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
