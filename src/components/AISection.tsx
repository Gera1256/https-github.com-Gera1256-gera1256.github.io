import { useState } from 'react';
import {
  Brain,
  Cpu,
  Eye,
  MessageSquare,
  Sparkles,
  Bot,
  Layers,
  History,
  CheckCircle,
  ExternalLink,
  Zap,
} from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '1950',
    title: 'Test de Turing',
    author: 'Alan Turing',
    desc: 'Publicación de "Computing Machinery and Intelligence", proponiendo la prueba de capacidad de una máquina para exhibir comportamiento inteligente.',
  },
  {
    year: '1956',
    title: 'Nacimiento de la IA',
    author: 'Dartmouth Workshop',
    desc: 'John McCarthy, Marvin Minsky y Claude Shannon acuñan formalmente el término "Inteligencia Artificial" como campo de investigación formal.',
  },
  {
    year: '1980s',
    title: 'Sistemas Expertos & Invierno',
    author: 'Reglas Simbólicas',
    desc: 'Auge de motores de inferencia basados en reglas seguidos por limitaciones computacionales y falta de flexibilidad contextual.',
  },
  {
    year: '1997',
    title: 'Deep Blue vence a Kasparov',
    author: 'IBM Research',
    desc: 'Primera supercomputadora en derrotar al campeón mundial de ajedrez usando búsqueda de árbol heurística masiva.',
  },
  {
    year: '2012',
    title: 'Revolución Deep Learning',
    author: 'AlexNet (ImageNet)',
    desc: 'Redes neuronales convolucionales profundas aceleradas en GPU reducen drásticamente la tasa de error en visión por computadora.',
  },
  {
    year: '2017',
    title: 'Arquitectura Transformer',
    author: 'Vaswani et al.',
    desc: 'Publicación de "Attention Is All You Need", reemplazando arquitecturas recurrentes y sentando las bases de los LLMs modernos.',
  },
  {
    year: '2022+',
    title: 'Era Generativa y Agentes',
    author: 'Modelos Fundacionales',
    desc: 'Despliegue masivo de modelos multimodales, agentes autónomos y capacidades de razonamiento en cadena de pensamiento.',
  },
];

const AI_CONCEPTS = [
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Aprendizaje Automático',
    icon: Cpu,
    desc: 'Subcampo que permite a las máquinas aprender patrones directamente a partir de datos históricos sin ser programadas explícitamente regla por regla.',
    example: 'Detección de fraudes bancarios en transacciones analizando millones de anomalías vectoriales por segundo.',
    tags: ['Supervisado', 'No Supervisado', 'Reinforcement'],
    color: '#00f0ff',
  },
  {
    id: 'nn',
    title: 'Redes Neuronales',
    subtitle: 'Deep Learning',
    icon: Layers,
    desc: 'Modelos computacionales bioinspirados estructurados en capas de neuronas interconectadas que optimizan representaciones matemáticas complejas.',
    example: 'Identificación de tumores en resonancias magnéticas con mayor precisión que diagnósticos humanos estándar.',
    tags: ['Backpropagation', 'Pesos Sinápticos', 'Tensores'],
    color: '#00ff88',
  },
  {
    id: 'nlp',
    title: 'Procesamiento de Lenguaje (NLP)',
    subtitle: 'Semántica y Sintaxis',
    icon: MessageSquare,
    desc: 'Habilidad de los sistemas para interpretar, contextualizar, traducir y sintetizar texto y voz humana con comprensión semántica.',
    example: 'Traducción simultánea en tiempo real y análisis de sentimiento institucional en noticias financieras.',
    tags: ['Tokenización', 'Embeddings', 'Transformers'],
    color: '#38bdf8',
  },
  {
    id: 'cv',
    title: 'Visión por Computadora',
    subtitle: 'Percepción Visual',
    icon: Eye,
    desc: 'Algoritmos diseñados para extraer información estructurada y semántica a partir de imágenes, secuencias de video y nubes de puntos 3D.',
    example: 'Navegación espacial autónoma en vehículos Tesla y robots quirúrgicos de micro-precisión.',
    tags: ['YOLO', 'Segmentación', 'Convoluciones'],
    color: '#a855f7',
  },
  {
    id: 'genai',
    title: 'IA Generativa',
    subtitle: 'Creación Multimodal',
    icon: Sparkles,
    desc: 'Sistemas con capacidades probabilísticas para generar contenido inédito (código, prosa, sonido, video, síntesis molecular) según indicaciones (prompts).',
    example: 'Diseño de nuevas cadenas proteicas para fármacos y asistencia en desarrollo de software complejo.',
    tags: ['Diffusion', 'LLMs', 'Latent Space'],
    color: '#f43f5e',
  },
  {
    id: 'agents',
    title: 'Agentes Inteligentes',
    subtitle: 'Autonomía y Decisión',
    icon: Bot,
    desc: 'Entidades de software que perciben su entorno, planifican acciones en múltiples pasos, ejecutan herramientas y aprenden del feedback.',
    example: 'Auditoría automatizada de vulnerabilidades en infraestructura cloud y orquestación de flujos de trabajo.',
    tags: ['ReAct', 'Tool-Use', 'Memoria MCP'],
    color: '#eab308',
  },
];

