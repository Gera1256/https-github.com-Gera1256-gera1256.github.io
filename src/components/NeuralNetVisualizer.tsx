import { useState, useRef, useEffect } from 'react';
import { Network, Play, RotateCcw, Sliders, Zap, CheckCircle2 } from 'lucide-react';

export default function NeuralNetVisualizer() {
  const [hiddenLayersCount, setHiddenLayersCount] = useState(2);
  const [neuronsPerHidden, setNeuronsPerHidden] = useState(4);
  const [activationFn, setActivationFn] = useState<'relu' | 'sigmoid' | 'tanh'>('sigmoid');
  const [weightMultiplier, setWeightMultiplier] = useState(1.0);
  const [isPropagating, setIsPropagating] = useState(false);
  const [signalProgress, setSignalProgress] = useState(0);
  const [outputValues, setOutputValues] = useState<number[]>([0.72, 0.28]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger pulse animation
  const triggerPropagation = () => {
    if (isPropagating) return;
    setIsPropagating(true);
    setSignalProgress(0);

    // Compute synthetic outputs based on activations
    let out1 = 0.5 * weightMultiplier;
    let out2 = 0.5;
    if (activationFn === 'relu') {
      out1 = Math.max(0, Math.min(1, out1 * 1.2));
      out2 = Math.max(0, Math.min(1, 1 - out1));
    } else if (activationFn === 'sigmoid') {
      out1 = 1 / (1 + Math.exp(-out1 * 2));
      out2 = 1 - out1;
    } else {
      out1 = (Math.tanh(out1) + 1) / 2;
      out2 = 1 - out1;
    }

    setOutputValues([+out1.toFixed(3), +out2.toFixed(3)]);
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const layerStructure = [3]; // 3 inputs
    for (let i = 0; i < hiddenLayersCount; i++) {
      layerStructure.push(neuronsPerHidden);
    }
    layerStructure.push(2); // 2 outputs (Class A, Class B)

    const totalLayers = layerStructure.length;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = 360);

      ctx.clearRect(0, 0, width, height);

      // Compute node coordinates
      const layerSpacing = width / (totalLayers + 0.5);
      const nodes: { x: number; y: number; layer: number; index: number }[][] = [];

      for (let l = 0; l < totalLayers; l++) {
        const count = layerStructure[l];
        const layerNodes = [];
        const x = layerSpacing * (l + 0.8);
        const verticalSpacing = height / (count + 1);

        for (let n = 0; n < count; n++) {
          const y = verticalSpacing * (n + 1);
          layerNodes.push({ x, y, layer: l, index: n });
        }
        nodes.push(layerNodes);
      }

      // Draw Synaptic Connections
      for (let l = 0; l < totalLayers - 1; l++) {
        const fromLayer = nodes[l];
        const toLayer = nodes[l + 1];

        for (let i = 0; i < fromLayer.length; i++) {
          for (let j = 0; j < toLayer.length; j++) {
            const p1 = fromLayer[i];
            const p2 = toLayer[j];

            // Synapse Line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated Signal Pulse if propagating
            if (isPropagating) {
              const layerPhaseStart = l / (totalLayers - 1);
              const layerPhaseEnd = (l + 1) / (totalLayers - 1);

              if (signalProgress >= layerPhaseStart && signalProgress <= layerPhaseEnd) {
                const subProgress =
                  (signalProgress - layerPhaseStart) / (layerPhaseEnd - layerPhaseStart);
                const px = p1.x + (p2.x - p1.x) * subProgress;
                const py = p1.y + (p2.y - p1.y) * subProgress;

                ctx.beginPath();
                ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = '#00ff88';
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
              }
            }
          }
        }
      }

      // Draw Neurons
      for (let l = 0; l < totalLayers; l++) {
        const layerNodes = nodes[l];
        const isInput = l === 0;
        const isOutput = l === totalLayers - 1;

        for (let n = 0; n < layerNodes.length; n++) {
          const { x, y } = layerNodes[n];

          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);

          // Node styling based on layer
          if (isInput) {
            ctx.fillStyle = '#161b22';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2;
          } else if (isOutput) {
            ctx.fillStyle = '#161b22';
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2.5;
          } else {
            ctx.fillStyle = '#161b22';
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
          }

          ctx.fill();
          ctx.stroke();

          // Node core glow
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = isInput ? '#00f0ff' : isOutput ? '#00ff88' : '#38bdf8';
          ctx.fill();

          // Node Text label
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const label = isInput ? `X${n + 1}` : isOutput ? `Y${n + 1}` : `h${l},${n + 1}`;
          ctx.fillText(label, x, y - 22);
        }
      }

      // Layer names at bottom
      ctx.fillStyle = '#8b949e';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      for (let l = 0; l < totalLayers; l++) {
        const x = layerSpacing * (l + 0.8);
        const name =
          l === 0 ? 'Entrada (Inputs)' : l === totalLayers - 1 ? 'Salida (Output)' : `Capa Oculta ${l}`;
        ctx.fillText(name, x, height - 12);
      }
    };

    render();

    // Propagation animation ticker
    if (isPropagating) {
      const stepInterval = setInterval(() => {
        setSignalProgress((prev) => {
          if (prev >= 1) {
            clearInterval(stepInterval);
            setIsPropagating(false);
            return 1;
          }
          return prev + 0.04;
        });
      }, 30);

      return () => clearInterval(stepInterval);
    }
  }, [hiddenLayersCount, neuronsPerHidden, activationFn, weightMultiplier, isPropagating, signalProgress]);

  return (
    <section id="neural" className="py-24 relative border-t border-gray-900 bg-[#0d1117]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#161b22] text-xs font-mono text-[#00f0ff] mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>MÓDULO 04 • DEEP LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Redes <span className="text-[#00f0ff]">Neuronales</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Representación topológica interactiva: observa la propagación hacia adelante (Forward Pass) y cómo cada capa densa transforma combinaciones lineales mediante funciones de activación.
          </p>
        </div>

        {/* Neural Network Interactive Canvas & Controls */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-sm text-white font-bold">TOPOLOGÍA PERCEPTRÓN MULTICAPA (MLP)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={triggerPropagation}
                disabled={isPropagating}
                className="px-4 py-2 rounded-lg bg-[#00ff88] text-black font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                {isPropagating ? 'Propagando Señal...' : 'Propagar Señal (Forward Pass)'}
              </button>
            </div>
          </div>

          {/* Canvas Container */}
          <div className="w-full bg-[#0a0d13] rounded-xl border border-gray-800/80 p-2 mb-8 overflow-hidden">
            <canvas ref={canvasRef} className="w-full block" />
          </div>

          {/* Interactive Parameters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* Number of Hidden Layers */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-gray-300">Capas Ocultas:</span>
                <span className="text-[#00f0ff] font-bold">{hiddenLayersCount} capas</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={hiddenLayersCount}
                onChange={(e) => setHiddenLayersCount(+e.target.value)}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
            </div>

            {/* Neurons per layer */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-gray-300">Neuronas / Capa Oculta:</span>
                <span className="text-[#00ff88] font-bold">{neuronsPerHidden} neuronas</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                value={neuronsPerHidden}
                onChange={(e) => setNeuronsPerHidden(+e.target.value)}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
              />
            </div>

            {/* Activation function selector */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-gray-300">Función de Activación:</span>
                <span className="text-[#38bdf8] font-bold uppercase">{activationFn}</span>
              </div>
              <div className="flex gap-1.5">
                {(['sigmoid', 'relu', 'tanh'] as const).map((fn) => (
                  <button
                    key={fn}
                    onClick={() => setActivationFn(fn)}
                    className={`flex-1 py-1.5 text-xs font-mono rounded uppercase transition-all ${
                      activationFn === fn
                        ? 'bg-[#38bdf8] text-black font-bold shadow-[0_0_10px_#38bdf8]'
                        : 'bg-[#161b22] border border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>

            {/* Output probabilities readout */}
            <div className="bg-[#0d1117] p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-gray-400">SOFTMAX DE SALIDA</span>
              <div className="flex justify-between text-xs font-mono font-bold mt-1">
                <span className="text-[#00f0ff]">Clase A: {(outputValues[0] * 100).toFixed(1)}%</span>
                <span className="text-[#00ff88]">Clase B: {(outputValues[1] * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
