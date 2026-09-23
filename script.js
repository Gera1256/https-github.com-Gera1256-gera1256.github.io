/**
 * NEXUS.AI CORE - Pure Vanilla JavaScript Engine
 * Runs directly in any browser (file:// or http://) and GitHub Pages without any bundler or framework.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  initParticleCanvas();
  initNavigation();
  initHeroTelemetry();
  initMLSimulator();
  initDataScienceGaussian();
  initNeuralNetworkVisualizer();
  initGenAIStudio();
  initAIPlayground();
  initDashboardTelemetry();
  initCybersecuritySOC();
  initTechTools();
  initEthicsAccordion();
  initTerminalCLI();
  initScrollToTop();
});

/* ==========================================================================
   01. INTERACTIVE 2D MATRIX PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(80, Math.floor((width * height) / 18000));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#00f0ff' : '#00ff88',
      alpha: Math.random() * 0.4 + 0.1,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      // Connect near particles with faint cyber lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ==========================================================================
   02. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu when clicking any nav item
  document.querySelectorAll('#mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   03. HERO LIVE TELEMETRY COUNTERS
   ========================================================================= */
function initHeroTelemetry() {
  const modelsEl = document.getElementById('hero-models-count');
  const dataEl = document.getElementById('hero-data-count');
  const accEl = document.getElementById('hero-acc-count');
  const threatsEl = document.getElementById('hero-threats-count');

  if (!modelsEl || !dataEl || !accEl || !threatsEl) return;

  let models = 1482;
  let data = 2.418;
  let acc = 99.42;
  let threats = 8412;

  // Real-time micro-fluctuations
  setInterval(() => {
    threats += Math.floor(Math.random() * 3);
    data += 0.001;
    acc = 99.4 + Math.random() * 0.08;

    threatsEl.textContent = threats.toLocaleString();
    dataEl.textContent = data.toFixed(3) + ' PB';
    accEl.textContent = acc.toFixed(2) + '%';
  }, 2200);
}

/* ==========================================================================
   04. MACHINE LEARNING INTERACTIVE SIMULATOR & RL CYCLE
   ========================================================================== */
function initMLSimulator() {
  const datasetSlider = document.getElementById('ml-dataset-slider');
  const epochsSlider = document.getElementById('ml-epochs-slider');
  const lrSlider = document.getElementById('ml-lr-slider');
  const layersSlider = document.getElementById('ml-layers-slider');

  const datasetVal = document.getElementById('ml-dataset-val');
  const epochsVal = document.getElementById('ml-epochs-val');
  const lrVal = document.getElementById('ml-lr-val');
  const layersVal = document.getElementById('ml-layers-val');

  const accDisplay = document.getElementById('ml-acc-display');
  const lossDisplay = document.getElementById('ml-loss-display');
  const recallDisplay = document.getElementById('ml-recall-display');
  const f1Display = document.getElementById('ml-f1-display');

  const accBar = document.getElementById('ml-acc-bar');
  const lossBar = document.getElementById('ml-loss-bar');

  function updateMLMetrics() {
    if (!datasetSlider || !epochsSlider || !lrSlider || !layersSlider) return;

    const dataset = +datasetSlider.value;
    const epochs = +epochsSlider.value;
    const lr = +lrSlider.value;
    const layers = +layersSlider.value;

    if (datasetVal) datasetVal.textContent = dataset.toLocaleString() + ' muestras';
    if (epochsVal) epochsVal.textContent = epochs + ' épocas';
    if (lrVal) lrVal.textContent = (lr / 1000).toFixed(4);
    if (layersVal) layersVal.textContent = layers + ' capas';

    // Simulated mathematical convergence function
    const normalizedData = Math.min(dataset / 80000, 1);
    const normalizedEpochs = Math.min(epochs / 150, 1);
    const lrFactor = 1 - Math.abs(lr - 50) / 100;
    const layerFactor = 0.85 + (layers / 5) * 0.15;

    let accuracy = (72 + (normalizedData * 12 + normalizedEpochs * 10 + lrFactor * 4) * layerFactor);
    accuracy = Math.min(99.6, Math.max(68.0, accuracy));

    let loss = Math.max(0.025, (100 - accuracy) / 100 * 0.85);
    let recall = Math.min(99.4, accuracy - 0.4 + Math.random() * 0.3);
    let f1 = (2 * (accuracy * recall)) / (accuracy + recall);

    if (accDisplay) accDisplay.textContent = accuracy.toFixed(2) + '%';
    if (lossDisplay) lossDisplay.textContent = loss.toFixed(4);
    if (recallDisplay) recallDisplay.textContent = recall.toFixed(2) + '%';
    if (f1Display) f1Display.textContent = (f1 / 100).toFixed(3);

    if (accBar) accBar.style.width = accuracy + '%';
    if (lossBar) lossBar.style.width = Math.min(100, loss * 200) + '%';
  }

  [datasetSlider, epochsSlider, lrSlider, layersSlider].forEach((slider) => {
    if (slider) slider.addEventListener('input', updateMLMetrics);
  });
  updateMLMetrics();

  // Reinforcement Learning step cycle
  let rlStep = 0;
  let rlScore = 140;
  const rlStepBtn = document.getElementById('rl-step-btn');
  const rlScoreDisplay = document.getElementById('rl-score-display');
  const rlBoxes = [
    document.getElementById('rl-box-1'),
    document.getElementById('rl-box-2'),
    document.getElementById('rl-box-3'),
    document.getElementById('rl-box-4'),
  ];

  if (rlStepBtn) {
    rlStepBtn.addEventListener('click', () => {
      rlStep = (rlStep + 1) % 4;
      rlScore += Math.floor(Math.random() * 15) + 5;
      if (rlScoreDisplay) rlScoreDisplay.textContent = `+${rlScore} pts`;

      rlBoxes.forEach((box, idx) => {
        if (!box) return;
        if (idx === rlStep) {
          box.classList.add('border-[#00ff88]', 'bg-[#00ff88]/20', 'box-glow-green');
          box.classList.remove('border-gray-800', 'bg-[#161b22]');
        } else {
          box.classList.remove('border-[#00ff88]', 'bg-[#00ff88]/20', 'box-glow-green');
          box.classList.add('border-gray-800', 'bg-[#161b22]');
        }
      });
    });
  }
}

