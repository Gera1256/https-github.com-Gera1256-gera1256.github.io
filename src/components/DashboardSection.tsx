import { useState, useEffect } from 'react';
import { Activity, BarChart2, PieChart, TrendingDown, Pause, Play, RefreshCw, Cpu, Server } from 'lucide-react';

export default function DashboardSection() {
  const [isLive, setIsLive] = useState(true);

  // Dynamic telemetry metrics
  const [metrics, setMetrics] = useState({
    datasets: 2840,
    models: 148,
    predictionsPerMin: 42910,
    accuracy: 99.42,
    processedPB: 1.84,
  });

  // Real-time line chart data points (loss history)
  const [linePoints, setLinePoints] = useState([
    0.45, 0.38, 0.32, 0.28, 0.22, 0.19, 0.16, 0.14, 0.12, 0.11, 0.09, 0.08,
  ]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Update telemetry
      setMetrics((prev) => ({
        datasets: prev.datasets + (Math.random() > 0.8 ? 1 : 0),
        models: prev.models,
        predictionsPerMin: Math.floor(42000 + Math.random() * 2000),
        accuracy: +(99.38 + Math.random() * 0.1).toFixed(2),
        processedPB: +(prev.processedPB + 0.001).toFixed(3),
      }));

      // Append new loss point
      setLinePoints((prev) => {
        const last = prev[prev.length - 1];
        const nextVal = Math.max(0.04, Math.min(0.25, last + (Math.random() - 0.52) * 0.02));
        const updated = [...prev.slice(1), +nextVal.toFixed(3)];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  // SVG Line Chart path
  const linePath = linePoints
    .map((val, i) => {
      // x from 20 to 380, y from 160 (val 0.5) to 20 (val 0.0)
      const x = 20 + (i / (linePoints.length - 1)) * 360;
      const y = 160 - (val / 0.5) * 130;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Bar Chart Data
  const barData = [
    { label: 'Transformers', score: 98, color: '#00f0ff' },
    { label: 'ConvNet (CNN)', score: 94, color: '#00ff88' },
    { label: 'Graph Neural Net', score: 89, color: '#38bdf8' },
    { label: 'XGBoost / Trees', score: 92, color: '#a855f7' },
  ];

  // Donut slices
  const donutData = [
    { label: 'NLP / LLM', pct: 45, color: '#00f0ff' },
    { label: 'Visión Artificial', pct: 28, color: '#00ff88' },
    { label: 'Datos Tabulares', pct: 17, color: '#38bdf8' },
    { label: 'Audio & Multimodal', pct: 10, color: '#f43f5e' },
  ];

  return (
    <section id="dashboard" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#161b22] text-xs font-mono text-[#00ff88] mb-3">
              <Server className="w-3.5 h-3.5" />
              <span>MÓDULO 07 • TELEMETRÍA EN PRODUCCIÓN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dashboard de <span className="text-[#00ff88]">Data Science</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                isLive
                  ? 'border-[#00ff88] bg-[#00ff88]/15 text-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'border-gray-700 bg-[#161b22] text-gray-400'
              }`}
            >
              {isLive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                  <Pause className="w-3 h-3" /> Pausar Stream
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" /> Reanudar Stream
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5 Real-Time KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <div className="glass-panel p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">DATASETS ACTIVOS</span>
            <div className="text-2xl font-mono font-bold text-white">{metrics.datasets.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-[#00f0ff] mt-1">32 sincronizados</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">MODELOS EN CLUSTER</span>
            <div className="text-2xl font-mono font-bold text-white">{metrics.models}</div>
            <div className="text-[10px] font-mono text-[#00ff88] mt-1">Inferencia zero-lag</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">PREDICCIONES / MIN</span>
            <div className="text-2xl font-mono font-bold text-white">{metrics.predictionsPerMin.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-[#38bdf8] mt-1">Latencia: 4.2ms</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">PRECISIÓN GLOBAL</span>
            <div className="text-2xl font-mono font-bold text-white">{metrics.accuracy}%</div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">Recall: 99.1%</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gray-800 col-span-2 md:col-span-1">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">DATOS PROCESADOS</span>
            <div className="text-2xl font-mono font-bold text-white">{metrics.processedPB} <span className="text-xs text-gray-400">PB</span></div>
            <div className="text-[10px] font-mono text-purple-400 mt-1">Throughput: 8.4 GB/s</div>
          </div>
        </div>

        {/* 4 Interactive Visual Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Real-time Loss Curve (Line Chart) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00f0ff]" />
                <h4 className="text-sm font-bold text-white font-mono">CONVERGENCIA DE PÉRDIDA (LOSS STREAM)</h4>
              </div>
              <span className="text-xs font-mono text-[#00ff88]">
                Loss Actual: {linePoints[linePoints.length - 1]}
              </span>
            </div>

            <div className="bg-[#0a0d13] p-3 rounded-xl border border-gray-800">
              <svg viewBox="0 0 400 180" className="w-full h-44">
                {/* Horizontal guide lines */}
                <line x1="20" y1="40" x2="380" y2="40" stroke="#21262d" strokeWidth="1" strokeDasharray="3" />
                <line x1="20" y1="90" x2="380" y2="90" stroke="#21262d" strokeWidth="1" strokeDasharray="3" />
                <line x1="20" y1="140" x2="380" y2="140" stroke="#21262d" strokeWidth="1" strokeDasharray="3" />

                {/* Line Path */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Latest point circle */}
                <circle
                  cx="380"
                  cy={160 - (linePoints[linePoints.length - 1] / 0.5) * 130}
                  r="5"
                  fill="#00ff88"
                  className="animate-pulse"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2 px-1">
              <span>t - 24s</span>
              <span>Tiempo de Entrenamiento</span>
              <span>Ahora</span>
            </div>
          </div>

          {/* Chart 2: Model Architecture Benchmark (Bar Chart) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#00ff88]" />
                <h4 className="text-sm font-bold text-white font-mono">BENCHMARK DE ARQUITECTURAS</h4>
              </div>
              <span className="text-xs font-mono text-gray-400">Score F1 Relativo</span>
            </div>

            <div className="space-y-3.5 bg-[#0a0d13] p-4 rounded-xl border border-gray-800">
              {barData.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300">{bar.label}</span>
                    <span style={{ color: bar.color }} className="font-bold">
                      {bar.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${bar.score}%`, backgroundColor: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 3: Workload Distribution (Donut Chart) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-4 h-4 text-[#38bdf8]" />
              <h4 className="text-sm font-bold text-white font-mono">DISTRIBUCIÓN DE CARGAS COMPUTACIONALES</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#0a0d13] p-4 rounded-xl border border-gray-800">
              {/* SVG Donut */}
              <div className="flex justify-center">
                <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#21262d" strokeWidth="12" />
                  {/* Slices using strokeDasharray */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="12"
                    strokeDasharray="107 238"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="12"
                    strokeDasharray="66 238"
                    strokeDashoffset="-107"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="12"
                    strokeDasharray="40 238"
                    strokeDashoffset="-173"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="12"
                    strokeDasharray="24 238"
                    strokeDashoffset="-213"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs font-mono">
                {donutData.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                    <span className="font-bold text-white">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 4: Latent Embedding Cluster (Scatter Plot) */}
          <div className="glass-panel p-6 rounded-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-bold text-white font-mono">MAPA DE EMBEDDINGS (PROYECCIÓN 2D)</h4>
              </div>
              <span className="text-xs font-mono text-gray-400">t-SNE Reduction</span>
            </div>

            <div className="bg-[#0a0d13] p-3 rounded-xl border border-gray-800 relative h-44 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 300 150" className="w-full h-full">
                {/* Cluster A */}
                {[
                  [50, 40], [60, 55], [45, 60], [70, 45], [55, 70], [80, 50],
                ].map(([x, y], i) => (
                  <circle key={`a-${i}`} cx={x} cy={y} r="3.5" fill="#00f0ff" opacity="0.8" />
                ))}

                {/* Cluster B */}
                {[
                  [220, 80], [235, 95], [210, 100], [240, 75], [225, 110], [250, 90],
                ].map(([x, y], i) => (
                  <circle key={`b-${i}`} cx={x} cy={y} r="3.5" fill="#00ff88" opacity="0.8" />
                ))}

                {/* Cluster C */}
                {[
                  [140, 110], [155, 120], [135, 130], [165, 105], [150, 125],
                ].map(([x, y], i) => (
                  <circle key={`c-${i}`} cx={x} cy={y} r="3.5" fill="#a855f7" opacity="0.8" />
                ))}

                {/* Cluster Labels */}
                <text x="55" y="30" fill="#00f0ff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Cluster 01: Finanzas
                </text>
                <text x="235" y="65" fill="#00ff88" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Cluster 02: Biomédica
                </text>
                <text x="150" y="98" fill="#a855f7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Cluster 03: Robótica
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
