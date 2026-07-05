import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowRight, Compass, Eye, ShieldCheck, RefreshCw, Crown, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { DESTINATION_SPOTLIGHTS, ACCOMMODATIONS } from '../data/mockData';
import { PageId } from '../types';

interface ScratchRevealExperienceProps {
  guestName: string;
  hieroglyphs: string;
  onNavigateHub: (pageId?: PageId) => void;
  onCompleteSequence: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const ScratchRevealExperience: React.FC<ScratchRevealExperienceProps> = ({
  guestName,
  hieroglyphs,
  onNavigateHub,
  onCompleteSequence,
}) => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [clearedPercent, setClearedPercent] = useState<number>(0);
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const scratchCountRef = useRef<number>(0);

  // Define the 4 sequential stages combining high-jewelry lore with VIP stay logistics
  const stages = [
    {
      id: 'cairo',
      stageNum: 1,
      title: 'Cairo',
      arabicName: 'القاهرة',
      subtitle: 'The St. Regis Cairo & Giza Pyramids',
      emblemSymbol: '𓇳 𓉴 𓁹',
      emblemName: 'Royal Capital of Pharaohs',
      stayDetails: '3 Days / 3 Nights • The St. Regis Cairo (Grand Nile Suite)',
      imageUrl: ACCOMMODATIONS[0].imageUrl || DESTINATION_SPOTLIGHTS[0].imageUrl,
      description: 'We begin our journey in unmatched metropolitan luxury. Towering above the banks of the River Nile, The St. Regis Cairo represents the pinnacle of contemporary Egyptian elegance. Experience private access to the Giza Plateau away from the crowds and explore the Grand Egyptian Museum.',
      highlights: [
        'Special private access to the Giza Plateau & Sphinx away from crowds',
        'Exclusive guided exploration of the Grand Egyptian Museum (GEM)',
        '24-Hour St. Regis Butler Service with panoramic River Nile views',
        'Gourmet dining at 9 Pyramids Lounge & Naguib Mahfouz Cafe',
      ],
      nextLabel: 'Journey Deeper: Next Destination (Luxor)',
    },
    {
      id: 'luxor',
      stageNum: 2,
      title: 'Luxor & West Bank',
      arabicName: 'الأقصر',
      subtitle: 'Hotel Al Moudira & Valley of the Kings',
      emblemSymbol: '𓆣 𓉶 𓋹',
      emblemName: 'Open-Air Museum of Ancient Thebes',
      stayDetails: '2 Days / 2 Nights • Hotel Al Moudira Luxor (Arabian Palace Suite)',
      imageUrl: ACCOMMODATIONS[1].imageUrl || DESTINATION_SPOTLIGHTS[1].imageUrl,
      description: 'Situated on the peaceful West Bank near the Valley of the Kings, Al Moudira is an authentic architectural masterpiece. Built with traditional domes, antique mashrabiya lattice woodwork, and reclaimed marble fountains, this intimate boutique sanctuary feels like stepping into the Arabian Nights.',
      highlights: [
        'Sunrise private hot air balloon flight over the Valley of the Kings',
        'Special photography permit descent into Tutankhamun & Seti I tombs',
        'Sunset private twilight tour through Luxor Temple & Karnak columns',
        'Secluded 30-room Arabian palace sanctuary with heated mosaic pool',
      ],
      nextLabel: 'Journey Deeper: Boarding Dahabiya Yacht',
    },
    {
      id: 'dahabiya',
      stageNum: 3,
      title: 'Nile Sailing Yacht',
      arabicName: 'الذهبية',
      subtitle: 'Exclusively Chartered Dahabiya Al Mourad',
      emblemSymbol: '𓊞 𓇳 𓈖',
      emblemName: 'Silent Wind-Powered Nile Voyage',
      stayDetails: '3 Days / 3 Nights • Dahabiya Al Mourad (Exclusively Chartered)',
      imageUrl: ACCOMMODATIONS[2].imageUrl || DESTINATION_SPOTLIGHTS[2].imageUrl,
      description: 'Our floating home between Luxor and Aswan is the Dahabiya Al Mourad—a handcrafted wooden sailing yacht reserved exclusively for our group of 10 invitees. With twin lateen sails gliding silently along the river, enjoy intimate access to hidden islands and private sandbars.',
      highlights: [
        'Reserved exclusively for our private party of 10 invited guests',
        'Silent twin lateen sail navigation without disturbing generator engine noise',
        'Island BBQ beach dinner on a secluded Nile sandbank with Nubian drummers',
        'Private dockings at Gebel el-Silsila quarries and Edfu Temple of Horus',
      ],
      nextLabel: 'Journey Deeper: Final Jewel (Aswan)',
    },
    {
      id: 'aswan',
      stageNum: 4,
      title: 'Aswan & Cataracts',
      arabicName: 'أسوان',
      subtitle: 'Sofitel Legend Old Cataract & Abu Simbel',
      emblemSymbol: '𓆸 𓇯 𓋹',
      emblemName: 'Nubian Splendor & Granite Cataracts',
      stayDetails: '2 Days / 2 Nights • Sofitel Legend Old Cataract (Palace Wing)',
      imageUrl: ACCOMMODATIONS[3].imageUrl || DESTINATION_SPOTLIGHTS[3].imageUrl,
      description: 'Built in 1899 on pink granite cliffs overlooking Elephantine Island, the Old Cataract is one of the world’s most legendary heritage hotels. Here, Winston Churchill and Princess Diana stayed, and Agatha Christie wrote Death on the Nile. Experience Victorian elegance fused with Moorish architecture.',
      highlights: [
        'Private morning flight & excursion to the 66-foot Colossi of Abu Simbel',
        'Stay in the historic 19th-century Victorian Palace Wing suites',
        'High tea on the royal terrace overlooking Elephantine Island & feluccas',
        'Josh Earl’s VIP Farewell Gala Dinner overlooking illuminated cataracts',
      ],
      nextLabel: 'Enter Expedition Hub: Explore All Guides',
    },
  ];