/* ==========================================================================
   05. DATA SCIENCE GAUSSIAN DISTRIBUTION VISUALIZER (SVG)
   ========================================================================== */
function initDataScienceGaussian() {
  const meanSlider = document.getElementById('ds-mean-slider');
  const stdSlider = document.getElementById('ds-std-slider');
  const meanVal = document.getElementById('ds-mean-val');
  const stdVal = document.getElementById('ds-std-val');
  const pathEl = document.getElementById('ds-curve-path');

  function updateGaussian() {
    if (!meanSlider || !stdSlider || !pathEl) return;
    const mean = +meanSlider.value;
    const std = +stdSlider.value;

    if (meanVal) meanVal.textContent = `μ = ${mean}`;
    if (stdVal) stdVal.textContent = `σ = ${std}`;

    const points = [];
    const width = 400;
    const height = 180;

    for (let x = 0; x <= width; x += 4) {
      const realX = (x - width / 2) / 40;
      const exponent = -0.5 * Math.pow((realX - mean) / std, 2);
      const yVal = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      const pixelY = height - 20 - yVal * 160;
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${pixelY}`);
    }

    pathEl.setAttribute('d', points.join(' '));
  }

  if (meanSlider) meanSlider.addEventListener('input', updateGaussian);
  if (stdSlider) stdSlider.addEventListener('input', updateGaussian);
  updateGaussian();
}

/* ==========================================================================
   06. NEURAL NETWORK CANVAS VISUALIZER
   ========================================================================== */
function initNeuralNetworkVisualizer() {
  const canvas = document.getElementById('nn-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const hiddenLayersSlider = document.getElementById('nn-hidden-layers');
  const neuronsSlider = document.getElementById('nn-neurons');
  const activationSelect = document.getElementById('nn-activation');

  let pulseTime = 0;

  function renderNN() {
    const parent = canvas.parentElement;
    const width = (canvas.width = parent ? parent.clientWidth : 600);
    const height = (canvas.height = 360);

    const hiddenCount = hiddenLayersSlider ? +hiddenLayersSlider.value : 2;
    const neuronsPerHidden = neuronsSlider ? +neuronsSlider.value : 5;

    // Topology: Input (3) -> Hidden 1..N -> Output (2)
    const layers = [3];
    for (let i = 0; i < hiddenCount; i++) {
      layers.push(neuronsPerHidden);
    }
    layers.push(2);

    ctx.clearRect(0, 0, width, height);

    // Calculate node coordinates
    const layerSpacing = width / (layers.length + 1);
    const nodes = [];

    layers.forEach((count, lIdx) => {
      const x = (lIdx + 1) * layerSpacing;
      const ySpacing = height / (count + 1);
      const layerNodes = [];
      for (let nIdx = 0; nIdx < count; nIdx++) {
        layerNodes.push({
          x,
          y: (nIdx + 1) * ySpacing,
          layerIdx: lIdx,
          nodeIdx: nIdx,
        });
      }
      nodes.push(layerNodes);
    });

    // Draw Synaptic Connections
    for (let l = 0; l < nodes.length - 1; l++) {
      const currentLayer = nodes[l];
      const nextLayer = nodes[l + 1];

      currentLayer.forEach((n1) => {
        nextLayer.forEach((n2) => {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Animated Forward-Pass Signal Pulse
          const pulseProgress = (pulseTime + l * 0.25) % 1;
          const px = n1.x + (n2.x - n1.x) * pulseProgress;
          const py = n1.y + (n2.y - n1.y) * pulseProgress;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#00ff88';
          ctx.fill();
        });
      });
    }

    // Draw Neurons
    nodes.forEach((layerNodes, lIdx) => {
      layerNodes.forEach((node) => {
        const isInput = lIdx === 0;
        const isOutput = lIdx === nodes.length - 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = isInput ? '#00f0ff' : isOutput ? '#ff007f' : '#38bdf8';
        ctx.shadowColor = isInput ? '#00f0ff' : isOutput ? '#ff007f' : '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    });

    pulseTime += 0.012;
    requestAnimationFrame(renderNN);
  }

  requestAnimationFrame(renderNN);
}

/* ==========================================================================
   07. GENERATIVE AI STUDIO (STREAMING LLM & DIFFUSION DE-NOISING)
   ========================================================================== */
function initGenAIStudio() {
  const PRESETS = [
    {
      label: 'Explicar Redes Neuronales',
      prompt: 'Explica qué es una red neuronal como si fuera un cerebro mágico hecho de luciérnagas conectadas.',
      response: 'Imagina un bosque en calma donde miles de luciérnagas se comunican con destellos sincronizados. Cuando una luciérnaga distingue un rasgo (el contorno de una oreja o una palabra clave), se enciende y transmite la señal a sus compañeras. Al final del sendero, la luciérnaga central compila la luz global y proclama: "¡Es un gato!". Así aprende una red neuronal.',
    },
    {
      label: 'Optimizar Algoritmo en Python',
      prompt: 'Escribe una función en Python para calcular números primos en tiempo O(N log log N) con Criba de Eratóstenes.',
      response: `def criba_eratostenes(limite: int) -> list[int]:
    """Genera números primos hasta 'limite' de forma óptima."""
    es_primo = [True] * (limite + 1)
    es_primo[0] = es_primo[1] = False
    
    for p in range(2, int(limite**0.5) + 1):
        if es_primo[p]:
            for multiplo in range(p * p, limite + 1, p):
                es_primo[multiplo] = False
                
    return [i for i, primo in enumerate(es_primo) if primo]

# Inferencia completada con éxito en 0.002s`,
    },
    {
      label: 'Prompt de Arquitectura Cyberpunk',
      prompt: 'Genera un prompt detallado para sintetizar una metrópoli cyberpunk en Unreal Engine 5.',
      response: 'Hyperrealistic cinematic wide shot of Neo-Tokyo 2099, dense volumetric neon rain reflecting cyan and magenta light on wet asphalt, holographic skyscraper ads, autonomous flying delivery drones, octane render 8k, ray tracing global illumination, anamorphic lens flare.',
    },
  ];

  let activeIndex = 0;
  let isGenerating = false;
  let streamInterval = null;

  const promptTextEl = document.getElementById('genai-prompt-text');
  const outputBoxEl = document.getElementById('genai-output-box');
  const statusBadge = document.getElementById('genai-status-badge');
  const presetBtns = document.querySelectorAll('.genai-preset-btn');

  function runStreaming(idx) {
    if (isGenerating) clearInterval(streamInterval);
    activeIndex = idx;
    isGenerating = true;

    presetBtns.forEach((btn, i) => {
      if (i === idx) {
        btn.classList.add('bg-[#00f0ff]', 'text-black', 'font-bold');
        btn.classList.remove('bg-[#0d1117]', 'text-gray-300');
      } else {
        btn.classList.remove('bg-[#00f0ff]', 'text-black', 'font-bold');
        btn.classList.add('bg-[#0d1117]', 'text-gray-300');
      }
    });

    const targetPrompt = PRESETS[idx].prompt;
    const targetResponse = PRESETS[idx].response;

    if (promptTextEl) promptTextEl.textContent = targetPrompt;
    if (outputBoxEl) outputBoxEl.textContent = '';
    if (statusBadge) {
      statusBadge.textContent = 'Generando tokens...';
      statusBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 animate-pulse';
    }

    let charIdx = 0;
    streamInterval = setInterval(() => {
      if (charIdx < targetResponse.length) {
        charIdx += Math.floor(Math.random() * 4) + 2;
        if (outputBoxEl) outputBoxEl.textContent = targetResponse.slice(0, charIdx);
      } else {
        clearInterval(streamInterval);
        isGenerating = false;
        if (statusBadge) {
          statusBadge.textContent = 'Inferencia completa';
          statusBadge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30';
        }
      }
    }, 25);
  }

  presetBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => runStreaming(idx));
  });
  runStreaming(0);

  // Diffusion Noise to Image Canvas
  const diffCanvas = document.getElementById('diffusion-canvas');
  const diffResetBtn = document.getElementById('diffusion-reset-btn');
  const diffStepLabel = document.getElementById('diffusion-step-label');

  function runDiffusion() {
    if (!diffCanvas) return;
    const ctx = diffCanvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      step++;
      const noisePct = Math.round(((totalSteps - step) / totalSteps) * 100);
      if (diffStepLabel) diffStepLabel.textContent = `Ruido: ${noisePct}% (Paso ${step}/${totalSteps})`;

      const w = (diffCanvas.width = 240);
      const h = (diffCanvas.height = 240);
      const imgData = ctx.createImageData(w, h);
      const d = imgData.data;
      const clarity = step / totalSteps;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const cyberX = Math.sin(x / 14) * Math.cos(y / 14);
          const targetR = Math.floor((Math.sin(x / 18) + 1) * 30);
          const targetG = Math.floor((cyberX + 1) * 120 + 20);
          const targetB = Math.floor((Math.cos(y / 18) + 1) * 120 + 40);

          const noiseR = Math.random() * 255;
          const noiseG = Math.random() * 255;
          const noiseB = Math.random() * 255;

          d[i] = noiseR * (1 - clarity) + targetR * clarity;
          d[i + 1] = noiseG * (1 - clarity) + targetG * clarity;
          d[i + 2] = noiseB * (1 - clarity) + targetB * clarity;
          d[i + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      if (step >= totalSteps) {
        clearInterval(interval);
        if (diffStepLabel) diffStepLabel.textContent = 'Síntesis Latente Completada';
      }
    }, 60);
  }

  if (diffResetBtn) diffResetBtn.addEventListener('click', runDiffusion);
  runDiffusion();
}

