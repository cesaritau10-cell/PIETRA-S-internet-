import React, { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeBill } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export default function BillAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selected);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setIsLoading(true);
    setError(null);
    try {
      const base64 = preview.split(',')[1];
      const result = await analyzeBill(base64);
      setAnalysis(result);
    } catch (err) {
      setError('Não foi possível analisar a fatura. Tente uma imagem mais clara.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analisador" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Analisador de Fatura AI</h2>
          <p className="text-slate-500 mt-2">Envie uma foto da sua conta atual e nossa IA dirá se você está pagando caro.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-8">
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-slate-400 mb-4" />
                  <p className="mb-2 text-sm text-slate-500 font-semibold">Clique para enviar ou arraste a foto</p>
                  <p className="text-xs text-slate-400">PNG, JPG ou PDF (Máx. 5MB)</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={preview} alt="Preview" className="w-full h-full object-contain bg-slate-100" />
                  <button 
                    onClick={() => { setPreview(null); setFile(null); setAnalysis(null); }}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <AlertCircle size={20} className="text-red-500" />
                  </button>
                </div>

                {!analysis && (
                  <button 
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Analisando com IA...
                      </>
                    ) : (
                      <>
                        <FileText size={20} />
                        Analisar Fatura Agora
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {analysis && (
              <div className="mt-8 p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                <div className="flex items-center gap-2 mb-4 text-brand-primary">
                  <CheckCircle2 size={24} />
                  <h3 className="font-bold text-lg">Resultado da Análise</h3>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 text-sm">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
                <div className="mt-6 pt-6 border-t border-brand-primary/10 flex justify-between items-center">
                  <p className="text-xs text-slate-500 italic">Análise gerada por Pietra AI</p>
                  <button className="text-brand-primary font-bold text-sm hover:underline">Ver Planos Recomendados</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
