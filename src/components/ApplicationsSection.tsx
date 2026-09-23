import { useState } from 'react';
import {
  HeartPulse,
  GraduationCap,
  Banknote,
  Factory,
  Sprout,
  Car,
  ShieldCheck,
  Bot,
  Megaphone,
  Atom,
  CheckCircle2,
} from 'lucide-react';

const SECTORS = [
  {
    name: 'Medicina & Salud',
    icon: HeartPulse,
    color: '#f43f5e',
    desc: 'Análisis asistido por visión computacional de patologías, genómica personalizada y predicción temprana de sepsis hospitalaria.',
    example: 'Algoritmos de Deep Learning detectan retinopatía diabética con 98.7% de sensibilidad en segundos.',
    impact: 'Reducción del 40% en tiempo de diagnóstico crítico',
  },
  {
    name: 'Educación & Aprendizaje',
    icon: GraduationCap,
    color: '#00f0ff',
    desc: 'Tutores cognitivos adaptativos que ajustan el ritmo, profundidad y estilo pedagógico a las fortalezas de cada estudiante.',
    example: 'Modelos de lenguaje que desglosan teoremas matemáticos con analogías personalizadas según el perfil cognitivo.',
    impact: 'Mejora del 35% en retención conceptual a largo plazo',
  },
  {
    name: 'Finanzas & Banca',
    icon: Banknote,
    color: '#00ff88',
    desc: 'Sistemas de scoring crediticio no lineal, detección instantánea de lavado de dinero y trading cuantitativo de alta frecuencia.',
    example: 'Modelos de grafos que rastrean redes de cuentas fantasmas y fraudes sintéticos en transferencias transfronterizas.',
    impact: 'Ahorro de miles de millones anuales en fraude predeterminado',
  },
  {
    name: 'Industria & Manufactura',
    icon: Factory,
    color: '#eab308',
    desc: 'Gemelos digitales (Digital Twins), control de calidad óptico superficial en tiempo real y mantenimiento predictivo de maquinaria.',
    example: 'Sensores acústicos combinados con FFT y redes neuronales predicen fallos en turbinas con 3 semanas de antelación.',
    impact: 'Disminución del 70% en paradas de planta no planificadas',
  },
  {
    name: 'Agricultura Inteligente',
    icon: Sprout,
    color: '#10b981',
    desc: 'Drones con cámaras multiespectrales que identifican estrés hídrico, plagas en micro-zonas y optimizan el uso de fertilizantes.',
    example: 'Sistemas de fumigación selectiva con Visión Artificial que reducen el uso de pesticidas en un 85%.',
    impact: 'Incremento del 25% en rendimiento agrícola sostenible',
  },
  {
    name: 'Transporte & Movilidad',
    icon: Car,
    color: '#38bdf8',
    desc: 'Vehículos autónomos nivel 4/5, optimización semafórica en tiempo real con aprendizaje por refuerzo y logística de flotas.',
    example: 'Planificación de rutas dinámicas que reducen emisiones de carbono en megalópolis en un 18%.',
    impact: 'Reducción drástica en siniestralidad vial urbana',
  },
  {
    name: 'Ciberseguridad Defensiva',
    icon: ShieldCheck,
    color: '#a855f7',
    desc: 'Identificación autónoma de exploits, análisis de comportamiento de entidades y respuesta orquestada sin intervención humana.',
    example: 'Modelos de aislamiento de endpoints que neutralizan ransomware antes del cifrado de volúmenes.',
    impact: 'Tiempo de respuesta a incidentes reducido de días a milisegundos',
  },
  {
    name: 'Robótica Avanzada',
    icon: Bot,
    color: '#06b6d4',
    desc: 'Robots colaborativos (Cobots) con control háptico fino y aprendizaje por imitación para ensamblaje de microcomponentes.',
    example: 'Brazos robóticos en almacenes logísticos que manipulan objetos de geometrías arbitrarias con precisión milimétrica.',
    impact: 'Operaciones ininterrumpidas en ambientes hostiles',
  },
  {
    name: 'Marketing & Audiencias',
    icon: Megaphone,
    color: '#ec4899',
    desc: 'Hiperpersonalización de catálogos en tiempo real, análisis de atribución multicanal y predicción de abandono (Churn).',
    example: 'Generación dinámica de creatividades publicitarias adaptadas al contexto demográfico y cultural del usuario.',
    impact: 'Multiplicación x3 en tasas de conversión online',
  },
  {
    name: 'Investigación Científica',
    icon: Atom,
    color: '#6366f1',
    desc: 'Simulaciones cuánticas, descubrimiento acelerado de materiales superconductores y plegamiento tridimensional de proteínas.',
    example: 'AlphaFold ha resuelto la estructura de casi todas las 200 millones de proteínas conocidas por la ciencia biológica.',
    impact: 'Avances de siglos condensados en meses de cómputo',
  },
];

export default function ApplicationsSection() {
  const [selectedSector, setSelectedSector] = useState<number | null>(0);

  return (
    <section id="aplicaciones" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#161b22] text-xs font-mono text-[#00f0ff] mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>MÓDULO 09 • CASOS DE USO REALES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Aplicaciones de la <span className="text-[#00f0ff]">IA</span> en la Sociedad
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            De la investigación abstracta a la transformación de industrias completas: cómo la Inteligencia Artificial resuelve desafíos críticos en múltiples dominios humanos.
          </p>
        </div>

        {/* 10 Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SECTORS.map((s, index) => {
            const Icon = s.icon;
            const isSelected = selectedSector === index;
            return (
              <div
                key={s.name}
                onClick={() => setSelectedSector(index)}
                className={`glass-panel p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'border-gray-800 hover:border-gray-700 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${s.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">0{index + 1}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2">{s.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{s.desc}</p>
                </div>

                <div className="pt-3 border-t border-gray-800/80">
                  <div className="text-[11px] font-mono text-gray-300 mb-2">
                    <span className="text-[#00ff88] font-bold block mb-0.5">Ejemplo Práctico:</span>
                    {s.example}
                  </div>
                  <div className="text-[10px] font-mono text-[#00f0ff] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {s.impact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
