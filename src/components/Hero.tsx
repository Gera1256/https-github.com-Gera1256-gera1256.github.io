import { useState, useEffect } from 'react';
import { ArrowRight, Play, Database, Brain, Activity, ShieldCheck, Terminal, Layers } from 'lucide-react';

export default function Hero() {
  // Live dynamic counter animations
  const [stats, setStats] = useState({
    models: 14820,
    dataTB: 842.6,
    accuracy: 99.42,
    threats: 1420,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        models: prev.models + (Math.random() > 0.6 ? 1 : 0),
        dataTB: +(prev.dataTB + (Math.random() * 0.05)).toFixed(1),
        accuracy: +(99.35 + Math.random() * 0.15).toFixed(2),
        threats: prev.threats + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Background isometric and radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00f0ff]/10 via-[#0066ff]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Cyber Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#161b22]/80 backdrop-blur text-xs font-mono text-[#00f0ff] mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span>AI CORE ENGINE v4.8 • MATRIX MATRIX RUNTIME</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
            INTELIGENCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#00ff88]">ARTIFICIAL</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-mono text-[#00ff88] tracking-wider mb-6">
            Machine Learning • Data Science • Tecnologías Emergentes
          </p>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Plataforma interactiva de alta fidelidad para explorar la matemática, arquitecturas profundas,
            entrenamiento de modelos y simulaciones en tiempo real que transforman el conocimiento en código.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#ia"
              id="hero-btn-explore"
              className="px-6 py-3.5 rounded-lg bg-[#00f0ff] text-black font-semibold font-mono text-sm flex items-center gap-2.5 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:bg-[#38bdf8] transition-all"
            >
              Explorar IA
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#playground"
              id="hero-btn-playground"
              className="px-6 py-3.5 rounded-lg border border-[#00ff88]/50 bg-[#161b22] text-[#00ff88] font-semibold font-mono text-sm flex items-center gap-2.5 hover:bg-[#00ff88]/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)] transition-all"
            >
              <Play className="w-4 h-4 fill-[#00ff88]" />
              Iniciar Playground
            </a>

            <a
              href="#terminal"
              id="hero-btn-terminal"
              className="px-5 py-3.5 rounded-lg border border-gray-700 bg-[#161b22]/60 text-gray-300 font-mono text-sm flex items-center gap-2 hover:border-[#00f0ff]/50 hover:text-white transition-all"
            >
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              Consola CLI
            </a>
          </div>
        </div>

        {/* 4 Animated Metric Indicators (Cyber HUD) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Models */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-[#00f0ff]/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-4xl text-gray-400">MODELOS ANALIZADOS</span>
              <Brain className="w-5 h-5 text-[#00f0ff] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.models.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-[#00ff88] mt-1 flex items-center gap-1">
              <span>↑ +12.4%</span>
              <span className="text-gray-500">vs semana previa</span>
            </div>
          </div>

          {/* Data Processed */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-[#00ff88]/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400">DATOS PROCESADOS</span>
              <Database className="w-5 h-5 text-[#00ff88] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.dataTB} <span className="text-sm font-normal text-gray-400">TB</span>
            </div>
            <div className="text-xs font-mono text-[#00f0ff] mt-1 flex items-center gap-1">
              <span>● Pipeline activo</span>
              <span className="text-gray-500">en streaming</span>
            </div>
          </div>

          {/* Predictions */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-[#38bdf8]/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400">PRECISIÓN MEDIA</span>
              <Activity className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.accuracy}%
            </div>
            <div className="text-xs font-mono text-[#38bdf8] mt-1 flex items-center gap-1">
              <span>F1 Score: 0.991</span>
              <span className="text-gray-500">validado</span>
            </div>
          </div>

          {/* Threats */}
          <div className="glass-panel p-5 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-400">AMENAZAS DETECTADAS</span>
              <ShieldCheck className="w-5 h-5 text-[#00ff88] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-mono text-3xl font-bold text-white tracking-tight">
              {stats.threats.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <span>100% Neutralizadas</span>
              <span className="text-gray-500">Zero-Day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
