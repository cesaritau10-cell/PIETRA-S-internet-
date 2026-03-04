import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';
import { findNearbyStores } from '../services/gemini';

export default function LocalStores() {
  const [stores, setStores] = useState<{ text: string, mapsLinks: { title: string, uri: string }[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindStores = () => {
    setIsLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada pelo seu navegador.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await findNearbyStores(position.coords.latitude, position.coords.longitude);
          setStores(result);
        } catch (err) {
          setError('Erro ao buscar lojas próximas. Tente novamente.');
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError('Permissão de localização negada. Ative para ver lojas próximas.');
        setIsLoading(false);
      }
    );
  };

  return (
    <section id="lojas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Encontre uma Loja Próxima</h2>
            <p className="text-slate-500 mb-8">
              Prefere atendimento presencial? Localize as lojas oficiais da Vivo, Claro, Oi e Vero em Pelotas e Porto Alegre.
            </p>
            
            {!stores ? (
              <button 
                onClick={handleFindStores}
                disabled={isLoading}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Buscando no Google Maps...
                  </>
                ) : (
                  <>
                    <MapPin size={20} />
                    Localizar Lojas ao meu Redor
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-700 leading-relaxed">{stores.text}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stores.mapsLinks.map((link, i) => (
                    <a 
                      key={i}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-primary hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
                          <Navigation size={18} />
                        </div>
                        <span className="font-semibold text-slate-900 text-sm truncate max-w-[150px]">{link.title}</span>
                      </div>
                      <ExternalLink size={16} className="text-slate-400 group-hover:text-brand-primary" />
                    </a>
                  ))}
                </div>
                <button 
                  onClick={() => setStores(null)}
                  className="text-sm text-slate-400 hover:text-slate-600 underline"
                >
                  Limpar busca
                </button>
              </div>
            )}

            {error && (
              <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>

          <div className="mt-12 lg:mt-0 relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
              <MapPin size={64} className="text-slate-300 animate-bounce" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-20 grayscale"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">+50 Lojas</p>
                  <p className="text-xs text-slate-500">Mapeadas na região</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2 } from 'lucide-react';