  const currentStageData = stages[currentStage];

  // Initialize sand canvas
  const initSandCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Fill with persistent sand background (#E8DCC8)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#E8DCC8';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw textured sand grains & speckles for authentic desert feel
    const colors = ['#D8CCB8', '#F5ECE0', '#C4AC7C', '#B8912F', '#9C8454'];
    for (let i = 0; i < 1800; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const radius = Math.random() * 1.5 + 0.5;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw subtle decorative sand dunes / waves
    ctx.strokeStyle = '#D0C2AD';
    ctx.lineWidth = 2;
    for (let w = 0; w < 5; w++) {
      ctx.beginPath();
      ctx.moveTo(0, rect.height * (0.2 * w + 0.1));
      ctx.bezierCurveTo(
        rect.width * 0.3, rect.height * (0.2 * w + 0.05),
        rect.width * 0.7, rect.height * (0.2 * w + 0.15),
        rect.width, rect.height * (0.2 * w + 0.1)
      );
      ctx.stroke();
    }

    setClearedPercent(0);
    lastPosRef.current = null;
  }, []);

  // Initialize canvas when entering scratch mode or changing stage
  useEffect(() => {
    if (!isRevealed) {
      initSandCanvas();
      const handleResize = () => {
        if (!isRevealed) initSandCanvas();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isRevealed, currentStage, initSandCanvas]);

  // Handle Quick Reveal Fail-Safe
  const handleQuickReveal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsTransitioning(false);
      setClearedPercent(100);
    }, 400);
  };

  // Handle advancing to next city stage
  const handleNextStage = () => {
    if (currentStage < stages.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStage(prev => prev + 1);
        setIsRevealed(false);
        setIsTransitioning(false);
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    } else {
      // 4th stage completed -> transition to shared multi-page hub
      onCompleteSequence();
      const hubElem = document.getElementById('expedition-hub');
      if (hubElem) {
        hubElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigateHub('itinerary');
      }
    }
  };

  // Calculate percentage of canvas cleared
  const checkClearedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let cleared = 0;
      let total = 0;
      // Step by 32 pixels for performance optimization (<3s responsiveness)
      for (let i = 3; i < data.length; i += 32) {
        total++;
        if (data[i] === 0) {
          cleared++;
        }
      }
      const percent = Math.min(100, Math.floor((cleared / total) * 100));
      setClearedPercent(percent);

      // Once 80% cleared, trigger expansion transition automatically
      if (percent >= 75 && !isRevealed && !isTransitioning) {
        handleQuickReveal();
      }
    } catch (e) {
      // Ignore CORS or tainted canvas errors if any
    }
  };

  // Spawn golden sparkle particle on scratch
  const spawnSparkle = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    const colors = ['#B8912F', '#FFD700', '#FAF6EE', '#C4AC7C'];
    const newSparkle: SparkleParticle = {
      id,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: Math.random() * 14 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setSparkles(prev => [...prev.slice(-12), newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(p => p.id !== id));
    }, 800);
  };

  // Unified scratch action (supports mouse and touch)
  const performScratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';

    // Draw continuous line between last pos and current pos for smooth erasing
    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = 80;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x, y };

    // Spawn sparkles every few points
    scratchCountRef.current++;
    if (scratchCountRef.current % 3 === 0) {
      spawnSparkle(x, y);
    }
    if (scratchCountRef.current % 8 === 0) {
      checkClearedPercentage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    lastPosRef.current = null;
    performScratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    performScratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    checkClearedPercentage();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    lastPosRef.current = null;
    if (e.touches.length > 0) {
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.touches.length > 0) {
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    checkClearedPercentage();
  };

  return (
    <section 
      ref={containerRef}
      id="scratch-experience-section"
      className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-[#FAF6EE] via-[#F5ECE0] to-[#FAF6EE] border-y border-[#E8DCC8]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Progress & Stage Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1E3B38] text-[#B8912F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 shadow-md border border-[#B8912F]/40">
            <Crown className="w-3.5 h-3.5 animate-pulse" />
            <span>High-Jewelry Experience • Destination {currentStage + 1} of {stages.length}</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E3B38] tracking-tight">
            Unveil Your 4 Sacred Jewels
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans mt-2 tracking-wide">
            {isRevealed 
              ? `Jewel ${currentStage + 1} Unveiled! Explore the editorial sanctuary below.`
              : `Scratch away the golden desert sand with your cursor or finger to reveal Stage ${currentStage + 1}: ${currentStageData.title}.`}
          </p>

          {/* Stage Progress Indicators */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {stages.map((stg, idx) => {
              const isDone = idx < currentStage || (idx === currentStage && isRevealed);
              const isCurr = idx === currentStage && !isRevealed;
              return (
                <div key={stg.id} className="flex items-center gap-1.5">
                  <div 
                    onClick={() => {
                      if (idx <= currentStage || isRevealed) {
                        setCurrentStage(idx);
                        setIsRevealed(idx < currentStage || (idx === currentStage && isRevealed));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-[#1E3B38] text-[#B8912F] border border-[#B8912F] shadow'
                        : isCurr
                        ? 'bg-[#B8912F] text-[#FAF6EE] shadow-lg scale-105 animate-pulse'
                        : 'bg-[#E8DCC8] text-gray-400 border border-gray-300'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span>{stg.stageNum}.</span>}
                    <span>{stg.title}</span>
                  </div>
                  {idx < stages.length - 1 && <ArrowRight className="w-3 h-3 text-gray-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN INTERACTIVE STATE MACHINE BOX */}
        <div className={`relative rounded-3xl overflow-hidden border-2 border-[#B8912F]/60 shadow-2xl transition-all duration-700 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } bg-[#FAF6EE] min-h-[580px] sm:min-h-[640px] flex flex-col justify-center`}>
          
          {/* STATE 1: THE SCRATCH MASK (When !isRevealed) */}
          {!isRevealed ? (
            <div className="relative w-full h-[600px] flex items-center justify-center select-none overflow-hidden group">
              {/* HIDDEN EMBLEM UNDERNEATH THE SAND */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#FAF6EE] z-0 pointer-events-none">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#1E3B38] border-4 border-[#B8912F] flex items-center justify-center text-[#B8912F] mb-6 shadow-2xl animate-pulse">
                  <span className="font-serif text-3xl sm:text-5xl tracking-widest">{currentStageData.emblemSymbol}</span>
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B5673E] font-bold block mb-1">
                  ✦ Stage {currentStage + 1} Hidden Jewel ✦
                </span>
                <h3 className="font-serif text-4xl sm:text-6xl font-bold text-[#1E3B38] mb-2 drop-shadow-sm">
                  {currentStageData.title}
                </h3>
                <p className="text-sm font-serif italic text-gray-500 max-w-md">
                  “{currentStageData.subtitle}”
                </p>
                <div className="mt-6 text-xs uppercase tracking-widest text-[#B8912F] font-semibold bg-[#FAF6EE] px-4 py-2 rounded-full border border-[#B8912F]/40 shadow">
                  Keep scratching to unlock the editorial sanctuary... ({clearedPercent}% Cleared)
                </div>
              </div>

              {/* HTML5 CANVAS SAND MASK OVERLAY */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="absolute inset-0 w-full h-full z-10 cursor-crosshair touch-none"
              />

              {/* FLOATING SPARKLE PARTICLES WHEN SCRATCHING */}
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className="absolute z-20 pointer-events-none animate-ping duration-700"
                  style={{
                    left: `${sp.x}px`,
                    top: `${sp.y}px`,
                    width: `${sp.size}px`,
                    height: `${sp.size}px`,
                    color: sp.color,
                  }}
                >
                  <Sparkles className="w-full h-full text-current drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                </div>
              ))}

              {/* PULSING TEXT LABEL ON TOP OF SAND: "MOVE TO EXPLORE" */}
              <div className={`absolute z-20 pointer-events-none transition-opacity duration-500 ${
                clearedPercent > 15 ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="flex flex-col items-center justify-center bg-[#FAF6EE]/90 backdrop-blur-xs border-2 border-[#B8912F] px-8 py-5 rounded-2xl shadow-2xl animate-bounce">
                  <div className="w-10 h-10 rounded-full bg-[#1E3B38] text-[#B8912F] flex items-center justify-center mb-2 shadow">
                    <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <span className="font-serif text-lg font-bold text-[#1E3B38] tracking-widest uppercase">
                    MOVE TO EXPLORE
                  </span>
                  <span className="text-[11px] font-sans text-gray-600 uppercase tracking-wider mt-0.5">
                    Scratch off the desert sand ({clearedPercent}% cleared)
                  </span>
                </div>
              </div>

              {/* PERSISTENT QUICK REVEAL FAIL-SAFE BUTTON */}
              <div className="absolute bottom-6 right-6 z-30">
                <button
                  onClick={handleQuickReveal}
                  className="bg-[#1E3B38] hover:bg-[#B8912F] text-[#FAF6EE] hover:text-[#2B2620] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl border-2 border-[#B8912F]/60 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
                  title="Instantly clear the sand mask"
                >
                  <Sparkles className="w-4 h-4 text-[#B8912F] group-hover:text-[#2B2620]" />
                  <span>QUICK REVEAL</span>
                </button>
              </div>

              {/* PROGRESS BAR IN BOTTOM LEFT */}
              <div className="absolute bottom-6 left-6 z-30 bg-[#FAF6EE]/90 backdrop-blur-xs border border-[#B8912F]/40 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#B5673E] to-[#B8912F] transition-all duration-300" 
                    style={{ width: `${clearedPercent}%` }} 
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#1E3B38]">
                  {clearedPercent}%
                </span>
              </div>
            </div>
          ) : (
            /* STATE 2: THE EXPANSION & SPLIT-SCREEN EDITORIAL VIEW (When isRevealed) */
            <div className="p-6 sm:p-10 lg:p-12 animate-in fade-in zoom-in-95 duration-700 bg-[#FAF6EE]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* LEFT SIDE: ARCHITECTURAL ARCHWAY HERO IMAGE (5 cols) */}
                <div className="lg:col-span-5 relative flex flex-col items-center">
                  <div className="relative w-full max-w-sm sm:max-w-md h-[420px] sm:h-[480px] rounded-t-[200px] sm:rounded-t-[240px] overflow-hidden border-4 border-[#B8912F]/60 shadow-2xl bg-[#1E3B38] group">
                    <img
                      src={currentStageData.imageUrl}
                      alt={currentStageData.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3B38] via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Archway Jewel Badge */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1E3B38]/90 text-[#B8912F] px-4 py-1.5 rounded-full text-xs font-serif font-bold tracking-widest uppercase border border-[#B8912F]/50 shadow-lg whitespace-nowrap">
                      {currentStageData.emblemSymbol} • {currentStageData.emblemName}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                      <span className="text-xs font-serif text-[#B8912F] tracking-[0.25em] uppercase block">
                        {currentStageData.arabicName}
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EE] drop-shadow">
                        {currentStageData.title}
                      </h4>
                    </div>
                  </div>

                  {/* Stay Badge below archway */}
                  <div className="mt-4 bg-[#1E3B38] text-[#FAF6EE] px-5 py-2.5 rounded-2xl border border-[#B8912F]/40 shadow-md flex items-center gap-2 text-xs font-semibold tracking-wider text-center">
                    <MapPin className="w-4 h-4 text-[#B8912F] shrink-0" />
                    <span>{currentStageData.stayDetails}</span>
                  </div>
                </div>

                {/* RIGHT SIDE: LUXURY TYPOGRAPHY & HIGHLIGHTS (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E8DCC8] pb-3 mb-4">
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B5673E] font-bold">
                        ✦ Destination Jewel {currentStage + 1} of 4 ✦
                      </span>
                      <button
                        onClick={() => setIsRevealed(false)}
                        className="text-xs text-gray-400 hover:text-[#1E3B38] underline inline-flex items-center gap-1 font-sans"
                        title="Re-mask with desert sand"
                      >
                        <RefreshCw className="w-3 h-3" /> Replay Scratch
                      </button>
                    </div>

                    <h3 className="font-serif text-4xl sm:text-6xl font-bold text-[#1E3B38] tracking-tight leading-none mb-3">
                      {currentStageData.title}
                    </h3>
                    <p className="font-serif italic text-lg sm:text-xl text-[#B8912F] mb-4">
                      “{currentStageData.subtitle}”
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans font-normal mb-6">
                      {currentStageData.description}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DCC8] shadow-inner space-y-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1E3B38] block border-b border-[#E8DCC8] pb-2">
                      ✦ Bespoke VIP Highlights for {guestName}:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#2B2620]">
                      {currentStageData.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 font-medium">
                          <span className="text-[#B8912F] font-bold mt-0.5">❖</span>
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* THE PROGRESSION ANCHOR ACTION BUTTON */}
                  <div className="pt-4 border-t border-[#E8DCC8] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 italic">
                      {currentStage < stages.length - 1 
                        ? `Next up: Stage ${currentStage + 2} (${stages[currentStage + 1].title})`
                        : "All 4 Sacred Jewels have been unveiled!"}
                    </div>

                    <button
                      onClick={handleNextStage}
                      className="w-full sm:w-auto bg-[#1E3B38] hover:bg-[#B8912F] text-[#FAF6EE] hover:text-[#2B2620] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-xl border border-[#B8912F]/60 transition-all flex items-center justify-center gap-3 group transform hover:scale-105"
                    >
                      <span>{currentStageData.nextLabel}</span>
                      {currentStage < stages.length - 1 ? (
                        <ArrowRight className="w-4 h-4 text-[#B8912F] group-hover:text-[#2B2620] group-hover:translate-x-1 transition-transform" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#B8912F] group-hover:text-[#2B2620] animate-bounce" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Footer Technical Note per Spec */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 px-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Elementor HTML5 Canvas Native • 60 FPS Touch-Optimized Scratch Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <span>VIP Invitee: <strong className="text-[#1E3B38]">{guestName}</strong></span>
            <span className="text-[#B8912F] font-serif font-bold">{hieroglyphs}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
