import React from 'react';
import { MOCK_PLANS } from '../constants';
import { Check, Info, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function PlanComparison() {
  return (
    <section id="planos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 font-serif italic">Melhores Ofertas na Região</h2>
          <p className="text-slate-500 mt-2">Preços atualizados para Pelotas e Porto Alegre.</p>
        </div>

        <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4">
            <div className="col-span-4 data-grid-header">Operadora & Plano</div>
            <div className="col-span-2 data-grid-header">Velocidade</div>
            <div className="col-span-3 data-grid-header">Benefícios</div>
            <div className="col-span-2 data-grid-header">Preço Mensal</div>
            <div className="col-span-1 data-grid-header"></div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200">
            {MOCK_PLANS.map((plan, idx) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-12 p-4 md:items-center hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="col-span-4 mb-4 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {plan.provider[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-tighter font-mono">{plan.technology}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 mb-4 md:mb-0">
                  <span className="font-mono text-lg font-semibold text-slate-700">{plan.speed}</span>
                </div>

                <div className="col-span-3 mb-4 md:mb-0">
                  <ul className="space-y-1">
                    {plan.features.slice(0, 2).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 mb-4 md:mb-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">R$</span>
                    <span className="text-2xl font-bold text-slate-900">{plan.price.toFixed(2).replace('.', ',')}</span>
                    <span className="text-xs text-slate-500">/mês</span>
                  </div>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button className="p-2 rounded-full bg-slate-100 text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <Info size={16} />
          <span>Os preços podem variar de acordo com a viabilidade técnica do seu endereço.</span>
        </div>
      </div>
    </section>
  );
}
