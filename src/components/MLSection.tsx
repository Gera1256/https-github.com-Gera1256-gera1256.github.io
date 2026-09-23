import { useState, useMemo } from 'react';
import {
  Cpu,
  TrendingUp,
  Grid,
  Zap,
  RotateCw,
  Sliders,
  CheckCircle,
  HelpCircle,
  Activity,
  ArrowRight,
} from 'lucide-react';

export default function MLSection() {
  const [activeTab, setActiveTab] = useState<'supervisado' | 'nosupervisado' | 'refuerzo'>('supervisado');

  // Interactive prediction simulator state
  const [trainingHours, setTrainingHours] = useState(45);
  const [learningRate, setLearningRate] = useState(0.01);
  const [regularization, setRegularization] = useState(0.05);
  const [datasetQuality, setDatasetQuality] = useState(85);

  // Reinforcement learning step simulator
  const [rlStep, setRlStep] = useState(0);
  const [rlReward, setRlReward] = useState(120);

  // Calculate simulated prediction score
  const prediction = useMemo(() => {
    // Math simulation formula: sigmoid-like response
    const factor =
      (trainingHours / 100) * 0.45 +
      (datasetQuality / 100) * 0.45 -
      Math.abs(learningRate - 0.005) * 8 -
      regularization * 0.15;
    const clamped = Math.max(0.1, Math.min(0.998, factor));
    const accuracy = (clamped * 100).toFixed(1);
    const loss = Math.max(0.012, (1 - clamped) * 0.85).toFixed(3);
    const speed = (trainingHours * 12.4 + datasetQuality * 8.2).toFixed(0);

    return { accuracy, loss, speed, isOptimal: clamped > 0.85 };
  }, [trainingHours, learningRate, regularization, datasetQuality]);

  const handleNextRlStep = () => {
    setRlStep(prev => (prev + 1) % 4);
    setRlReward(prev => prev + Math.floor(Math.random() * 25) + 5);
  };

  return (
    <section id="ml" className="py-24 relative border-t border-gray-900 bg-[#0d1117]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#161b22] text-xs font-mono text-[#00ff88] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>MÓDULO 02 • ALGORITMOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Machine <span className="text-[#00ff88]">Learning</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            El motor matemático que extrae conocimiento inductivo de los datos: cómo las máquinas generalizan patrones para clasificar, predecir y tomar acciones de recompensa óptima.
          </p>
        </div>

        {/* 3 Paradigms Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-[#161b22] border border-gray-800">
            <button
              onClick={() => setActiveTab('supervisado')}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'supervisado'
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              1. Aprendizaje Supervisado
            </button>
            <button
              onClick={() => setActiveTab('nosupervisado')}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'nosupervisado'
                  ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              2. Aprendizaje No Supervisado
            </button>
            <button
              onClick={() => setActiveTab('refuerzo')}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'refuerzo'
                  ? 'bg-[#38bdf8] text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              3. Aprendizaje por Refuerzo (RL)
            </button>
          </div>
        </div>

        {/* Tab 1: Supervisado */}
        {activeTab === 'supervisado' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00f0ff]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center mb-4 text-[#00f0ff]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Regresión</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Predicción de una variable continua u objetivo cuantitativo basado en vectores de características dependientes.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-gray-500">// Ejemplos de uso:</div>
                <div className="text-white">• Previsión de precios de viviendas (m², zona)</div>
                <div className="text-white">• Demanda energética de la red eléctrica</div>
                <div className="text-white">• Estimación de esperanza de vida</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00f0ff]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center mb-4 text-[#00f0ff]">
                <Grid className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Clasificación</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Asignación de observaciones discretas a etiquetas de clase categóricas mediante hiperplanos de decisión probabilísticos.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-gray-500">// Ejemplos de uso:</div>
                <div className="text-white">• Diagnóstico médico (Maligno / Benigno)</div>
                <div className="text-white">• Clasificación de emails (Spam / No Spam)</div>
                <div className="text-white">• Aprobación crediticia bancaria</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00f0ff]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center mb-4 text-[#00f0ff]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Predicción de Series Temporales</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Modelado estocástico que proyecta valores futuros a partir de secuencias históricas indexadas temporalmente.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-gray-500">// Ejemplos de uso:</div>
                <div className="text-white">• Pronóstico de volatilidad en bolsa de valores</div>
                <div className="text-white">• Mantenimiento predictivo de turbinas eólicas</div>
                <div className="text-white">• Detección de fugas en gasoductos</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: No supervisado */}
        {activeTab === 'nosupervisado' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00ff88]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mb-4 text-[#00ff88]">
                <Grid className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Clustering</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Agrupación automática de muestras sin etiquetas previas en base a métricas de distancia y similitud topológica.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-[#00ff88]">Algoritmos: K-Means, DBSCAN, Gaussian Mixture</div>
                <div className="text-gray-300">• Segmentación de cohortes de clientes</div>
                <div className="text-gray-300">• Agrupación genética de enfermedades raras</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00ff88]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mb-4 text-[#00ff88]">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Reducción de Dimensionalidad</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Compresión de espacios multidimensionales a planos manejables conservando la varianza y estructura intrínseca.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-[#00ff88]">Algoritmos: PCA, t-SNE, UMAP</div>
                <div className="text-gray-300">• Visualización 2D/3D de embeddings de LLMs</div>
                <div className="text-gray-300">• Eliminación de ruido y multicolinealidad</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00ff88]/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mb-4 text-[#00ff88]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Detección de Patrones</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Identificación de reglas de asociación oculta y valores atípicos (outliers) no perceptibles a simple vista.
              </p>
              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-[#00ff88]">Algoritmos: Apriori, Isolation Forest</div>
                <div className="text-gray-300">• Cesta de la compra y cross-selling</div>
                <div className="text-gray-300">• Detección de ciberataques no tipificados</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Aprendizaje por Refuerzo */}
        {activeTab === 'refuerzo' && (
          <div className="glass-panel p-8 rounded-xl border border-[#38bdf8]/40 mb-16 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>Ciclo de Aprendizaje por Refuerzo (RL)</span>
            </h3>
            <p className="text-gray-300 text-sm mb-8 max-w-3xl">
              El agente explora y explota políticas de comportamiento dentro de un entorno dinámico para maximizar una función de recompensa acumulada a largo plazo.
            </p>

            {/* Visual Interactive Pipeline: Agente -> Acción -> Entorno -> Recompensa */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-8">
              <div className={`p-4 rounded-lg border text-center transition-all ${
                rlStep === 0 ? 'border-[#00f0ff] bg-[#00f0ff]/15 shadow-[0_0_15px_#00f0ff]' : 'border-gray-800 bg-[#161b22]'
              }`}>
                <div className="text-xs font-mono text-[#00f0ff] mb-1">PASO 1</div>
                <div className="text-base font-bold text-white">AGENTE</div>
                <div className="text-xs text-gray-400 mt-1">Evalúa estado actual S(t)</div>
              </div>

              <div className={`p-4 rounded-lg border text-center transition-all ${
                rlStep === 1 ? 'border-[#00ff88] bg-[#00ff88]/15 shadow-[0_0_15px_#00ff88]' : 'border-gray-800 bg-[#161b22]'
              }`}>
                <div className="text-xs font-mono text-[#00ff88] mb-1">PASO 2</div>
                <div className="text-base font-bold text-white">ACCIÓN</div>
                <div className="text-xs text-gray-400 mt-1">Ejecuta movimiento A(t)</div>
              </div>

              <div className={`p-4 rounded-lg border text-center transition-all ${
                rlStep === 2 ? 'border-[#38bdf8] bg-[#38bdf8]/15 shadow-[0_0_15px_#38bdf8]' : 'border-gray-800 bg-[#161b22]'
              }`}>
                <div className="text-xs font-mono text-[#38bdf8] mb-1">PASO 3</div>
                <div className="text-base font-bold text-white">ENTORNO</div>
                <div className="text-xs text-gray-400 mt-1">Transiciona a S(t+1)</div>
              </div>

              <div className={`p-4 rounded-lg border text-center transition-all ${
                rlStep === 3 ? 'border-amber-400 bg-amber-400/15 shadow-[0_0_15px_#f59e0b]' : 'border-gray-800 bg-[#161b22]'
              }`}>
                <div className="text-xs font-mono text-amber-400 mb-1">PASO 4</div>
                <div className="text-base font-bold text-white">RECOMPENSA</div>
                <div className="text-xs text-gray-400 mt-1">Calcula feedback R(t+1)</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0d1117] p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-gray-400">Puntaje de Recompensa Acumulada:</span>
                <span className="text-xl font-bold text-[#00ff88]">+{rlReward} pts</span>
              </div>
              <button
                onClick={handleNextRlStep}
                className="px-4 py-2 rounded bg-[#38bdf8] text-black font-mono text-xs font-bold hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Ejecutar Siguiente Paso del Ciclo
              </button>
            </div>
          </div>
        )}

        {/* Interactive ML Simulator Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-xs mb-1">
                <Sliders className="w-4 h-4" />
                <span>LABORATORIO INTERACTIVO</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Simulador de Hiperparámetros y Predicción de Rendimiento
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 self-start md:self-auto">
              INFERENCIA LOCAL REACTIVA
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-gray-300">Épocas de Entrenamiento:</span>
                  <span className="text-[#00f0ff] font-bold">{trainingHours} épocas</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={trainingHours}
                  onChange={(e) => setTrainingHours(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-gray-300">Tasa de Aprendizaje (Learning Rate $\eta$):</span>
                  <span className="text-[#00ff88] font-bold">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.05"
                  step="0.002"
                  value={learningRate}
                  onChange={(e) => setLearningRate(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-gray-300">Calidad y Limpieza del Dataset:</span>
                  <span className="text-[#38bdf8] font-bold">{datasetQuality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={datasetQuality}
                  onChange={(e) => setDatasetQuality(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-gray-300">Regularización L2 (Weight Decay $\lambda$):</span>
                  <span className="text-purple-400 font-bold">{regularization}</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.20"
                  step="0.01"
                  value={regularization}
                  onChange={(e) => setRegularization(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>

            {/* Results HUD */}
            <div className="bg-[#0d1117] p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-xs font-mono text-gray-400">Métrica</span>
                  <span className="text-xs font-mono text-gray-400">Valor Calculado</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Precisión del Modelo (Accuracy):</span>
                  <span className="text-2xl font-mono font-bold text-[#00f0ff]">{prediction.accuracy}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff88] transition-all duration-300"
                    style={{ width: `${prediction.accuracy}%` }}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-300">Función de Pérdida (Loss Cross-Entropy):</span>
                  <span className="text-base font-mono font-bold text-[#00ff88]">{prediction.loss}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Inferencia de Rendimiento:</span>
                  <span className="text-sm font-mono text-gray-300">{prediction.speed} muestras/seg</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs font-mono">
                  {prediction.isOptimal ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                      <span className="text-[#00ff88]">Configuración óptima: Convergencia de modelo estable sin sobreajuste (Overfitting).</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">Ajuste subóptimo: Aumenta la calidad de datos o reduce la tasa de aprendizaje para evitar divergencia.</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
