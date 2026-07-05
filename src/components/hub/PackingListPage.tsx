import React, { useState } from 'react';
import { PageId } from '../../types';
import { PACKING_CATEGORIES } from '../../data/mockData';
import { Luggage, Sparkles, CheckSquare, Square, ArrowRight, ShieldAlert, Sun, Moon, Info } from 'lucide-react';

interface PackingListPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const PackingListPage: React.FC<PackingListPageProps> = ({ onNavigate }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'Lightweight Merino Wool Sweater / Cashmere Cardigan': true,
    'High-Quality UV Sunglasses & High SPF Sunscreen': true
  });

  const toggleCheck = (name: string) => {
    setCheckedItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalItems = PACKING_CATEGORIES[0].items.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Curated Wardrobe
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-3">
            Packing Guidance
          </h1>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#B8912F] tracking-wide uppercase mb-4">
            “Think Adventure Chic”
          </p>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Desert winter climates require versatile layering. While afternoon sunshine at Karnak Temple calls for lightweight cotton and linen, evenings sailing the Nile or dining on the rooftop of The St. Regis require warm jackets and merino wool sweaters.
          </p>
        </div>

        {/* Interactive Packing Progress Bar */}
        <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 mb-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1E3B38] text-[#B8912F] rounded-xl">
              <Luggage className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1E3B38]">Your Interactive Packing Checklist</h4>
              <p className="text-xs text-gray-500 font-sans">Check off items below as you prepare your luggage.</p>
            </div>
          </div>
          <div className="w-full sm:w-48 text-right">
            <div className="flex justify-between text-xs font-bold text-[#1E3B38] mb-1">
              <span>Progress</span>
              <span>{checkedCount} / {totalItems} items ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF6EE] rounded-full overflow-hidden border border-[#E8DCC8]">
              <div 
                className="h-full bg-gradient-to-r from-[#B5673E] to-[#B8912F] transition-all duration-300" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Packing Category: Layering Fundamentals */}
        {PACKING_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-[#E8DCC8] shadow-md p-6 sm:p-10 mb-10">
            <div className="border-b border-[#E8DCC8] pb-6 mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3B38] mb-3">
                {cat.title}
              </h2>
              <p className="text-sm text-[#2B2620]/90 leading-relaxed font-sans">
                {cat.description}
              </p>
            </div>

            {/* Checklist Items */}
            <div className="divide-y divide-[#E8DCC8]/60">
              {cat.items.map((item, i) => {
                const isChecked = !!checkedItems[item.name];
                return (
                  <div
                    key={i}
                    onClick={() => toggleCheck(item.name)}
                    className="py-4 flex items-start gap-3.5 cursor-pointer group transition hover:bg-[#FAF6EE]/50 px-3 rounded-lg -mx-3"
                  >
                    <button className="mt-0.5 text-[#1E3B38] group-hover:text-[#B8912F] transition focus:outline-none shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                    </button>
                    <div className="flex-1">
                      <span className={`text-sm font-semibold block transition ${isChecked ? 'line-through text-gray-400' : 'text-[#1E3B38]'}`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500 block font-sans mt-0.5">
                        {item.note}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* REQUIRED PLACEHOLDER: "A few special surprises to come later" */}
        <div className="bg-gradient-to-r from-[#1E3B38] via-[#1E3B38] to-[#2B2620] text-[#FAF6EE] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-dashed border-[#B8912F] mb-12 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#FAF6EE]/10 border border-[#B8912F] flex items-center justify-center text-[#B8912F] shrink-0 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8912F] font-bold block mb-1">
                ✦ Host Secret Teaser ✦
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                A few special surprises to come later...
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Josh Earl is preparing exclusive commemorative gifts and bespoke desert apparel for our 10 guests. Further updates will be added to this section prior to departure!
              </p>
            </div>
          </div>
        </div>

        {/* Day vs Evening Wardrobe Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-3">
              <Sun className="w-4 h-4" /> Daytime Excursion Attire
            </div>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Long-sleeve linen shirts, breathable cotton trousers, comfortable desert walking boots, sunglasses, and wide-brimmed hats for sun protection at Giza and Karnak.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3">
              <Moon className="w-4 h-4" /> Evening & Sailing Attire
            </div>
            <p className="text-xs text-gray-600 font-sans leading-relaxed">
              Warm merino wool sweaters, cashmere pashminas, tailored evening jackets, and resort elegance for rooftop dining and stargazing on the Dahabiya Nile deck.
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-[#E8DCC8]">
          <button
            onClick={() => onNavigate('helpful-info')}
            className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] hover:underline"
          >
            ← Back to Helpful Info
          </button>
          <button
            onClick={() => onNavigate('weather')}
            className="bg-[#1E3B38] text-[#FAF6EE] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#1E3B38]/90 transition flex items-center gap-1.5 shadow"
          >
            <span>View Climate & Weather</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B8912F]" />
          </button>
        </div>
      </div>
    </div>
  );
};
