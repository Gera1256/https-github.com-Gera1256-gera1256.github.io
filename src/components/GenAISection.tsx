import { useState, useRef, useEffect } from 'react';
import { Sparkles, Code2, Image as ImageIcon, Music, MessageSquare, Terminal, RefreshCw, Send, Check } from 'lucide-react';

const GEN_MODALITIES = [
  {
    id: 'text',
    name: 'Generación de Texto',
    icon: MessageSquare,
    desc: 'Arquitecturas autorregresivas Transformer que calculan distribuciones de probabilidad sobre el siguiente token textual.',
    badge: 'LLMs & SLMs',
  },
  {
    id: 'image',
    name: 'Generación de Imágenes',
    icon: ImageIcon,
    desc: 'Modelos de Difusión Latente (LDMs) que transforman ruido gaussiano estocástico en imágenes fotorrealistas mediante desruidado guiado.',
    badge: 'Diffusion Models',
  },
  {
    id: 'code',
    name: 'Generación de Código',
    icon: Code2,
    desc: 'Modelos entrenados en árboles de sintaxis abstracta (AST) y repositorios masivos, capaces de razonamiento lógico y refactorización.',
    badge: 'Coding LLMs',
  },
  {
    id: 'audio',
    name: 'Generación de Audio',
    icon: Music,
    desc: 'Modelado espectrográfico y tokenización de audio neuronal para síntesis de voz indistinguible y composición musical adaptativa.',
    badge: 'Neural Audio',
  },
];

const PROMPT_PRESETS = [
  {
    label: 'Explicar Redes Neuronales a un niño',
    prompt: 'Explica qué es una red neuronal como si fuera un cerebro mágico hecho de luciérnagas conectadas.',
    response: 'Imagina un gran bosque oscuro donde viven miles de pequeñas luciérnagas. Cada luciérnaga sabe un pequeño secreto. Cuando una ve una pista (como la forma de una oreja de gato), brilla fuerte y le pasa una chispa a sus amigas. Al final del bosque, la luciérnaga reina ve todas las chispas y dice: "¡Eso es un gato!" Así aprende una red neuronal.',
  },
  {
    label: 'Optimizar Algoritmo en Python',
    prompt: 'Escribe una función en Python para calcular números primos en tiempo O(N log log N) con Criba de Eratóstenes.',
    response: `def criba_eratostenes(limite: int) -> list[int]:
    """Genera números primos hasta 'limite' de forma óptima."""
    es_primo = [True] * (limite + 1)
    es_primo[0] = es_primo[1] = False
    
    for p in range(2, int(limite**0.5) + 1):
        if es_primo[p]:
            for multiplo in range(p * p, limite + 1, p):
                es_primo[multiplo] = False
                
    return [i for i, primo in enumerate(es_primo) if primo]

# Inferencia completada con éxito en 0.002s`,
  },
  {
    label: 'Crear Prompt de Arquitectura Cyberpunk',
    prompt: 'Genera un prompt detallado para sintetizar una metrópoli cyberpunk en Unreal Engine 5.',
    response: 'Hyperrealistic cinematic shot of Neo-Tokyo 2099, neon rain reflecting cyan and magenta light on wet asphalt, towering holographic billboards, flying autonomous drones, volumetric fog, octane render 8k, ray tracing global illumination, anamorphic lens flare.',
  },
];