/* ==========================================================================
   08. AI PLAYGROUND (KNN CLASSIFICATION, K-MEANS, POLYNOMIAL REGRESSION)
   ========================================================================== */
function initAIPlayground() {
  const canvas = document.getElementById('playground-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let currentMode = 'classification'; // 'classification' | 'clustering' | 'regression'
  const modeBtns = document.querySelectorAll('.playground-mode-btn');

  // Classification State
  let knnK = 3;
  let selectedClass = 0; // 0: Cyan, 1: Pink
  let points = [
    { x: 120, y: 100, label: 0 },
    { x: 140, y: 130, label: 0 },
    { x: 90, y: 160, label: 0 },
    { x: 170, y: 110, label: 0 },
    { x: 320, y: 240, label: 1 },
    { x: 350, y: 220, label: 1 },
    { x: 300, y: 260, label: 1 },
    { x: 380, y: 230, label: 1 },
  ];

  // Clustering State
  let kClusters = 3;
  let clusterStep = 0;

  // Regression State
  let polyDegree = 2;
  let noiseLevel = 15;

  const knnSlider = document.getElementById('pg-knn-slider');
  const knnVal = document.getElementById('pg-knn-val');
  const resetPtsBtn = document.getElementById('pg-reset-pts');
  const classABtn = document.getElementById('pg-class-a');
  const classBBtn = document.getElementById('pg-class-b');

  const kmeansSlider = document.getElementById('pg-kmeans-slider');
  const kmeansVal = document.getElementById('pg-kmeans-val');
  const kmeansStepBtn = document.getElementById('pg-kmeans-step');

  const polySlider = document.getElementById('pg-poly-slider');
  const polyVal = document.getElementById('pg-poly-val');
  const noiseSlider = document.getElementById('pg-noise-slider');
  const noiseVal = document.getElementById('pg-noise-val');

  const controlsClassification = document.getElementById('pg-controls-classification');
  const controlsClustering = document.getElementById('pg-controls-clustering');
  const controlsRegression = document.getElementById('pg-controls-regression');

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentMode = btn.dataset.mode;
      modeBtns.forEach((b) => {
        b.classList.remove('bg-[#00f0ff]', 'text-black', 'font-bold');
        b.classList.add('text-gray-400');
      });
      btn.classList.add('bg-[#00f0ff]', 'text-black', 'font-bold');
      btn.classList.remove('text-gray-400');

      if (controlsClassification) controlsClassification.classList.toggle('hidden', currentMode !== 'classification');
      if (controlsClustering) controlsClustering.classList.toggle('hidden', currentMode !== 'clustering');
      if (controlsRegression) controlsRegression.classList.toggle('hidden', currentMode !== 'regression');

      renderPlayground();
    });
  });

  if (knnSlider) {
    knnSlider.addEventListener('input', (e) => {
      knnK = +e.target.value;
      if (knnVal) knnVal.textContent = `K = ${knnK}`;
      renderPlayground();
    });
  }

  if (classABtn && classBBtn) {
    classABtn.addEventListener('click', () => {
      selectedClass = 0;
      classABtn.className = 'flex-1 py-2 rounded text-xs font-mono font-bold border transition-all bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]';
      classBBtn.className = 'flex-1 py-2 rounded text-xs font-mono font-bold border transition-all bg-[#161b22] border-gray-800 text-gray-400';
    });
    classBBtn.addEventListener('click', () => {
      selectedClass = 1;
      classBBtn.className = 'flex-1 py-2 rounded text-xs font-mono font-bold border transition-all bg-rose-500/20 border-rose-500 text-rose-400';
      classABtn.className = 'flex-1 py-2 rounded text-xs font-mono font-bold border transition-all bg-[#161b22] border-gray-800 text-gray-400';
    });
  }

  if (resetPtsBtn) {
    resetPtsBtn.addEventListener('click', () => {
      points = [
        { x: 100 + Math.random() * 80, y: 80 + Math.random() * 80, label: 0 },
        { x: 110 + Math.random() * 80, y: 90 + Math.random() * 80, label: 0 },
        { x: 120 + Math.random() * 80, y: 140 + Math.random() * 80, label: 0 },
        { x: 280 + Math.random() * 80, y: 220 + Math.random() * 80, label: 1 },
        { x: 310 + Math.random() * 80, y: 200 + Math.random() * 80, label: 1 },
        { x: 330 + Math.random() * 80, y: 250 + Math.random() * 80, label: 1 },
      ];
      renderPlayground();
    });
  }

  canvas.addEventListener('click', (e) => {
    if (currentMode !== 'classification') return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    points.push({ x, y, label: selectedClass });
    renderPlayground();
  });

  if (kmeansSlider) {
    kmeansSlider.addEventListener('input', (e) => {
      kClusters = +e.target.value;
      if (kmeansVal) kmeansVal.textContent = `K = ${kClusters}`;
      renderPlayground();
    });
  }
  if (kmeansStepBtn) {
    kmeansStepBtn.addEventListener('click', () => {
      clusterStep++;
      renderPlayground();
    });
  }

  if (polySlider) {
    polySlider.addEventListener('input', (e) => {
      polyDegree = +e.target.value;
      if (polyVal) polyVal.textContent = `Grado ${polyDegree}`;
      renderPlayground();
    });
  }
  if (noiseSlider) {
    noiseSlider.addEventListener('input', (e) => {
      noiseLevel = +e.target.value;
      if (noiseVal) noiseVal.textContent = `${noiseLevel}`;
      renderPlayground();
    });
  }

  function renderPlayground() {
    const parent = canvas.parentElement;
    const width = (canvas.width = parent ? parent.clientWidth : 500);
    const height = (canvas.height = 360);

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (currentMode === 'classification') {
      // 2D Decision Field
      const res = 16;
      for (let px = 0; px < width; px += res) {
        for (let py = 0; py < height; py += res) {
          const dists = points.map((p) => ({
            d: (p.x - px) ** 2 + (p.y - py) ** 2,
            label: p.label,
          }));
          dists.sort((a, b) => a.d - b.d);
          const topK = dists.slice(0, Math.min(knnK, dists.length));
          const count0 = topK.filter((t) => t.label === 0).length;
          const count1 = topK.length - count0;

          ctx.fillStyle = count0 > count1 ? 'rgba(0, 240, 255, 0.06)' : 'rgba(255, 0, 85, 0.06)';
          ctx.fillRect(px, py, res, res);
        }
      }

      // Draw points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = p.label === 0 ? '#00f0ff' : '#ff0055';
        ctx.shadowColor = p.label === 0 ? '#00f0ff' : '#ff0055';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    } else if (currentMode === 'clustering') {
      const colors = ['#00f0ff', '#00ff88', '#ff0055', '#eab308', '#a855f7'];
      for (let k = 0; k < kClusters; k++) {
        const cx = 80 + (k * (width - 160)) / (kClusters - 1 || 1);
        const cy = 160 + Math.sin(k * 2 + clusterStep * 0.6) * 60;
        const color = colors[k % colors.length];

        for (let i = 0; i < 14; i++) {
          const angle = (i / 14) * Math.PI * 2;
          const rad = 25 + Math.cos(i * 3) * 18;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad, 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`C${k + 1}`, cx, cy);
      }
    } else if (currentMode === 'regression') {
      const pts = [];
      for (let i = 0; i < 35; i++) {
        const x = (i / 35) * (width - 80) + 40;
        const normX = (x - 40) / (width - 80);
        let yBase = 220 - normX * 120;
        if (polyDegree >= 2) yBase += Math.sin(normX * Math.PI * 2) * 50;
        if (polyDegree >= 3) yBase += Math.cos(normX * Math.PI * 3) * 20;

        const jitter = Math.sin(i * 99) * noiseLevel;
        pts.push({ x, y: yBase + jitter });
      }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      });

      ctx.beginPath();
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 8;
      for (let x = 40; x <= width - 40; x += 3) {
        const normX = (x - 40) / (width - 80);
        let y = 220 - normX * 120;
        if (polyDegree >= 2) y += Math.sin(normX * Math.PI * 2) * 50;
        if (polyDegree >= 3) y += Math.cos(normX * Math.PI * 3) * 20;
        if (x === 40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  renderPlayground();
}

/* ==========================================================================
   09. DATA SCIENCE TELEMETRY DASHBOARD
   ========================================================================== */
function initDashboardTelemetry() {
  let isLive = true;
  const toggleBtn = document.getElementById('dash-stream-toggle');
  const pathEl = document.getElementById('dash-loss-path');
  const curLossEl = document.getElementById('dash-current-loss');
  const circleEl = document.getElementById('dash-loss-circle');

  let points = [0.45, 0.38, 0.32, 0.28, 0.22, 0.19, 0.16, 0.14, 0.12, 0.11, 0.09, 0.08];

  function updateLossChart() {
    if (!pathEl) return;
    const path = points
      .map((val, i) => {
        const x = 20 + (i / (points.length - 1)) * 360;
        const y = 160 - (val / 0.5) * 130;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    pathEl.setAttribute('d', path);

    const lastVal = points[points.length - 1];
    if (curLossEl) curLossEl.textContent = `Loss Actual: ${lastVal}`;
    if (circleEl) {
      circleEl.setAttribute('cx', '380');
      circleEl.setAttribute('cy', (160 - (lastVal / 0.5) * 130).toString());
    }
  }

  setInterval(() => {
    if (!isLive) return;
    const last = points[points.length - 1];
    const nextVal = Math.max(0.04, Math.min(0.25, last + (Math.random() - 0.52) * 0.02));
    points = [...points.slice(1), +nextVal.toFixed(3)];
    updateLossChart();
  }, 2000);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isLive = !isLive;
      toggleBtn.innerHTML = isLive
        ? '<span class="w-2 h-2 rounded-full bg-[#00ff88] animate-ping inline-block mr-1"></span> Pausar Stream'
        : 'Reanudar Stream';
    });
  }

  updateLossChart();
}

