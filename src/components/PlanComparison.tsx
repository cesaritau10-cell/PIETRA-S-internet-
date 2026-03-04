import React, { useState, useMemo } from 'react';
import { MOCK_PLANS, InternetPlan } from '../constants';
import { Check, Info, ArrowUpRight, Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PlanComparison() {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(250);
  const [minSpeed, setMinSpeed] = useState(0);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlans = useMemo(() => {
    return MOCK_PLANS.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           plan.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = plan.price <= maxPrice;
      const matchesSpeed = plan.speedValue >= minSpeed;
      const matchesTech = selectedTech.length === 0 || selectedTech.includes(plan.technology);
      const matchesTerm = selectedTerm.length === 0 || selectedTerm.includes(plan.contractTerm);

      return matchesSearch && matchesPrice && matchesSpeed && matchesTech && matchesTerm;
    });
  }, [searchQuery, maxPrice, minSpeed, selectedTech, selectedTerm]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  const toggleTerm = (term: string) => {
    setSelectedTerm(prev => prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setMaxPrice(250);
    setMinSpeed(0);
    setSelectedTech([]);
    setSelectedTerm([]);
  };

  return (
    <section id="planos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 font-serif italic">Melhores Ofertas na Região</h2>
            <p className="text-slate-500 mt-2">Encontre o plano ideal para sua necessidade.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar operadora ou plano..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                showFilters ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={18} />
              Filtros
              {(selectedTech.length > 0 || selectedTerm.length > 0 || minSpeed > 0 || maxPrice < 250) && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Preço Máximo: R$ {maxPrice}</label>
                  <input 
                    type="range" 
                    min="50" 
                    max="300" 
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
                    <span>R$ 50</span>
                    <span>R$ 300</span>
                  </div>
                </div>

                {/* Min Speed */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Velocidade Mínima: {minSpeed} Mbps</label>
                  <select 
                    value={minSpeed}
                    onChange={(e) => setMinSpeed(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="0">Qualquer velocidade</option>
                    <option value="100">100+ Mbps</option>
                    <option value="300">300+ Mbps</option>
                    <option value="500">500+ Mbps</option>
                    <option value="700">700+ Mbps</option>
                  </select>
                </div>

                {/* Technology */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Tecnologia</label>
                  <div className="flex flex-wrap gap-2">
                    {['Fiber', 'Cable', '5G'].map(tech => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          selectedTech.includes(tech) 
                            ? 'bg-brand-primary text-white border-brand-primary' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contract Term */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Contrato</label>
                  <div className="flex flex-wrap gap-2">
                    {['Mensal', '12 Meses'].map(term => (
                      <button
                        key={term}
                        onClick={() => toggleTerm(term)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          selectedTerm.includes(term) 
                            ? 'bg-brand-primary text-white border-brand-primary' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1 transition-colors"
                  >
                    <X size={14} />
                    Limpar todos os filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan, idx) => (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
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
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono bg-slate-100 px-1.5 py-0.5 rounded">{plan.technology}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{plan.contractTerm}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 mb-4 md:mb-0">
                    <div className="flex flex-col">
                      <span className="font-mono text-lg font-semibold text-slate-700">{plan.speed}</span>
                      <span className="text-[10px] text-slate-400">Upload: {plan.uploadSpeed}</span>
                    </div>
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
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-300 w-8 h-8" />
                </div>
                <h3 className="text-slate-900 font-bold">Nenhum plano encontrado</h3>
                <p className="text-slate-500 text-sm mt-1">Tente ajustar seus filtros para encontrar outras opções.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-brand-primary font-semibold text-sm hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
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
