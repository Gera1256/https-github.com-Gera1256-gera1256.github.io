import { useState, useEffect } from 'react';
import { Terminal, Cpu, Play, Menu, X, Shield, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#ia', label: 'IA' },
  { href: '#ml', label: 'Machine Learning' },
  { href: '#datascience', label: 'Data Science' },
  { href: '#neural', label: 'Red Neuronal' },
  { href: '#genai', label: 'IA Generativa' },
  { href: '#playground', label: 'Playground', badge: 'PRO' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#security', label: 'Ciberseguridad' },
  { href: '#aplicaciones', label: 'Aplicaciones' },
  { href: '#herramientas', label: 'Stack' },
  { href: '#etica', label: 'Ética' },
  { href: '#terminal', label: 'Terminal' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detector
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-[#00f0ff]/20 py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.7)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          id="navbar-brand-logo"
          className="flex items-center gap-2.5 text-decoration-none group"
        >
          <div className="relative w-8 h-8 rounded border border-[#00f0ff] bg-[#00f0ff]/10 flex items-center justify-center group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
            <Cpu className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-sm tracking-widest font-bold text-white">
              NEXUS<span className="text-[#00f0ff]">.AI</span>
            </div>
            <div className="text-[10px] font-mono text-[#00ff88] tracking-tighter flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></span>
              SYS.ONLINE
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-mono">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] px-1 py-0.2 bg-[#00ff88]/20 text-[#00ff88] rounded border border-[#00ff88]/40">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 font-mono text-xs">
          <a
            href="#terminal"
            id="nav-btn-terminal"
            className="px-3 py-1.5 rounded border border-gray-700 bg-[#161b22] text-gray-300 hover:text-[#00ff88] hover:border-[#00ff88]/40 flex items-center gap-1.5 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
            CLI
          </a>
          <a
            href="#playground"
            id="nav-btn-playground"
            className="px-3.5 py-1.5 rounded bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black font-semibold hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            Playground
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded border border-gray-700 text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff]"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d1117]/95 border-b border-[#00f0ff]/30 backdrop-blur-xl px-4 py-4 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded bg-[#161b22] border border-gray-800 text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1 py-0.2 bg-[#00ff88]/20 text-[#00ff88] rounded">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center text-xs font-mono rounded border border-gray-700 text-gray-200 bg-[#161b22]"
            >
              Terminal CLI
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center text-xs font-mono font-bold rounded bg-[#00f0ff] text-black"
            >
              Playground
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