export default function GenAISection() {
  const [activePreset, setActivePreset] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [diffusionStep, setDiffusionStep] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulate token streaming
  const handleGenerate = (index: number) => {
    setActivePreset(index);
    setIsGenerating(true);
    setDisplayedText('');

    const fullText = PROMPT_PRESETS[index].response;
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        currentIdx += Math.floor(Math.random() * 4) + 2;
        setDisplayedText(fullText.slice(0, currentIdx));
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 25);
  };

  useEffect(() => {
    handleGenerate(0);
  }, []);

  // Simulate diffusion noise to image on Canvas
  const triggerDiffusionSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      step++;
      setDiffusionStep(Math.round(((totalSteps - step) / totalSteps) * 100));

      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      const clarity = step / totalSteps;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;

          // Target matrix cyber pattern
          const cyberX = Math.sin(x / 15) * Math.cos(y / 15);
          const targetR = Math.floor((Math.sin(x / 20) + 1) * 30);
          const targetG = Math.floor((cyberX + 1) * 120 + 20);
          const targetB = Math.floor((Math.cos(y / 20) + 1) * 120 + 40);

          // Noise
          const noiseR = Math.random() * 255;
          const noiseG = Math.random() * 255;
          const noiseB = Math.random() * 255;

          data[i] = noiseR * (1 - clarity) + targetR * clarity;
          data[i + 1] = noiseG * (1 - clarity) + targetG * clarity;
          data[i + 2] = noiseB * (1 - clarity) + targetB * clarity;
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if (step >= totalSteps) {
        clearInterval(interval);
        setDiffusionStep(0);
      }
    }, 60);
  };

  useEffect(() => {
    triggerDiffusionSimulation();
  }, []);

  return (
    <section id="genai" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-[#161b22] text-xs font-mono text-pink-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MÓDULO 05 • MODELOS FUNDACIONALES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-[#00f0ff]">Generativa</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            La transición de la discriminación probabilística a la síntesis creativa: cómo los modelos de atención y difusión crean nuevo contenido mediante muestreo en espacios latentes.
          </p>
        </div>

        {/* 4 Modalities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GEN_MODALITIES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-pink-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mod.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{mod.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Generative Studio Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LLM Streaming Simulator (Cols 7) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00f0ff]" />
                  <span className="font-mono text-xs font-bold text-white">
                    SIMULADOR DE INFERENCIA DE TOKENS (LLM STREAMING)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30">
                  {isGenerating ? 'Generando tokens...' : 'Inferencia completa'}
                </span>
              </div>

              {/* Preset buttons */}
              <div className="space-y-1.5 mb-4">
                <span className="text-xs font-mono text-gray-400">Seleccionar Prompt de Demostración:</span>
                <div className="flex flex-wrap gap-2">
                  {PROMPT_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGenerate(idx)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                        activePreset === idx
                          ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_10px_#00f0ff]'
                          : 'bg-[#0d1117] border border-gray-800 text-gray-300 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt box */}
              <div className="bg-[#0d1117] p-3 rounded-lg border border-gray-800 mb-4 text-xs font-mono">
                <span className="text-[#00f0ff] font-bold">PROMPT: </span>
                <span className="text-gray-300">{PROMPT_PRESETS[activePreset].prompt}</span>
              </div>

              {/* Output stream box */}
              <div className="bg-[#0a0d13] p-4 rounded-xl border border-gray-800/90 min-h-[160px] max-h-[220px] overflow-y-auto font-mono text-xs text-[#00ff88] leading-relaxed relative">
                <pre className="whitespace-pre-wrap font-mono">{displayedText}</pre>
                {isGenerating && <span className="inline-block w-2 h-4 bg-[#00ff88] ml-1 animate-pulse" />}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Tokens/seg: ~68 t/s</span>
              <span>Temperatura: 0.7 • Top-P: 0.95</span>
            </div>
          </div>

          {/* Diffusion Noise to Latent Image Simulator (Cols 5) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="font-mono text-xs font-bold text-white">
                    PROCESO DE DIFUSIÓN (DESRUIDADO)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">
                  Ruido: {diffusionStep}%
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-gray-800 mb-4 bg-black aspect-square max-w-[280px] mx-auto">
                <canvas ref={canvasRef} width={280} height={280} className="w-full h-full block" />
                {diffusionStep > 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-[#00f0ff] border border-gray-800">
                    Paso estocástico ({20 - Math.round(diffusionStep / 5)}/20)
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed text-center">
                El modelo predice el gradiente de ruido inverso (Score-based Matching) en cada paso del planificador DDIM.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-800">
              <button
                onClick={triggerDiffusionSimulation}
                className="w-full py-2.5 rounded-lg bg-pink-500/20 border border-pink-500/50 text-pink-300 hover:bg-pink-500/30 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reiniciar Síntesis por Difusión
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
