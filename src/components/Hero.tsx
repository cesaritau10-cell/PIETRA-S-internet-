import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary mb-4">
                Região de Pelotas & Porto Alegre
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Compare sua melhor</span>
                <span className="block text-brand-primary">Internet agora.</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Encontre as melhores ofertas de fibra óptica e 5G em segundos. Economize na sua fatura e navegue com a velocidade que você merece.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-primary hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-brand-primary/20 transition-all">
                  Ver Planos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all">
                  Falar com Consultor
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-video lg:aspect-square"
            >
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000"
                alt="High speed internet"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Zap className="text-yellow-400 mx-auto mb-1" />
                    <p className="text-white text-xs font-bold">Ultra Rápida</p>
                  </div>
                  <div className="text-center">
                    <ShieldCheck className="text-emerald-400 mx-auto mb-1" />
                    <p className="text-white text-xs font-bold">Confiável</p>
                  </div>
                  <div className="text-center">
                    <Globe className="text-blue-400 mx-auto mb-1" />
                    <p className="text-white text-xs font-bold">Global</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