/* ==========================================================================
   10. CYBERSECURITY SOC & THREAT MITIGATION
   ========================================================================== */
function initCybersecuritySOC() {
  const mitigateBtns = document.querySelectorAll('.threat-mitigate-btn');

  mitigateBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      if (!row) return;
      const statusCell = row.querySelector('.threat-status-cell');
      if (statusCell) {
        statusCell.innerHTML = '<span class="text-[#00ff88] flex items-center gap-1">● Mitigado</span>';
      }
      btn.remove();
    });
  });
}

/* ==========================================================================
   11. TECH TOOLS STACK & CLIPBOARD COPY
   ========================================================================== */
function initTechTools() {
  const catBtns = document.querySelectorAll('.tech-cat-btn');
  const cards = document.querySelectorAll('.tech-card');
  const copyBtns = document.querySelectorAll('.copy-snippet-btn');

  catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      catBtns.forEach((b) => {
        b.classList.remove('bg-[#00ff88]', 'text-black', 'font-bold');
        b.classList.add('bg-[#161b22]', 'text-gray-400');
      });
      btn.classList.add('bg-[#00ff88]', 'text-black', 'font-bold');
      btn.classList.remove('bg-[#161b22]', 'text-gray-400');

      cards.forEach((card) => {
        if (cat === 'Todos' || card.dataset.category === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.tech-code-box')?.querySelector('pre');
      if (pre) {
        navigator.clipboard.writeText(pre.textContent || '');
        const origText = btn.textContent;
        btn.textContent = '✓ Copiado';
        btn.classList.add('text-[#00ff88]');
        setTimeout(() => {
          btn.textContent = origText;
          btn.classList.remove('text-[#00ff88]');
        }, 1800);
      }
    });
  });
}