export default function AISection() {
  const [activeTimeline, setActiveTimeline] = useState(6);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  return (
    <section id="ia" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#161b22] text-xs font-mono text-[#00f0ff] mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>MÓDULO 01 • FUNDAMENTOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            ¿Qué es la <span className="text-[#00f0ff]">Inteligencia Artificial</span>?
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            La Inteligencia Artificial es la disciplina computacional dedicada a la construcción de sistemas capaces de resolver problemas complejos que históricamente requerían cognición biológica: razonamiento, percepción, abstracción y toma de decisiones probabilísticas.
          </p>
        </div>

        {/* AI Types Matrix: Débil vs General vs Generativa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-[#00f0ff]/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                ANI • Narrow AI
              </span>
              <span className="text-gray-500 text-xs font-mono">Presente</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">IA Débil o Estrecha</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Especializada en una única tarea delimitada. No posee conciencia ni capacidad de extrapolar su destreza más allá de su dominio de entrenamiento.
            </p>
            <div className="text-xs font-mono text-gray-400 bg-[#0d1117] p-3 rounded border border-gray-800">
              <strong className="text-[#00f0ff]">Ejemplo:</strong> Filtros anti-spam, reconocimiento facial en smartphones, ajedrez computacional.
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-[#00ff88]/30 bg-[#161b22]/90 shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30">
                GEN-AI & LLMs
              </span>
              <span className="text-[#00ff88] text-xs font-mono font-bold">Revolución Actual</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">IA Generativa y Multimodal</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Aprende las distribuciones subyacentes de vastos corpus de datos y sintetiza contenido novedoso y contextual en texto, audio, imagen y código ejecutable.
            </p>
            <div className="text-xs font-mono text-gray-400 bg-[#0d1117] p-3 rounded border border-gray-800">
              <strong className="text-[#00ff88]">Ejemplo:</strong> Gemini, Claude, Stable Diffusion, asistentes de código y modelos de razonamiento profundo.
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                AGI • General AI
              </span>
              <span className="text-gray-500 text-xs font-mono">Horizonte</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">IA General (AGI)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Capacidad hipotética de un sistema para comprender, aprender y aplicar conocimiento a través de cualquier labor cognitiva igualando o superando al intelecto humano.
            </p>
            <div className="text-xs font-mono text-gray-400 bg-[#0d1117] p-3 rounded border border-gray-800">
              <strong className="text-purple-400">Objetivo:</strong> Razonamiento autónomo interdisciplinario y transferencia de aprendizaje sin supervisión previa.
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-[#00ff88]" />
            <h3 className="text-2xl font-bold text-white">Historia y Evolución Cronológica</h3>
          </div>

          {/* Timeline navigation track */}
          <div className="overflow-x-auto pb-4 mb-4">
            <div className="flex items-center gap-3 min-w-[700px] border-b border-gray-800 pb-4">
              {TIMELINE_EVENTS.map((item, index) => (
                <button
                  key={item.year}
                  onClick={() => setActiveTimeline(index)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs transition-all flex flex-col items-center flex-1 cursor-pointer ${
                    activeTimeline === index
                      ? 'bg-[#00f0ff]/15 border border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-[#161b22] border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm">{item.year}</span>
                  <span className="truncate max-w-[100px] text-[10px] mt-0.5">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Milestone Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-xl border border-[#00f0ff]/30 bg-gradient-to-r from-[#161b22] to-[#0d1117] relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-[#00ff88] tracking-widest">
                  HITO HISTÓRICO // {TIMELINE_EVENTS[activeTimeline].year}
                </span>
                <h4 className="text-2xl font-bold text-white mt-1">
                  {TIMELINE_EVENTS[activeTimeline].title}
                </h4>
                <p className="text-sm font-mono text-gray-400">
                  {TIMELINE_EVENTS[activeTimeline].author}
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
              {TIMELINE_EVENTS[activeTimeline].desc}
            </p>
          </div>
        </div>

        {/* 6 Interactive Concept Cards with Hover Glow */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Pilares y Ramas Esenciales</h3>
              <p className="text-gray-400 text-sm">Explora las disciplinas fundamentales que componen el ecosistema de IA.</p>
            </div>
            <span className="text-xs font-mono text-[#00f0ff]">6 TECNOLOGÍAS CLAVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_CONCEPTS.map((concept) => {
              const IconComponent = concept.icon;
              const isSelected = selectedConcept === concept.id;
              return (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(isSelected ? null : concept.id)}
                  className="glass-panel rounded-xl p-6 border border-gray-800 hover:border-[#00f0ff]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
                  style={{
                    borderLeft: `4px solid ${concept.color}`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${concept.color}15` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: concept.color }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                        {concept.subtitle}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {concept.title}
                    </h4>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {concept.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800/80">
                    <div className="text-xs font-mono text-gray-300 mb-3 bg-[#0d1117] p-2.5 rounded border border-gray-800">
                      <span className="text-[#00ff88] font-bold block mb-1">Ejemplo Práctico:</span>
                      {concept.example}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {concept.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800/60 text-gray-300 border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
