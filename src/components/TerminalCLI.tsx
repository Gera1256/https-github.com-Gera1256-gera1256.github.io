import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Sparkles, Trash2, Cpu, ShieldCheck } from 'lucide-react';

interface TerminalOutput {
  id: string;
  command?: string;
  response: string;
  isError?: boolean;
}

const COMMAND_RESPONSES: Record<string, string> = {
  help: `COMANDOS DISPONIBLES EN NEXUS CORE CLI:
• help           : Despliega este menú de ayuda técnica
• ai.status      : Estado operacional de los motores de inferencia
• ml.models      : Lista de arquitecturas neuronales montadas en memoria
• data.analyze   : Ejecuta un pipeline sintético de análisis exploratorio
• neural.network : Diagnóstico de topología y pesos sinápticos
• security.scan  : Auditoría heurística de vectores de ataque perimetral
• system.info    : Especificaciones de hardware tensorial y versión de kernel
• matrix         : Activa la secuencia de código cuántico en cascada
• clear          : Limpia el historial de la terminal`,

  'ai.status': `[AI CORE INFERENCE ENGINE]
● Status: ONLINE (100% Operational)
● Neural Clusters: 32 Tensor Cores activos
● Active Context Window: 1,000,000 tokens
● Average Latency: 4.8ms
● Memory Consumption: 24.6 GB / 64 GB HBM3
● Safety Filter: Level 4 (Strict Alignment)`,

  'ml.models': `[MODELOS CARGADOS EN MEMORIA VRAM]
1. nexus-transformer-v4 (LLM, 70B params) -> F1: 0.994 [ACTIVO]
2. vision-segment-vit (ViT, 300M params) -> mIoU: 0.891 [ACTIVO]
3. audio-diff-speech (Diffusion, 120M) -> MOS: 4.85 [STANDBY]
4. tabular-gbm-v2 (Gradient Boost) -> AUC: 0.978 [ACTIVO]`,

  'data.analyze': `[INICIANDO PIPELINE DE CIENCIA DE DATOS]
[01] Ingesta de 500,000 registros vectoriales ... OK
[02] Imputación de valores nulos (KNN, k=5) ... 0.04% reparado
[03] Detección de outliers (Isolation Forest) ... 12 aislados
[04] Varianza explicada por componentes PCA (k=3) ... 94.6%
[05] Conclusión: Dataset balanceado, apto para entrenamiento.`,

  'neural.network': `[TOPOLOGÍA NEURONAL ACTIVA]
Capas: Entrada (x3) -> Oculta_1 (Dense_64, ReLU) -> Oculta_2 (Dense_32, Tanh) -> Salida (Softmax_2)
Optimizador: AdamW (lr=0.001, beta1=0.9, beta2=0.999)
Función de Coste: Categorical Cross-Entropy (Loss: 0.0418)
Gradientes: Sin desvanecimiento ni explosión detectados.`,

  'security.scan': `[ESCÁNER HEURÍSTICO DE CIBERSEGURIDAD SOC]
Analizando 48,920 paquetes de red entrantes...
[✓] Firma DDoS SYN Flood: 0 detectados
[✓] Escaneo de Puertos Nmap: Mitigado en IP 185.220.101.5
[✓] Inyección SQL en cabeceras HTTP: Bloqueada
[✓] Estado del Firewall Neuronal: 100% INTEGRIDAD GARANTIZADA`,

  'system.info': `[NEXUS ARCHITECTURE SPECIFICATIONS]
OS: Nexus Linux MicroKernel v6.12-rt
Arch: Tensor Architecture SIMD-X 512-bit
Node: cluster-matrix-alpha-09
Host: ais-dev-environment.google.internal
Uptime: 99.998% (342 días sin reinicio)
Build: 2026.09-Release-Prod`,

  matrix: `01001001 01000001 00100000 01010011 01001001 01010011 01010100 01000101 01001101 01000001
>>> NEXUS NEURAL MATRIX LINK ESTABLISHED <<<
"The question is not whether machines think, but whether humans do."
-- Alan Turing, 1950`,
};

export default function TerminalCLI() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      id: 'init-1',
      response: `BIENVENIDO A NEXUS.AI CORE TERMINAL [v4.8]
Escribe 'help' para explorar los comandos disponibles o utiliza los botones de acceso rápido.`,
    },
  ]);

  const outputEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const res =
      COMMAND_RESPONSES[cmd] ||
      `Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos válidos de la plataforma.`;

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        response: res,
        isError: !COMMAND_RESPONSES[cmd],
      },
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const quickCommands = [
    'help',
    'ai.status',
    'ml.models',
    'data.analyze',
    'neural.network',
    'security.scan',
    'system.info',
    'clear',
  ];

  return (
    <section id="terminal" className="py-24 relative border-t border-gray-900 bg-[#080b10]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#161b22] text-xs font-mono text-[#00ff88] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>MÓDULO 12 • CONSOLA DE COMANDOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Terminal <span className="text-[#00ff88]">Interactiva</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Controla y consulta el estado del núcleo de inteligencia artificial mediante la consola CLI integrada.
          </p>
        </div>

        {/* Quick command buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs font-mono text-gray-500 mr-2">Comandos Rápidos:</span>
          {quickCommands.map((qc) => (
            <button
              key={qc}
              onClick={() => executeCommand(qc)}
              className="px-2.5 py-1 rounded bg-[#161b22] border border-gray-800 hover:border-[#00ff88]/50 hover:text-[#00ff88] text-gray-300 font-mono text-xs transition-all cursor-pointer"
            >
              {qc}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="glass-panel rounded-2xl border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Title bar */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-gray-300">nexus@ai-core:~ (bash)</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
              <span>UTF-8</span>
              <span>TTY1</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs bg-[#090d13] min-h-[340px] max-h-[440px] overflow-y-auto space-y-4">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.command && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[#00ff88] font-bold">nexus@ai-core:~$</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                <div
                  className={`whitespace-pre-wrap leading-relaxed ${
                    item.isError ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {item.response}
                </div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* Input Bar */}
          <div className="bg-[#12171f] px-4 py-3 border-t border-gray-800 flex items-center gap-2">
            <span className="text-[#00ff88] font-mono text-xs font-bold shrink-0">
              nexus@ai-core:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe 'help' o un comando..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-gray-600"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1.5 rounded bg-[#00ff88] text-black font-mono text-xs font-bold hover:shadow-[0_0_10px_#00ff88] transition-all cursor-pointer flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