/* ==========================================================================
   12. ETHICS & GOVERNANCE ACCORDION
   ========================================================================== */
function initEthicsAccordion() {
  const items = document.querySelectorAll('.ethics-accordion-item');

  items.forEach((item) => {
    const btn = item.querySelector('.ethics-toggle-btn');
    const content = item.querySelector('.ethics-content');
    const chevron = item.querySelector('.ethics-chevron');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isHidden = content.classList.contains('hidden');
        // Close others
        items.forEach((other) => {
          other.querySelector('.ethics-content')?.classList.add('hidden');
          other.querySelector('.ethics-chevron')?.classList.remove('rotate-180');
        });

        if (isHidden) {
          content.classList.remove('hidden');
          if (chevron) chevron.classList.add('rotate-180');
        }
      });
    }
  });
}

/* ==========================================================================
   13. CYBERPUNK CLI TERMINAL
   ========================================================================== */
function initTerminalCLI() {
  const inputEl = document.getElementById('terminal-input');
  const sendBtn = document.getElementById('terminal-send');
  const bodyEl = document.getElementById('terminal-body');
  const quickBtns = document.querySelectorAll('.terminal-quick-cmd');

  const COMMAND_RESPONSES = {
    help: `COMANDOS DISPONIBLES EN NEXUS CORE CLI:
• help           : Despliega este menú de ayuda técnica
• ai.status      : Estado operacional de los motores de inferencia
• ml.models      : Lista de arquitecturas neuronales montadas en memoria
• data.analyze   : Ejecuta un pipeline sintético de análisis exploratorio
• neural.network : Diagnóstico de topología y pesos sinápticos
• security.scan  : Auditoría heurística de vectores de ataque perimetral
• system.info    : Especificaciones de hardware tensorial y versión de kernel
• matrix         : Activa la secuencia de código cuántico en cascada
• clear          : Limpia el historial de la terminal`,

    'ai.status': `[AI CORE INFERENCE ENGINE]
● Status: ONLINE (100% Operational)
● Neural Clusters: 32 Tensor Cores activos
● Active Context Window: 1,000,000 tokens
● Average Latency: 4.8ms
● Memory Consumption: 24.6 GB / 64 GB HBM3
● Safety Filter: Level 4 (Strict Alignment)`,

    'ml.models': `[MODELOS CARGADOS EN MEMORIA VRAM]
1. nexus-transformer-v4 (LLM, 70B params) -> F1: 0.994 [ACTIVO]
2. vision-segment-vit (ViT, 300M params) -> mIoU: 0.891 [ACTIVO]
3. audio-diff-speech (Diffusion, 120M) -> MOS: 4.85 [STANDBY]
4. tabular-gbm-v2 (Gradient Boost) -> AUC: 0.978 [ACTIVO]`,

    'data.analyze': `[INICIANDO PIPELINE DE CIENCIA DE DATOS]
[01] Ingesta de 500,000 registros vectoriales ... OK
[02] Imputación de valores nulos (KNN, k=5) ... 0.04% reparado
[03] Detección de outliers (Isolation Forest) ... 12 aislados
[04] Varianza explicada por componentes PCA (k=3) ... 94.6%
[05] Conclusión: Dataset balanceado, apto para entrenamiento.`,

    'neural.network': `[TOPOLOGÍA NEURONAL ACTIVA]
Capas: Entrada (x3) -> Oculta_1 (Dense_64, ReLU) -> Oculta_2 (Dense_32, Tanh) -> Salida (Softmax_2)
Optimizador: AdamW (lr=0.001, beta1=0.9, beta2=0.999)
Función de Coste: Categorical Cross-Entropy (Loss: 0.0418)
Gradientes: Sin desvanecimiento ni explosión detectados.`,

    'security.scan': `[ESCÁNER HEURÍSTICO DE CIBERSEGURIDAD SOC]
Analizando 48,920 paquetes de red entrantes...
[✓] Firma DDoS SYN Flood: 0 detectados
[✓] Escaneo de Puertos Nmap: Mitigado en IP 185.220.101.5
[✓] Inyección SQL en cabeceras HTTP: Bloqueada
[✓] Estado del Firewall Neuronal: 100% INTEGRIDAD GARANTIZADA`,

    'system.info': `[NEXUS ARCHITECTURE SPECIFICATIONS]
OS: Nexus Linux MicroKernel v6.12-rt
Arch: Tensor Architecture SIMD-X 512-bit
Node: cluster-matrix-alpha-09
Host: ais-standalone-environment.local
Uptime: 99.998% (342 días sin reinicio)
Build: Standalone Pure HTML5/CSS3/VanillaJS Edition`,

    matrix: `01001001 01000001 00100000 01010011 01001001 01010011 01010100 01000101 01001101 01000001
>>> NEXUS NEURAL MATRIX LINK ESTABLISHED <<<
"The question is not whether machines think, but whether humans do."
-- Alan Turing, 1950`,
  };

  function execute(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd || !bodyEl) return;

    if (cmd === 'clear') {
      bodyEl.innerHTML = '';
      if (inputEl) inputEl.value = '';
      return;
    }

    const res =
      COMMAND_RESPONSES[cmd] ||
      `Comando no reconocido: "${cmd}". Escribe "help" para ver los comandos válidos.`;

    const entry = document.createElement('div');
    entry.className = 'space-y-1';
    entry.innerHTML = `
      <div class="flex items-center gap-2 text-gray-400">
        <span class="text-[#00ff88] font-bold">nexus@ai-core:~$</span>
        <span class="text-white">${rawCmd}</span>
      </div>
      <div class="whitespace-pre-wrap leading-relaxed ${COMMAND_RESPONSES[cmd] ? 'text-emerald-400' : 'text-rose-400'}">${res}</div>
    `;

    bodyEl.appendChild(entry);
    bodyEl.scrollTop = bodyEl.scrollHeight;

    if (inputEl) inputEl.value = '';
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') execute(inputEl.value);
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (inputEl) execute(inputEl.value);
    });
  }

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd || btn.textContent.trim();
      execute(cmd);
    });
  });
}

/* ==========================================================================
   14. SCROLL TO TOP
   ========================================================================== */
function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
