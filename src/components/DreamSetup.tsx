import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Loader2, Play, Download, Maximize2 } from 'lucide-react';
import { generateDreamSetup, animateSetup } from '../services/gemini';

export default function DreamSetup() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [size, setSize] = useState('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setImageUrl(null);
    setVideoUrl(null);
    try {
      const url = await generateDreamSetup(prompt, aspectRatio, size);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimate = async () => {
    if (!imageUrl) return;
    setIsAnimating(true);
    try {
      const base64 = imageUrl.split(',')[1];
      const url = await animateSetup(base64);
      setVideoUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif italic mb-4">Imagine seu Home Office com Fibra</h2>
          <p className="text-slate-400">Use nossa IA para visualizar o setup dos seus sonhos com internet ultra rápida.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Descreva seu setup</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Minimalista, luzes neon azuis, 3 monitores, vista para a cidade..."
                className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary h-32 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Proporção</label>
                <select 
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="1:1">1:1 (Quadrado)</option>
                  <option value="16:9">16:9 (Widescreen)</option>
                  <option value="9:16">9:16 (Vertical)</option>
                  <option value="4:3">4:3 (Clássico)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Qualidade</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl px-4 py-2 text-white"
                >
                  <option value="1K">1K (HD)</option>
                  <option value="2K">2K (QHD)</option>
                  <option value="4K">4K (UHD)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              Gerar Imagem com IA
            </button>
          </div>

          <div className="relative aspect-video bg-slate-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group">
            {!imageUrl && !isLoading && (
              <div className="text-center p-8">
                <ImageIcon size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Sua criação aparecerá aqui</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center">
                <Loader2 size={48} className="text-brand-primary animate-spin mx-auto mb-4" />
                <p className="text-slate-400 animate-pulse">Pietra está desenhando...</p>
              </div>
            )}

            {imageUrl && !videoUrl && (
              <>
                <img src={imageUrl} alt="Generated setup" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={handleAnimate}
                    disabled={isAnimating}
                    className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {isAnimating ? <Loader2 className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                    {isAnimating ? 'Animando...' : 'Animar com Veo'}
                  </button>
                </div>
              </>
            )}

            {videoUrl && (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
            )}

            {isAnimating && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                <Loader2 size={48} className="text-brand-primary animate-spin mb-4" />
                <h4 className="font-bold text-xl mb-2">Gerando Vídeo Cinematográfico</h4>
                <p className="text-slate-400 text-sm">Isso pode levar até 1 minuto. Por favor, aguarde enquanto a Veo processa sua animação.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
