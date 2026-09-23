import { useState, useMemo } from 'react';
import {
  Database,
  CheckCircle,
  BarChart3,
  LineChart,
  PieChart,
  Layers,
  ArrowRight,
  Filter,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const DS_STEPS = [
  {
    step: 1,
    name: 'Recolección de Datos',
    tag: 'DATA INGESTION',
    desc: 'Extracción de fuentes heterogéneas: bases de datos SQL/NoSQL, streaming Kafka, web scraping, sensores IoT y APIs REST.',
    tasks: ['Pipelines ETL/ELT', 'Validación de esquemas', 'Almacenamiento en Data Lake / Warehouse'],
    tools: ['Python', 'SQL', 'Apache Spark', 'Pandas'],
    color: '#00f0ff',
  },
  {
    step: 2,
    name: 'Limpieza y Transformación',
    tag: 'DATA WRANGLING',
    desc: 'Tratamiento de valores nulos (imputación KNN/media), detección y tratamiento de outliers, normalización min-max y estandarización z-score.',
    tasks: ['Manejo de NaNs', 'Encoding One-Hot / Target', 'Control de redundancia'],
    tools: ['Scikit-learn', 'Polars', 'dbt'],
    color: '#00ff88',
  },
  {
    step: 3,
    name: 'Análisis Exploratorio (EDA)',
    tag: 'EXPLORATORY ANALYSIS',
    desc: 'Descubrimiento de patrones iniciales, correlaciones cruzadas Pearson/Spearman, distribuciones univariadas y sesgos muestrales.',
    tasks: ['Histogramas y Boxplots', 'Matrices de calor de correlación', 'Análisis de estacionalidad'],
    tools: ['Seaborn', 'Matplotlib', 'Jupyter Lab'],
    color: '#38bdf8',
  },
  {
    step: 4,
    name: 'Inferencia Estadística',
    tag: 'STATISTICAL MODELING',
    desc: 'Validación de hipótesis mediante pruebas t de Student, ANOVA, intervalos de confianza Bayesianos y análisis de potencia.',
    tasks: ['Tests A/B', 'P-value < 0.05', 'Regresión multivariante'],
    tools: ['Statsmodels', 'SciPy', 'R'],
    color: '#a855f7',
  },
  {
    step: 5,
    name: 'Modelado Predictivo',
    tag: 'MACHINE LEARNING',
    desc: 'Selección de arquitecturas predictivas, validación cruzada k-fold estratificada, búsqueda de hiperparámetros Bayesian Optimization.',
    tasks: ['Random Forest', 'XGBoost', 'LightGBM', 'Redes Neuronales'],
    tools: ['XGBoost', 'PyTorch', 'Optuna'],
    color: '#f43f5e',
  },
  {
    step: 6,
    name: 'Visualización y Storytelling',
    tag: 'VISUALIZATION',
    desc: 'Representación gráfica interactiva y comunicación ejecutiva que traduce hallazgos algorítmicos en comprensión intuitiva.',
    tasks: ['Dashboards interactivos', 'Curvas ROC-AUC', 'Mapeo de características SHAP'],
    tools: ['D3.js', 'Plotly', 'PowerBI'],
    color: '#eab308',
  },
  {
    step: 7,
    name: 'Decisión e Impacto de Negocio',
    tag: 'BUSINESS VALUE',
    desc: 'Puesta en producción (MLOps), monitorización de data drift y generación de decisiones estratégicas que optimizan costos y resultados.',
    tasks: ['Despliegue de APIs', 'Monitoreo de Deriva (Evidently)', 'Optimización de ROI'],
    tools: ['Docker', 'MLflow', 'Kubernetes'],
    color: '#00ff88',
  },
];

export default function DataScienceSection() {
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic distribution chart simulator state
  const [dataSampleSize, setDataSampleSize] = useState(500);
  const [distributionMean, setDistributionMean] = useState(50);
  const [distributionStd, setDistributionStd] = useState(12);

  // Compute normal distribution points for dynamic SVG curve
  const points = useMemo(() => {
    const pts = [];
    const minX = 0;
    const maxX = 100;
    const step = 2;
    for (let x = minX; x <= maxX; x += step) {
      const exponent = -0.5 * Math.pow((x - distributionMean) / distributionStd, 2);
      const y = (1 / (distributionStd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      pts.push({ x, y: y * 450 }); // scaled for SVG viewBox
    }
    return pts;
  }, [distributionMean, distributionStd]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, pt, i) => {
      // Map x from 0..100 to SVG 20..380, and y from 0..30 to SVG 180..20
      const svgX = 20 + (pt.x / 100) * 360;
      const svgY = 170 - pt.y * 7;
      return `${acc} ${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
    }, '');
  }, [points]);

  return (
    <section id="datascience" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38bdf8]/30 bg-[#161b22] text-xs font-mono text-[#38bdf8] mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>MÓDULO 03 • PIPELINE DE DATOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ciencia de <span className="text-[#38bdf8]">Datos</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Del dato crudo a la decisión estratégica de alto impacto: el ciclo sistemático que transforma ruido en información, conocimiento y valor cuantificable.
          </p>
        </div>

        {/* 7-Step Interactive Pipeline Carousel / Flow */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              El Ciclo de Vida Completo (Data Pipeline)
            </h3>
            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              Haz clic en cualquier fase para inspeccionar
            </span>
          </div>

          {/* Stepper buttons track */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {DS_STEPS.map((s, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border border-[#38bdf8] bg-[#38bdf8]/15 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'border border-gray-800 bg-[#161b22] hover:border-gray-700'
                  }`}
                >
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{ color: isCurrent ? '#38bdf8' : '#8b949e' }}
                  >
                    0{s.step}. FASE
                  </span>
                  <span className="text-xs font-bold text-white mt-1 line-clamp-1">{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed step viewer */}
          {(() => {
            const current = DS_STEPS[activeStep];
            return (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${current.color}15`,
                        color: current.color,
                        border: `1px solid ${current.color}40`,
                      }}
                    >
                      Paso {current.step} // {current.tag}
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-2">{current.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStep((activeStep - 1 + DS_STEPS.length) % DS_STEPS.length)}
                      className="px-3 py-1.5 rounded text-xs font-mono bg-[#0d1117] border border-gray-800 text-gray-300 hover:text-white"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={() => setActiveStep((activeStep + 1) % DS_STEPS.length)}
                      className="px-3 py-1.5 rounded text-xs font-mono bg-[#38bdf8] text-black font-bold hover:shadow-[0_0_10px_#38bdf8]"
                    >
                      Siguiente →
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-4xl">
                  {current.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div>
                    <h5 className="text-xs font-mono text-gray-400 mb-2">TAREAS TÉCNICAS ESPECÍFICAS</h5>
                    <ul className="space-y-1.5">
                      {current.tasks.map((task, i) => (
                        <li key={i} className="text-sm text-gray-200 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono text-gray-400 mb-2">HERRAMIENTAS Y LIBRERÍAS DE LA INDUSTRIA</h5>
                    <div className="flex flex-wrap gap-2">
                      {current.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded bg-[#0d1117] border border-gray-800 text-xs font-mono text-[#00f0ff]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Dynamic SVG / Canvas Statistical Distribution Explorer */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#00ff88] font-mono text-xs mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>VISUALIZADOR ESTADÍSTICO DINÁMICO</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Curva de Distribución Normal (Gaussiana) & Parámetros
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-400">
              N = {dataSampleSize} observaciones
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-300">Media ($\mu$):</span>
                  <span className="text-[#00f0ff] font-bold">{distributionMean}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={distributionMean}
                  onChange={(e) => setDistributionMean(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-300">Desviación Estándar ($\sigma$):</span>
                  <span className="text-[#00ff88] font-bold">{distributionStd}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={distributionStd}
                  onChange={(e) => setDistributionStd(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-300">Tamaño Muestral ($N$):</span>
                  <span className="text-[#38bdf8] font-bold">{dataSampleSize}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={dataSampleSize}
                  onChange={(e) => setDataSampleSize(+e.target.value)}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
              </div>

              <div className="bg-[#0d1117] p-3 rounded text-xs font-mono border border-gray-800 space-y-1">
                <div className="text-gray-400">Regla Empírica 68-95-99.7:</div>
                <div className="text-[#00ff88]">• 68.2%: [{distributionMean - distributionStd} , {distributionMean + distributionStd}]</div>
                <div className="text-[#00f0ff]">• 95.4%: [{distributionMean - 2 * distributionStd} , {distributionMean + 2 * distributionStd}]</div>
              </div>
            </div>

            {/* Dynamic SVG Plot */}
            <div className="lg:col-span-2 bg-[#0d1117] p-4 rounded-xl border border-gray-800">
              <svg viewBox="0 0 400 200" className="w-full h-56">
                {/* Grid lines */}
                <line x1="20" y1="170" x2="380" y2="170" stroke="#30363d" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="170" stroke="#30363d" strokeWidth="1" />

                {/* Mean vertical indicator */}
                <line
                  x1={20 + (distributionMean / 100) * 360}
                  y1="20"
                  x2={20 + (distributionMean / 100) * 360}
                  y2="170"
                  stroke="#00ff88"
                  strokeDasharray="4"
                  strokeWidth="1.5"
                />

                {/* Area fill */}
                <path
                  d={`${pathD} L ${20 + 360} 170 L 20 170 Z`}
                  fill="url(#densityGradient)"
                  opacity="0.35"
                />

                {/* Curve stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* Gradient Def */}
                <defs>
                  <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Axis labels */}
                <text x="20" y="190" fill="#8b949e" fontSize="10" fontFamily="monospace">0</text>
                <text x="190" y="190" fill="#8b949e" fontSize="10" fontFamily="monospace">50</text>
                <text x="365" y="190" fill="#8b949e" fontSize="10" fontFamily="monospace">100</text>
                <text
                  x={15 + (distributionMean / 100) * 360}
                  y="15"
                  fill="#00ff88"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  μ={distributionMean}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
