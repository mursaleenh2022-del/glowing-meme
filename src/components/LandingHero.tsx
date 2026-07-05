import React, { useState, useEffect } from 'react';
import { GuestVariant, PageId } from '../types';
import { DESTINATION_SPOTLIGHTS } from '../data/mockData';
import { ScratchRevealExperience } from './ScratchRevealExperience';
import { Sparkles, Compass, ArrowRight, ArrowLeft, Calendar, Building2, HelpCircle, Luggage, CloudSun, BookOpen, Send, ShieldCheck, RefreshCw, Crown, ChevronRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';

interface LandingHeroProps {
  guest: GuestVariant;
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ guest, onNavigate }) => {
  const [isForming, setIsForming] = useState(true);
  const [showEnglishName, setShowEnglishName] = useState(false);
  const [activeCardSlide, setActiveCardSlide] = useState(0);
  const [revealedSecrets, setRevealedSecrets] = useState<Record<string, boolean>>({});

  // Restart dust animation when guest changes
  useEffect(() => {
    setIsForming(true);
    setShowEnglishName(false);
    const timer = setTimeout(() => {
      setShowEnglishName(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, [guest.id]);

  const triggerReplay = () => {
    setIsForming(false);
    setShowEnglishName(false);
    setTimeout(() => {
      setIsForming(true);
      setTimeout(() => setShowEnglishName(true), 2800);
    }, 50);
  };

  const toggleSecretReveal = (id: string) => {
    setRevealedSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const hubEntryPoints: { id: PageId; title: string; subtitle: string; icon: React.ReactNode; bg: string }[] = [
    { id: 'itinerary', title: '1. Day-by-Day Itinerary', subtitle: '10 Days: Cairo, Luxor, Dahabiya, Aswan', icon: <Calendar className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'accommodations', title: '2. Where We Are Staying', subtitle: 'St. Regis, Al Moudira, Dahabiya, Old Cataract', icon: <Building2 className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'helpful-info', title: '3. Helpful Information', subtitle: 'Visits, E-Visa, Currency, Gratuities & Safety', icon: <HelpCircle className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'packing', title: '4. Packing List', subtitle: 'Adventure Chic, layering & surprise teasers', icon: <Luggage className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'weather', title: '5. Climate & Weather', subtitle: 'Dry season highs/lows for Cairo, Luxor & Aswan', icon: <CloudSun className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'media', title: '6. Recommended Media', subtitle: 'Books, Documentaries, Movies & Podcasts', icon: <BookOpen className="w-5 h-5 text-[#B8912F]" />, bg: 'bg-[#FAF6EE]' },
    { id: 'intake-form', title: '7. Guest Intake Form', subtitle: 'Submit flights, dietary likes/dislikes & allergies', icon: <Send className="w-5 h-5 text-emerald-600" />, bg: 'bg-[#FAF6EE] border-emerald-500/50' },
  ];

  const cardSlides = [
    {
      icon: <Crown className="w-6 h-6 text-[#B8912F]" />,
      title: "Welcome to a journey of wonder...",
      body: `“We are thrilled to welcome you both to this once-in-a-lifetime private Nile voyage. Prepare for unforgettable desert sunsets and timeless wonders.”`,
      buttonLabel: "EXPLORE PREVIEW GUIDE",
      action: () => setActiveCardSlide(1)
    },
    {
      icon: <Compass className="w-6 h-6 text-[#B8912F]" />,
      title: "Your guide to the experience",
      body: "• Return to starting point & replay reveal\n• Explore the 10-day private itinerary\n• View the luxury accommodations & sanctuary",
      buttonLabel: "PERSONALIZED RSVP LOGISTICS",
      action: () => setActiveCardSlide(2)
    },
    {
      icon: <Send className="w-6 h-6 text-[#B8912F]" />,
      title: "Unveil Your 4 Sacred Destinations",
      body: "• Sequential high-jewelry scratch-and-reveal\n• Uncover Cairo, Luxor, Dahabiya Yacht & Aswan\n• Discover luxury stay highlights & private privileges",
      buttonLabel: "SET OFF TO DISCOVER",
      action: () => {
        const scratchElem = document.getElementById('scratch-experience-section');
        if (scratchElem) {
          scratchElem.scrollIntoView({ behavior: 'smooth' });
        } else {
          onNavigate('itinerary');
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] relative overflow-hidden selection:bg-[#B8912F] selection:text-white font-sans">
      {/* Floating Sand Grains / Dust Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-[#B8912F] blur-[1px] animate-float-slow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-[#B5673E] blur-[1px] animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-1/4 w-4 h-4 rounded-full bg-[#B8912F] blur-[2px] animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-[#1E3B38] blur-[1px] animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-2/3 w-3 h-3 rounded-full bg-[#B8912F] blur-[1px] animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Ancient Egyptian Scarab Watermark (Van Cleef Reference Style) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-[#1E3B38]">
          <path d="M100,10 C120,30 150,50 160,80 C170,110 160,150 100,180 C40,150 30,110 40,80 C50,50 80,30 100,10 Z" />
          <circle cx="100" cy="65" r="18" />
        </svg>
      </div>

      {/* STAGE 1: TOP SCROLL CAPSULE ("DISCOVERY AWAITS...") per Video 00:00 */}
      <section className="pt-8 pb-4 text-center relative z-10">
        <div className="flex flex-col items-center justify-center animate-in fade-in duration-1000">
          <div className="w-6 h-11 rounded-full border-2 border-[#B8912F] flex items-start justify-center p-1 mb-2 shadow-xs bg-[#FAF6EE]">
            <div className="w-1.5 h-3 rounded-full bg-[#B8912F] animate-bounce" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B5673E] font-bold">
            DISCOVERY AWAITS...
          </span>
        </div>
      </section>

      {/* STAGE 2: EMBOSSED SAND TYPOGRAPHY ("FASCINATING EGYPT") per Video 00:08 */}
      <section className="relative pt-6 pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10">
        <div className="space-y-1 mb-6">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.18em] text-[#C4AC7C] drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)] uppercase select-none">
            FASCINATING
          </h1>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.25em] text-[#B8912F] drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)] uppercase select-none">
            EGYPT
          </h1>
        </div>

        {/* Ancient Scarab / Hieroglyph Cartouche Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAF6EE] border-2 border-[#B8912F]/60 text-[#B8912F] mb-8 shadow-lg transform hover:scale-110 transition cursor-pointer" onClick={triggerReplay} title="Click to replay hieroglyph reveal">
          <span className="font-serif text-2xl animate-pulse">𓂀</span>
        </div>

        {/* HIEROGLYPH NAME REVEAL TO ENGLISH NAME */}
        <div className="min-h-[140px] flex flex-col items-center justify-center relative">
          <div className="relative group cursor-pointer" onClick={triggerReplay} title="Click to replay hieroglyph dust formation animation">
            {/* Hieroglyph dust state */}
            <div
              className={`transition-all duration-1000 transform ${
                showEnglishName
                  ? 'opacity-20 scale-95 blur-sm translate-y-[-10px] pointer-events-none absolute inset-0'
                  : 'opacity-100 scale-100 blur-0'
              }`}
            >
              <span className="block font-serif text-4xl sm:text-6xl tracking-widest text-[#B8912F] animate-dust py-2">
                {guest.hieroglyphs}
              </span>
              <span className="block text-xs uppercase tracking-[0.2em] text-[#B5673E] mt-2 font-sans animate-pulse">
                ✦ Forming in the desert dust... ✦
              </span>
            </div>

            {/* English Personalized Name State */}
            <div
              className={`transition-all duration-1000 transform ${
                showEnglishName
                  ? 'opacity-100 scale-100 blur-0 translate-y-0'
                  : 'opacity-0 scale-105 blur-md translate-y-4 pointer-events-none'
              }`}
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-[#1E3B38] border-b-2 border-[#B8912F]/40 pb-3 px-6 inline-block">
                {guest.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#B8912F] uppercase tracking-[0.2em] font-semibold">
                <span>Honored Invitee</span>
                <span>•</span>
                <button onClick={(e) => { e.stopPropagation(); triggerReplay(); }} className="hover:underline inline-flex items-center gap-1 text-[#B5673E]">
                  <RefreshCw className="w-3 h-3" /> Replay Reveal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3: THE RISING EDITORIAL CARD per Video 00:18 - 00:23 */}
      <section className="py-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-lg mx-auto bg-[#FAF6EE] border-2 border-[#B8912F] rounded-3xl p-8 sm:p-10 shadow-2xl relative transition-all duration-500 transform hover:-translate-y-1">
          {/* Card Navigation Arrows (Left / Right) */}
          <button
            onClick={() => setActiveCardSlide((activeCardSlide + 2) % 3)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#1E3B38] hover:bg-[#E8DCC8]/50 rounded-full transition"
            title="Previous Card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveCardSlide((activeCardSlide + 1) % 3)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#1E3B38] hover:bg-[#E8DCC8]/50 rounded-full transition"
            title="Next Card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Content */}
          <div className="flex flex-col items-center text-center px-6 min-h-[260px] justify-between">
            <div className="p-3 bg-[#1E3B38] text-[#B8912F] rounded-2xl mb-4 shadow">
              {cardSlides[activeCardSlide].icon}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3B38] mb-4">
              {cardSlides[activeCardSlide].title}
            </h3>

            <div className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed max-w-sm whitespace-pre-line mb-6 font-medium">
              {cardSlides[activeCardSlide].body}
            </div>

            <button
              onClick={cardSlides[activeCardSlide].action}
              className="bg-[#1E3B38] hover:bg-[#1E3B38]/90 text-[#FAF6EE] px-8 py-3 rounded-full uppercase tracking-[0.15em] text-xs font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2 border border-[#B8912F]/40 group"
            >
              <span>{cardSlides[activeCardSlide].buttonLabel}</span>
              <ArrowRight className="w-4 h-4 text-[#B8912F] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Pagination Dots per Video 00:21 */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {cardSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCardSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeCardSlide === index ? 'w-6 bg-[#B8912F]' : 'bg-[#E8DCC8] hover:bg-[#B5673E]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STAGE 4: SEQUENTIAL HIGH-JEWELRY SCRATCH-AND-REVEAL STATE MACHINE per Spec & Video */}
      <ScratchRevealExperience
        guestName={guest.name}
        hieroglyphs={guest.hieroglyphs}
        onNavigateHub={onNavigate}
        onCompleteSequence={() => {}}
      />

      {/* STAGE 5: MULTI-PAGE NAVIGATION HUB */}
      <section id="expedition-hub" className="py-24 bg-[#FAF6EE] px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B5673E] block mb-2">
              Multi-Page Expedition Hub
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1E3B38]">
              Your guide to the experience
            </h2>
            <p className="text-sm font-sans text-gray-600 mt-3">
              Explore every detail of our upcoming Egyptian expedition. Select any section below to enter the dedicated hub page.
            </p>
          </div>

          {/* 7 Clickable Entry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubEntryPoints.map((point) => {
              const isForm = point.id === 'intake-form';
              return (
                <div
                  key={point.id}
                  onClick={() => onNavigate(point.id)}
                  className={`p-6 rounded-xl border border-[#E8DCC8] shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group ${
                    isForm ? 'bg-[#1E3B38] text-[#FAF6EE] sm:col-span-2 lg:col-span-1 border-[#B8912F]' : point.bg
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${isForm ? 'bg-[#FAF6EE]/10 text-[#B8912F]' : 'bg-[#1E3B38]/5 text-[#1E3B38]'}`}>
                      {point.icon}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      isForm ? 'bg-[#B8912F] text-[#2B2620]' : 'bg-[#E8DCC8]/60 text-[#1E3B38]'
                    }`}>
                      Page {point.id === 'intake-form' ? '7' : point.title.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold mb-1 group-hover:text-[#B8912F] transition-colors ${
                      isForm ? 'text-[#FAF6EE]' : 'text-[#1E3B38]'
                    }`}>
                      {point.title}
                    </h3>
                    <p className={`text-xs font-sans leading-relaxed ${isForm ? 'text-gray-300' : 'text-gray-600'}`}>
                      {point.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
                    <span className={isForm ? 'text-[#B8912F]' : 'text-[#B5673E]'}>
                      {isForm && guest.submittedForm ? '✓ Review RSVP' : 'Open Page'}
                    </span>
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                      isForm ? 'text-[#B8912F]' : 'text-[#1E3B38]'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Callout */}
          <div className="mt-16 bg-[#E8DCC8]/40 border border-[#B8912F]/30 rounded-xl p-6 text-center max-w-2xl mx-auto">
            <h4 className="font-serif text-lg font-bold text-[#1E3B38] mb-1">
              Have questions for Josh Earl before your departure?
            </h4>
            <p className="text-xs text-gray-600 font-sans mb-4">
              All travel logistics, hotel confirmations, and domestic flights between Cairo, Luxor, and Aswan are pre-arranged for you.
            </p>
            <button
              onClick={() => onNavigate('helpful-info')}
              className="text-xs font-bold uppercase tracking-wider text-[#B5673E] hover:underline inline-flex items-center gap-1"
            >
              <span>View Helpful Trip Logistics & FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
