import { useState } from 'react';
import { Scale, Lock, ShieldCheck, Eye, Users, Compass, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const ETHICS_TOPICS = [
  {
    id: 'bias',
    title: 'Sesgos Algorítmicos e Imparcialidad (Fairness)',
    icon: Scale,
    color: '#00f0ff',
    summary: 'Los modelos reproducen e incluso amplifican prejuicios históricos presentes en los datos de entrenamiento si no son auditados rigurosamente.',
    content: 'Cuando un algoritmo de selección de personal o concesión crediticia es entrenado con datos históricos desequilibrados, tiende a penalizar sistemáticamente a minorías. La mitigación exige técnicas de desesgo (fairness metrics, re-ponderación muestral, paridad demográfica y auditorías independientes).',
  },
  {
    id: 'privacy',
    title: 'Privacidad y Protección de Datos Personales',
    icon: Lock,
    color: '#00ff88',
    summary: 'El entrenamiento con volúmenes masivos de información exige salvaguardar el anonimato y la confidencialidad individual.',
    content: 'Técnicas criptográficas avanzadas como la Privacidad Diferencial (Differential Privacy), el Aprendizaje Federado (Federated Learning) y el Cifrado Homomórfico permiten entrenar modelos globales sin que los datos de los usuarios salgan de sus dispositivos locales ni se revelen vectores biométricos.',
  },
  {
    id: 'transparency',
    title: 'Transparencia y Explicabilidad (XAI)',
    icon: Eye,
    color: '#38bdf8',
    summary: 'Evitar el efecto "caja negra" en sectores donde una decisión algorítmica altera derechos fundamentales.',
    content: 'En medicina, justicia o finanzas, no basta con una alta precisión; es imprescindible comprender qué características pesaron en el veredicto. Frameworks como SHAP (Shapley Additive exPlanations) y LIME aportan atribución interpretable a las predicciones complejas.',
  },
  {
    id: 'work',
    title: 'Impacto en el Empleo y Transformación Laboral',
    icon: Users,
    color: '#eab308',
    summary: 'La automatización cognitiva reconfigura el mercado de trabajo: sustitución de tareas repetitivas y creación de nuevos roles de alta especialización.',
    content: 'Históricamente, las revoluciones tecnológicas destruyen empleos pero crean nuevos sectores económicos. El reto prioritario para las sociedades contemporáneas es la capacitación continua (reskilling) y una redistribución equitativa de los incrementos exponenciales de productividad.',
  },
  {
    id: 'future',
    title: 'Seguridad y Alineación con la Humanidad (Alignment)',
    icon: Compass,
    color: '#a855f7',
    summary: 'Garantizar que sistemas autónomos altamente competentes persigan metas consistentes con la ética y el bienestar humano.',
    content: 'El problema de la alineación estudia cómo especificar funciones de recompensa y límites ontológicos que impidan que una IA optimice un objetivo a costa de efectos colaterales dañinos para la humanidad, incorporando RLHF, Constitutional AI y verificación formal de software.',
  },
];

export default function EthicsSection() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('bias');

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  return (
    <section id="etica" className="py-24 relative border-t border-gray-900 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-[#161b22] text-xs font-mono text-purple-400 mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>MÓDULO 11 • RESPONSABILIDAD & GOBERNANZA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ética y el <span className="text-purple-400">Futuro</span> de la IA
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            La potencia computacional sin principios éticos es un riesgo sistémico: principios rectores para un desarrollo tecnológico transparente, justo, seguro y centrado en la dignidad humana.
          </p>
        </div>

        {/* Principles Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {ETHICS_TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                className={`glass-panel rounded-xl border transition-all overflow-hidden ${
                  isExpanded ? 'border-[#00f0ff]/50 bg-[#161b22]' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${topic.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: topic.color }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{topic.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{topic.summary}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-gray-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-800/80">
                    <p className="text-sm text-gray-300 leading-relaxed bg-[#0d1117] p-4 rounded-lg border border-gray-800">
                      {topic.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
