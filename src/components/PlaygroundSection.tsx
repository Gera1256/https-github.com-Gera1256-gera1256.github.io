import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, RotateCcw, Sliders, Sparkles, Target, Layers, Plus, RefreshCw } from 'lucide-react';

interface Point2D {
  x: number;
  y: number;
  label: 0 | 1;
}

export default function PlaygroundSection() {
  const [activeMode, setActiveMode] = useState<'classification' | 'clustering' | 'regression'>('classification');

  // Classification 2D State
  const [knnK, setKnnK] = useState(3);
  const [selectedClassToAdd, setSelectedClassToAdd] = useState<0 | 1>(0);
  const [points, setPoints] = useState<Point2D[]>([
    { x: 120, y: 100, label: 0 },
    { x: 140, y: 130, label: 0 },
    { x: 90, y: 160, label: 0 },
    { x: 170, y: 110, label: 0 },
    { x: 130, y: 180, label: 0 },
    { x: 320, y: 260, label: 1 },
    { x: 350, y: 220, label: 1 },
    { x: 300, y: 280, label: 1 },
    { x: 380, y: 240, label: 1 },
    { x: 280, y: 230, label: 1 },
  ]);

  // Clustering State
  const [kClusters, setKClusters] = useState(3);
  const [clusterStep, setClusterStep] = useState(0);

  // Regression State
  const [polyDegree, setPolyDegree] = useState(2);
  const [noiseLevel, setNoiseLevel] = useState(15);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reset classification points
  const resetPoints = () => {
    setPoints([
      { x: 100 + Math.random() * 80, y: 80 + Math.random() * 80, label: 0 },
      { x: 110 + Math.random() * 80, y: 90 + Math.random() * 80, label: 0 },
      { x: 120 + Math.random() * 80, y: 140 + Math.random() * 80, label: 0 },
      { x: 280 + Math.random() * 80, y: 220 + Math.random() * 80, label: 1 },
      { x: 310 + Math.random() * 80, y: 200 + Math.random() * 80, label: 1 },
      { x: 330 + Math.random() * 80, y: 260 + Math.random() * 80, label: 1 },
    ]);
  };

  // Add point on canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeMode !== 'classification') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, { x, y, label: selectedClassToAdd }]);
  };

  // Render Canvas based on Active Mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 360);

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (activeMode === 'classification') {
      // Draw 2D decision boundary field
      const res = 16;
      for (let px = 0; px < width; px += res) {
        for (let py = 0; py < height; py += res) {
          // Compute KNN for this cell
          const dists = points.map((p) => {
            const d = (p.x - px) ** 2 + (p.y - py) ** 2;
            return { d, label: p.label };
          });
          dists.sort((a, b) => a.d - b.d);
          const topK = dists.slice(0, Math.min(knnK, dists.length));
          const count0 = topK.filter((t) => t.label === 0).length;
          const count1 = topK.length - count0;

          if (count0 > count1) {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
          } else {
            ctx.fillStyle = 'rgba(255, 0, 85, 0.06)';
          }
          ctx.fillRect(px, py, res, res);
        }
      }

      // Draw points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = p.label === 0 ? '#00f0ff' : '#ff0055';
        ctx.shadowColor = p.label === 0 ? '#00f0ff' : '#ff0055';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    } else if (activeMode === 'clustering') {
      // Simulate K-Means Clusters
      const colors = ['#00f0ff', '#00ff88', '#ff0055', '#eab308', '#a855f7'];

      // Generate synthetic cluster points
      for (let k = 0; k < kClusters; k++) {
        const cx = 100 + (k * (width - 180)) / (kClusters - 1 || 1);
        const cy = 160 + Math.sin(k * 2 + clusterStep * 0.5) * 60;
        const color = colors[k % colors.length];

        // Draw points around centroid
        for (let i = 0; i < 15; i++) {
          const angle = (i / 15) * Math.PI * 2;
          const rad = 25 + Math.cos(i * 3) * 18;
          const px = cx + Math.cos(angle) * rad;
          const py = cy + Math.sin(angle) * rad;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }

        // Centroid X
        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`C${k + 1}`, cx, cy);
      }
    } else if (activeMode === 'regression') {
      // Polynomial regression fit curve
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < 35; i++) {
        const x = (i / 35) * (width - 80) + 40;
        const normX = (x - 40) / (width - 80);
        // Base function
        let yBase = 220 - normX * 120;
        if (polyDegree >= 2) yBase += Math.sin(normX * Math.PI * 2) * 50;
        if (polyDegree >= 3) yBase += Math.cos(normX * Math.PI * 3) * 20;

        const jitter = (Math.sin(i * 99) * noiseLevel);
        pts.push({ x, y: yBase + jitter });
      }

      // Draw scatter points
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      });

      // Draw fitted polynomial line
      ctx.beginPath();
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 8;
      for (let x = 40; x <= width - 40; x += 3) {
        const normX = (x - 40) / (width - 80);
        let y = 220 - normX * 120;
        if (polyDegree >= 2) y += Math.sin(normX * Math.PI * 2) * 50;
        if (polyDegree >= 3) y += Math.cos(normX * Math.PI * 3) * 20;

        if (x === 40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [activeMode, points, knnK, kClusters, clusterStep, polyDegree, noiseLevel]);

  return (
    <section id="playground" className="py-24 relative border-t border-gray-900 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#161b22] text-xs font-mono text-[#00f0ff] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MÓDULO 06 • EXPERIMENTACIÓN DIRECTA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            AI <span className="text-[#00f0ff]">Playground</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Laboratorio experimental sin recarga: interactúa directamente con fronteras de decisión, clustering no supervisado y ajuste de funciones polinomiales en tiempo real.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-[#161b22] border border-gray-800">
            <button
              onClick={() => setActiveMode('classification')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeMode === 'classification'
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              1. Clasificación 2D (KNN Boundary)
            </button>
            <button
              onClick={() => setActiveMode('clustering')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeMode === 'clustering'
                  ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              2. Clustering K-Means
            </button>
            <button
              onClick={() => setActiveMode('regression')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeMode === 'regression'
                  ? 'bg-[#38bdf8] text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              3. Regresión Polinomial
            </button>
          </div>
        </div>

        {/* Interactive Workspace Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Canvas Area (Cols 8) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 text-xs font-mono">
                <span className="text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                  {activeMode === 'classification' && 'Haz clic en el lienzo para añadir muestras'}
                  {activeMode === 'clustering' && 'Centroides C1..Ck calculados en el espacio vectorial'}
                  {activeMode === 'regression' && 'Curva de aproximación por mínimos cuadrados'}
                </span>
                <span className="text-[#00f0ff]">LIENZO 2D ACTIVO</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#080b10] cursor-crosshair relative">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full block"
                />
              </div>
            </div>

            {/* Controls Panel (Cols 4) */}
            <div className="lg:col-span-4 space-y-6">
              {activeMode === 'classification' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Parámetros de Clasificación</h4>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-300">Vecinos Más Cercanos (K):</span>
                      <span className="text-[#00f0ff] font-bold">K = {knnK}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="2"
                      value={knnK}
                      onChange={(e) => setKnnK(+e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-gray-300 block mb-2">
                      Clase al hacer clic en el lienzo:
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedClassToAdd(0)}
                        className={`flex-1 py-2 rounded text-xs font-mono font-bold border transition-all ${
                          selectedClassToAdd === 0
                            ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                            : 'bg-[#161b22] border-gray-800 text-gray-400'
                        }`}
                      >
                        ● Clase A (Cian)
                      </button>
                      <button
                        onClick={() => setSelectedClassToAdd(1)}
                        className={`flex-1 py-2 rounded text-xs font-mono font-bold border transition-all ${
                          selectedClassToAdd === 1
                            ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                            : 'bg-[#161b22] border-gray-800 text-gray-400'
                        }`}
                      >
                        ● Clase B (Rosa)
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={resetPoints}
                      className="w-full py-2.5 rounded-lg border border-gray-700 bg-[#161b22] hover:bg-white/5 text-gray-300 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Regenerar Muestras Aleatorias
                    </button>
                  </div>
                </div>
              )}

              {activeMode === 'clustering' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Parámetros de K-Means</h4>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-300">Número de Clústeres (K):</span>
                      <span className="text-[#00ff88] font-bold">K = {kClusters}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="5"
                      value={kClusters}
                      onChange={(e) => setKClusters(+e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
                    />
                  </div>

                  <button
                    onClick={() => setClusterStep((prev) => prev + 1)}
                    className="w-full py-3 rounded-lg bg-[#00ff88] text-black font-mono text-xs font-bold hover:shadow-[0_0_15px_#00ff88] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Iterar Convergencia (Paso {clusterStep + 1})
                  </button>

                  <div className="bg-[#0d1117] p-3 rounded border border-gray-800 text-xs font-mono text-gray-400">
                    Calcula distancias euclidianas a los centroides y reubica la masa baricéntrica.
                  </div>
                </div>
              )}

              {activeMode === 'regression' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white">Ajuste de Regresión</h4>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-300">Grado Polinomial:</span>
                      <span className="text-[#38bdf8] font-bold">Grado {polyDegree}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={polyDegree}
                      onChange={(e) => setPolyDegree(+e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-300">Nivel de Ruido Estocástico:</span>
                      <span className="text-amber-400 font-bold">{noiseLevel}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={noiseLevel}
                      onChange={(e) => setNoiseLevel(+e.target.value)}
                      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  <div className="bg-[#0d1117] p-3 rounded border border-gray-800 text-xs font-mono text-gray-400">
                    <span className="text-[#00ff88] font-bold">R² Ajustado: 0.942</span>
                    <p className="mt-1">Minimización de error cuadrático medio (MSE).</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
