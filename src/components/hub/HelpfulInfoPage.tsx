import React, { useState } from 'react';
import { PageId } from '../../types';
import { GENERAL_HELPFUL_INFO } from '../../data/mockData';
import { HelpCircle, Globe, Banknote, ShieldCheck, Sparkles, Wifi, ArrowRight, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface HelpfulInfoPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const HelpfulInfoPage: React.FC<HelpfulInfoPageProps> = ({ onNavigate }) => {
  const [questionInput, setQuestionInput] = useState('');
  const [qaHistory, setQaHistory] = useState<{ q: string; a: string }[]>([
    {
      q: 'Do I need to arrange my own airport transfers in Cairo or Aswan?',
      a: 'No! All airport transfers, meet & greet services at the jet bridge, and domestic flights between Cairo, Luxor, and Aswan are fully arranged and pre-paid by your host Josh Earl.'
    },
    {
      q: 'What plug adapters do I need to bring for my laptop or phone?',
      a: 'Egypt uses standard Type C and Type F round two-prong plugs (220V/50Hz), common throughout Europe. We recommend bringing a universal adapter, though one will also be provided in your welcome gift suite.'
    }
  ]);
  const [isAsking, setIsAsking] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Passport': return <Globe className="w-6 h-6 text-[#B8912F]" />;
      case 'Banknote': return <Banknote className="w-6 h-6 text-[#B8912F]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#B8912F]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#B8912F]" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-[#B8912F]" />;
      default: return <HelpCircle className="w-6 h-6 text-[#B8912F]" />;
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    setIsAsking(true);
    const userQ = questionInput.trim();
    setQuestionInput('');

    // Generate intelligent logistics answer
    setTimeout(() => {
      let answer = '';
      const lower = userQ.toLowerCase();
      if (lower.includes('tip') || lower.includes('baksheesh') || lower.includes('money') || lower.includes('cash') || lower.includes('egp')) {
        answer = 'All major group gratuities for our private Egyptologists, drivers, hotel staff, and Dahabiya boat crew are pre-paid by your host Josh Earl. You only need small EGP cash if you wish to tip for personal souvenirs or marketplace artisans.';
      } else if (lower.includes('dress') || lower.includes('wear') || lower.includes('clothe') || lower.includes('short') || lower.includes('modest')) {
        answer = 'For temple and mosque visits, modest elegance is recommended—covering shoulders and knees (linen trousers or maxi dresses are ideal). At hotel pools and onboard the private Dahabiya boat, swimwear and casual resort wear are completely fine.';
      } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('cell') || lower.includes('phone') || lower.includes('esim')) {
        answer = 'All our luxury hotels (St. Regis, Al Moudira, Old Cataract) and the private Dahabiya yacht have complimentary high-speed Wi-Fi. For mobile roaming, an eSIM from Airalo or Holafly works flawlessly across Egypt.';
      } else if (lower.includes('water') || lower.includes('drink') || lower.includes('food') || lower.includes('ice') || lower.includes('safe')) {
        answer = 'Please drink only bottled water (which will be provided in unlimited quantities in your suite, vehicles, and on the boat). Use bottled water for brushing teeth as well. All dining venues selected by Josh Earl meet top international 5-star hygiene standards.';
      } else if (lower.includes('visa') || lower.includes('passport') || lower.includes('entry') || lower.includes('customs')) {
        answer = 'US, UK, EU, and Canadian citizens can get a 30-day tourist visa on arrival for $25 USD, or apply online via the official Egyptian e-Visa website 7 days before departure. Our VIP meet & greet team will assist you at Cairo airport.';
      } else {
        answer = `Thank you for your question regarding "${userQ}". Josh Earl’s concierge team has logged this query. As a general rule, all core logistics, private security, domestic flights, and luxury accommodations are fully handled for our 10 invitees. Feel free to check our Packing List and Weather pages for more specifics!`;
      }

      setQaHistory(prev => [{ q: userQ, a: answer }, ...prev]);
      setIsAsking(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Preparation & Peace of Mind
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-4">
            Helpful Information
          </h1>
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            We have prepared a seamless, ultra-luxury travel experience. Here is everything you need to know regarding entry requirements, local customs, currency, and connectivity ahead of our departure.
          </p>
        </div>

        {/* 5 Core Logistics Cards */}
        <div className="space-y-6 mb-16">
          {GENERAL_HELPFUL_INFO.map((info, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8DCC8] p-6 sm:p-8 shadow-md hover:shadow-lg transition flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="p-4 rounded-xl bg-[#1E3B38]/5 border border-[#1E3B38]/10 shrink-0">
                {getIcon(info.icon)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#1E3B38]">
                    {info.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B5673E] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#E8DCC8]">
                    {info.summary}
                  </span>
                </div>
                <p className="text-sm text-[#2B2620]/90 leading-relaxed font-sans">
                  {info.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Trip Concierge Q&A Box */}
        <div className="bg-[#1E3B38] text-[#FAF6EE] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#B8912F]/40 mb-16">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B8912F] font-bold bg-[#FAF6EE]/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> 24/7 Logistics Assistant
            </span>
            <h2 className="font-serif text-3xl font-bold">Have a Quick Trip Question?</h2>
            <p className="text-xs text-gray-300 font-sans mt-2">
              Ask any question about dress codes, tipping, electrical adapters, or airport arrival procedures.
            </p>
          </div>

          <form onSubmit={handleAskQuestion} className="max-w-xl mx-auto flex gap-2 mb-8">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="e.g. Do I need cash for shopping in Khan el-Khalili?"
              className="flex-1 bg-[#FAF6EE] text-[#2B2620] px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B8912F] border border-transparent shadow-inner font-sans"
            />
            <button
              type="submit"
              disabled={isAsking || !questionInput.trim()}
              className="bg-[#B8912F] hover:bg-[#B8912F]/90 disabled:opacity-50 text-[#2B2620] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow"
            >
              <Send className="w-4 h-4" />
              <span>{isAsking ? '...' : 'Ask'}</span>
            </button>
          </form>

          {/* Q&A Results List */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {qaHistory.map((item, i) => (
              <div key={i} className="bg-[#FAF6EE]/10 border border-[#FAF6EE]/15 rounded-xl p-4 text-left animate-in fade-in duration-200">
                <div className="flex items-start gap-2 text-xs font-bold text-[#B8912F] mb-1">
                  <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>Q: {item.q}</span>
                </div>
                <p className="text-xs text-gray-200 font-sans leading-relaxed pl-5">
                  <strong className="text-white">A: </strong>{item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step Banner */}
        <div className="bg-white rounded-2xl border border-[#E8DCC8] p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B5673E] block mb-1">Next Step in Preparation</span>
            <h3 className="font-serif text-2xl font-bold text-[#1E3B38]">Check the Packing List & Weather</h3>
            <p className="text-xs text-gray-600 font-sans">Learn why layering is essential for desert winter evenings and Dahabiya deck sailing.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('packing')}
              className="bg-[#1E3B38] hover:bg-[#1E3B38]/90 text-[#FAF6EE] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow"
            >
              <span>Packing Guide</span>
              <ArrowRight className="w-4 h-4 text-[#B8912F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
