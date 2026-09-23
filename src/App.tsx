/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import AISection from './components/AISection';
import MLSection from './components/MLSection';
import DataScienceSection from './components/DataScienceSection';
import NeuralNetVisualizer from './components/NeuralNetVisualizer';
import GenAISection from './components/GenAISection';
import PlaygroundSection from './components/PlaygroundSection';
import DashboardSection from './components/DashboardSection';
import CybersecuritySection from './components/CybersecuritySection';
import ApplicationsSection from './components/ApplicationsSection';
import TechToolsSection from './components/TechToolsSection';
import EthicsSection from './components/EthicsSection';
import TerminalCLI from './components/TerminalCLI';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 relative selection:bg-[#00f0ff] selection:text-black">
      {/* Interactive 2D Matrix Particle Canvas */}
      <ParticleBackground />

      {/* Fixed Cyberpunk Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <AISection />
        <MLSection />
        <DataScienceSection />
        <NeuralNetVisualizer />
        <GenAISection />
        <PlaygroundSection />
        <DashboardSection />
        <CybersecuritySection />
        <ApplicationsSection />
        <TechToolsSection />
        <EthicsSection />
        <TerminalCLI />
      </main>

      {/* Platform Footer */}
      <Footer />
    </div>
  );
}

