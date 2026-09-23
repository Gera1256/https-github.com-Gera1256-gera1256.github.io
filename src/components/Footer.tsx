import { ArrowUp, Github, Linkedin, Twitter, Globe, Shield, Terminal, Download, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-900 bg-[#090d14] text-gray-400 font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Platform Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono text-lg font-bold text-white tracking-wider">
                NEXUS<span className="text-[#00f0ff]">.AI</span> CORE
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Plataforma educativa, profesional y moderna dedicada a la difusión técnica y visual de la Inteligencia Artificial, Machine Learning y Ciencia de Datos con estética Cyberpunk Matrix.
            </p>
            <div className="text-xs font-mono text-gray-500">
              Desarrollado para entornos de exploración técnica y aprendizaje interactivo de alto rendimiento.
            </div>
          </div>

          {/* Col 3: Secciones de la Plataforma */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Módulos Teóricos
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#ia" className="hover:text-[#00f0ff] transition-colors">Fundamentos de IA</a>
              </li>
              <li>
                <a href="#ml" className="hover:text-[#00ff88] transition-colors">Machine Learning</a>
              </li>
              <li>
                <a href="#datascience" className="hover:text-[#38bdf8] transition-colors">Ciencia de Datos</a>
              </li>
              <li>
                <a href="#neural" className="hover:text-[#00f0ff] transition-colors">Redes Neuronales</a>
              </li>
              <li>
                <a href="#genai" className="hover:text-pink-400 transition-colors">IA Generativa</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Laboratorios & Simulación */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Laboratorios
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#playground" className="hover:text-[#00f0ff] transition-colors">AI Playground 2D</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-[#00ff88] transition-colors">Data Science Dashboard</a>
              </li>
              <li>
                <a href="#security" className="hover:text-rose-400 transition-colors">Defensa Cibernética</a>
              </li>
              <li>
                <a href="#terminal" className="hover:text-[#00ff88] transition-colors">Terminal CLI Bash</a>
              </li>
              <li>
                <a href="#etica" className="hover:text-purple-400 transition-colors">Ética & Gobernanza</a>
              </li>
            </ul>
          </div>

          {/* Col 5: Stack & Especificaciones */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Tecnologías
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              {['HTML5', 'CSS3 Modern', 'JavaScript ES6+', 'React 19', 'Canvas 2D', 'SVG Graphics', 'Tailwind CSS'].map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded bg-[#161b22] border border-gray-800 text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800/80">
              <span className="text-[10px] font-mono text-[#00ff88] block">
                ● Inferencia 100% en cliente
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Sin dependencias de APIs privadas
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-gray-500 text-center sm:text-left">
            <span>© 2026 Nexus AI Platform • Arquitectura y Diseño Frontend Senior.</span>
            <span className="block text-[11px] text-gray-600 mt-0.5">
              Aviso: Proyecto con fines educativos, científicos y de divulgación técnica.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg border border-gray-800 bg-[#161b22] hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver Arriba</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
