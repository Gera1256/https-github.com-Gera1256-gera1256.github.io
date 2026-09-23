import { useState } from 'react';
import { Terminal, Code, Cpu, Database, Cloud, Layers, Check } from 'lucide-react';

const TECH_TOOLS = [
  {
    name: 'Python',
    category: 'Lenguajes',
    badge: 'Standard de facto',
    desc: 'Lenguaje universal en Data Science e IA por su ecosistema de cálculo numérico vectorizado y sintaxis legible.',
    snippet: 'import torch\nmodel = torch.nn.Linear(784, 10)',
  },
  {
    name: 'PyTorch',
    category: 'Deep Learning',
    badge: 'Líder en Investigación',
    desc: 'Framework de tensores acelerados en GPU con grafos de computación dinámica y autograd nativo.',
    snippet: 'loss = criterion(output, target)\nloss.backward()\noptimizer.step()',
  },
  {
    name: 'TensorFlow',
    category: 'Deep Learning',
    badge: 'Producción & Edge',
    desc: 'Ecosistema integral de Google para entrenamiento distribuido a escala y despliegue en TF Lite / Serving.',
    snippet: 'model = tf.keras.Sequential([\n  tf.keras.layers.Dense(128, activation="relu")\n])',
  },
  {
    name: 'Scikit-learn',
    category: 'Machine Learning',
    badge: 'Algoritmos Clásicos',
    desc: 'La librería fundamental para clasificación, regresión, clustering y preprocesamiento estandarizado.',
    snippet: 'from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier().fit(X, y)',
  },
  {
    name: 'Pandas',
    category: 'Data Wrangling',
    badge: 'Estructuras de Datos',
    desc: 'DataFrames de alto rendimiento para manipulación tabular, alineación de índices y series temporales.',
    snippet: 'df.groupby("categoria")["ventas"].agg(["mean", "std"])',
  },
  {
    name: 'NumPy',
    category: 'Cálculo Numérico',
    badge: 'Fundación Matemática',
    desc: 'Arreglos N-dimensionales implementados en C, soporte para álgebra lineal y transformadas de Fourier.',
    snippet: 'A = np.dot(X, weights) + bias\nactivations = 1 / (1 + np.exp(-A))',
  },
  {
    name: 'Jupyter Notebooks',
    category: 'Entornos',
    badge: 'Prototipado Rápido',
    desc: 'Entorno computacional interactivo que combina código ejecutable, visualizaciones enriquecidas y markdown.',
    snippet: '%matplotlib inline\nplt.plot(history.history["loss"])',
  },
  {
    name: 'SQL & Data Warehouses',
    category: 'Bases de Datos',
    badge: 'Gestión Relacional',
    desc: 'Lenguaje estándar para consultas analíticas masivas sobre BigQuery, Snowflake, PostgreSQL y DuckDB.',
    snippet: 'SELECT user_id, COUNT(*) as sessions\nFROM telemetry GROUP BY 1 HAVING COUNT(*) > 10',
  },
  {
    name: 'Docker & Contenedores',
    category: 'MLOps',
    badge: 'Reproducibilidad',
    desc: 'Empaquetado de modelos con sus dependencias exactas y drivers CUDA para despliegues deterministas.',
    snippet: 'FROM pytorch/pytorch:2.1.0-cuda12.1\nCOPY . /app\nCMD ["python", "serve.py"]',
  },
  {
    name: 'APIs & Microservicios',
    category: 'Despliegue',
    badge: 'FastAPI / gRPC',
    desc: 'Exposición de inferencia de baja latencia mediante endpoints asíncronos y serialización protobuf.',
    snippet: '@app.post("/predict")\nasync def infer(data: InputSchema):\n    return model.predict(data)',
  },
  {
    name: 'Cloud Computing (GCP/AWS)',
    category: 'Infraestructura',
    badge: 'TPUs & GPUs H100',
    desc: 'Clusters elásticos de cómputo para entrenamiento paralelo de modelos fundacionales a gran escala.',
    snippet: 'gcloud ai custom-jobs create --region=us-central1',
  },
];

const CATEGORIES = ['Todos', 'Deep Learning', 'Machine Learning', 'Data Wrangling', 'Infraestructura', 'MLOps'];

export default function TechToolsSection() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'Todos'
    ? TECH_TOOLS
    : TECH_TOOLS.filter((t) => t.category === activeCategory || (activeCategory === 'Infraestructura' && (t.category === 'Bases de Datos' || t.category === 'Infraestructura')));

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="herramientas" className="py-24 relative border-t border-gray-900 bg-[#0d1117]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff88]/30 bg-[#161b22] text-xs font-mono text-[#00ff88] mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>MÓDULO 10 • STACK TECNOLÓGICO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Tecnologías y <span className="text-[#00ff88]">Herramientas</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            El stack de ingeniería y computación científica que sustenta los pipelines modernos de investigación y producción en Inteligencia Artificial.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#00ff88] text-black font-bold shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                  : 'bg-[#161b22] border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool, idx) => (
            <div
              key={tool.name}
              className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00ff88]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#00ff88]">{tool.category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-gray-400 border border-gray-800">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">{tool.desc}</p>
              </div>

              <div>
                <div className="bg-[#080b10] p-3 rounded-lg border border-gray-800 relative font-mono text-xs text-gray-300">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                    <span>SINTAXIS TÍPICA</span>
                    <button
                      onClick={() => handleCopy(tool.snippet, idx)}
                      className="hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-[#00ff88]" /> Copiado
                        </>
                      ) : (
                        'Copiar'
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-[#00f0ff]">{tool.snippet}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
