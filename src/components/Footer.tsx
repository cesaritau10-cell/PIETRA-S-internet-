import React from 'react';
import { Wifi, Instagram, Facebook, Linkedin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-primary p-2 rounded-lg">
                <Wifi className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                PIETRA'S <span className="text-brand-primary">Compare</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              O maior comparador de internet do Sul do Brasil. Transparência e economia para você e sua empresa.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#planos" className="hover:text-white transition-colors">Planos de Internet</a></li>
              <li><a href="#analisador" className="hover:text-white transition-colors">Analisador de Fatura</a></li>
              <li><a href="#lojas" className="hover:text-white transition-colors">Lojas Próximas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-primary" />
                <span>53 984782570</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-primary" />
                <span>contato@pietracompare.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 PIETRA'S Compare Your Best Internet. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
