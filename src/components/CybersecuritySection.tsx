import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Terminal, AlertTriangle, ArrowRight, Lock, Radio } from 'lucide-react';

interface ThreatEvent {
  id: string;
  ip: string;
  type: string;
  severity: 'BAJA' | 'MEDIA' | 'CRÍTICA';
  status: 'Detectado' | 'Mitigado' | 'Analizando';
  time: string;
}

export default function CybersecuritySection() {
  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const [events, setEvents] = useState<ThreatEvent[]>([
    { id: 'EV-901', ip: '194.26.29.112', type: 'DDoS SYN Flood Masivo', severity: 'CRÍTICA', status: 'Mitigado', time: '17:24:02' },
    { id: 'EV-902', ip: '185.220.101.5', type: 'Inyección SQL en /api/auth', severity: 'CRÍTICA', status: 'Mitigado', time: '17:24:19' },
    { id: 'EV-903', ip: '45.154.255.89', type: 'Escaneo Heurístico de Puertos', severity: 'MEDIA', status: 'Mitigado', time: '17:24:41' },
    { id: 'EV-904', ip: '103.145.13.2', type: 'Anomalía de Tráfico DNS Tunneling', severity: 'CRÍTICA', status: 'Detectado', time: '17:25:01' },
  ]);

  // Simulate active stream
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePipelineStep((prev) => (prev % 4) + 1);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleMitigate = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'Mitigado' } : e))
    );
  };

  return (
    <section id="security" className="py-24 relative border-t border-gray-900 bg-[#0d1117]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-[#161b22] text-xs font-mono text-rose-400 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>MÓDULO 08 • DEFROSTING THREATS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            IA y <span className="text-rose-400">Ciberseguridad</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Defensa cibernética autónoma: los algoritmos supervisados y los autoencoders detectan comportamientos anómalos, ataques zero-day y exfiltración de datos a velocidad de microsegundos.
          </p>
        </div>

        {/* Pipeline Architecture Banner: TRÁFICO DE RED → ANÁLISIS IA → DETECCIÓN → ALERTA */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 mb-12">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
            <span className="text-xs font-mono text-gray-400 uppercase">
              Pipeline de Detección Heurística Autónoma
            </span>
            <span className="text-xs font-mono text-[#00ff88] flex items-center gap-1.5">
              <Radio className="w-3 h-3 animate-ping" />
              IDS/IPS IA ACTIVO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className={`p-4 rounded-xl border transition-all ${
              activePipelineStep === 1
                ? 'border-[#00f0ff] bg-[#00f0ff]/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'border-gray-800 bg-[#161b22]'
            }`}>
              <div className="text-[10px] font-mono text-[#00f0ff] mb-1">01. INGESTIÓN</div>
              <h4 className="text-sm font-bold text-white mb-1">TRÁFICO DE RED</h4>
              <p className="text-xs text-gray-400">Inspección profunda de paquetes (DPI) y flujos NetFlow/IPFIX.</p>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-xl border transition-all ${
              activePipelineStep === 2
                ? 'border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                : 'border-gray-800 bg-[#161b22]'
            }`}>
              <div className="text-[10px] font-mono text-[#38bdf8] mb-1">02. MOTOR NEURONAL</div>
              <h4 className="text-sm font-bold text-white mb-1">ANÁLISIS IA</h4>
              <p className="text-xs text-gray-400">Autoencoders para anomalías y clasificadores Random Forest / GNN.</p>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-xl border transition-all ${
              activePipelineStep === 3
                ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'border-gray-800 bg-[#161b22]'
            }`}>
              <div className="text-[10px] font-mono text-amber-400 mb-1">03. CORRELACIÓN</div>
              <h4 className="text-sm font-bold text-white mb-1">DETECCIÓN</h4>
              <p className="text-xs text-gray-400">Identificación de vectores de ataque, IOCs y comportamiento zero-day.</p>
            </div>

            {/* Step 4 */}
            <div className={`p-4 rounded-xl border transition-all ${
              activePipelineStep === 4
                ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'border-gray-800 bg-[#161b22]'
            }`}>
              <div className="text-[10px] font-mono text-rose-400 mb-1">04. RESPUESTA</div>
              <h4 className="text-sm font-bold text-white mb-1">ALERTA & MITIGACIÓN</h4>
              <p className="text-xs text-gray-400">Aislamiento automático de IP perimetral y parcheo en caliente.</p>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-5 rounded-xl border border-gray-800">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Detección de Anomalías
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Modelos no supervisados reconocen desviaciones estadísticas microscópicas en volúmenes de petabytes sin necesidad de firmas conocidas previas.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-gray-800">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Clasificación de Malware
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Redes Convolucionales analizan la representación gráfica de binarios en memoria desarticulando variantes polimórficas antes de la ejecución.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-gray-800">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
              Análisis de Comportamiento (UEBA)
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Monitoreo del perfil de actividad de usuarios e identidades de servicio, detectando credenciales comprometidas y movimientos laterales.
            </p>
          </div>
        </div>

        {/* Real-time Threat Event Log Table */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              <h4 className="text-sm font-bold text-white font-mono">REGISTRO DE INCIDENTES EN TIEMPO REAL</h4>
            </div>
            <span className="text-xs font-mono text-gray-400">SOC Sensor Node: #SEC-MATRIX-01</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2.5 px-3">EVENTO</th>
                  <th className="py-2.5 px-3">DIRECCIÓN IP</th>
                  <th className="py-2.5 px-3">VECTOR DETECTADO</th>
                  <th className="py-2.5 px-3">SEVERIDAD</th>
                  <th className="py-2.5 px-3">ESTADO IA</th>
                  <th className="py-2.5 px-3 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-gray-300 font-bold">{ev.id}</td>
                    <td className="py-3 px-3 text-[#00f0ff]">{ev.ip}</td>
                    <td className="py-3 px-3 text-white">{ev.type}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.severity === 'CRÍTICA' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                      }`}>
                        {ev.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 ${
                        ev.status === 'Mitigado' ? 'text-[#00ff88]' : 'text-rose-400 animate-pulse font-bold'
                      }`}>
                        {ev.status === 'Mitigado' ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {ev.status !== 'Mitigado' && (
                        <button
                          onClick={() => handleMitigate(ev.id)}
                          className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500 text-rose-300 hover:bg-rose-500 hover:text-black font-mono text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Aislar IP & Mitigar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
