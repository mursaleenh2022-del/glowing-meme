import React from 'react';
import { PageId } from '../../types';
import { ACCOMMODATIONS } from '../../data/mockData';
import { Building2, ExternalLink, Sparkles, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface AccommodationsPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const AccommodationsPage: React.FC<AccommodationsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Lodging & Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-4">
            Where We Will Be Staying
          </h1>
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            From modern metropolitan luxury overlooking the Nile skyline to a private 19th-century Victorian palace in Nubian Aswan, every property has been handpicked by your host Josh Earl for its heritage, privacy, and architectural grandeur.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs bg-[#1E3B38]/10 text-[#1E3B38] px-3 py-1.5 rounded-full font-medium">
            <ShieldCheck className="w-4 h-4 text-[#B8912F]" />
            <span>All suites & private boat cabins are pre-reserved and paid in full by your host.</span>
          </div>
        </div>

        {/* Accommodations List */}
        <div className="space-y-16">
          {ACCOMMODATIONS.map((acc, idx) => (
            <div
              key={acc.id}
              className={`bg-white rounded-3xl border border-[#E8DCC8] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 transition duration-300 hover:shadow-2xl ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#1E3B38] overflow-hidden">
                <img
                  src={acc.imageUrl}
                  alt={acc.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 bg-[#1E3B38]/90 text-[#B8912F] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-[#B8912F]/40 shadow">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {acc.city} Stop</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                  <span className="text-[10px] text-[#B8912F] uppercase tracking-widest font-bold block">{acc.style}</span>
                  <h3 className="font-serif text-2xl font-bold">{acc.name}</h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B5673E]">
                      {acc.style}
                    </span>
                    <span className="text-[#B8912F] font-serif text-sm tracking-widest">★ ★ ★ ★ ★</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3B38] mb-2">
                    {acc.name}
                  </h2>
                  <p className="text-sm font-semibold text-gray-700 font-sans italic mb-4 border-l-2 border-[#B8912F] pl-3 py-0.5">
                    "{acc.subtitle}"
                  </p>
                  <p className="text-sm text-[#2B2620]/90 leading-relaxed font-sans">
                    {acc.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E8DCC8]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#B8912F]" />
                    <span>Property & Suite Amenities:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                    {acc.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link & Action */}
                <div className="pt-4 border-t border-[#E8DCC8] flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={acc.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1E3B38] hover:bg-[#1E3B38]/90 text-[#FAF6EE] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 border border-[#B8912F]/40 shadow-sm"
                  >
                    <span>View Property Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8912F]" />
                  </a>

                  <button
                    onClick={() => onNavigate('itinerary')}
                    className="text-xs font-bold uppercase tracking-wider text-[#B5673E] hover:underline flex items-center gap-1"
                  >
                    <span>See in Daily Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 bg-[#1E3B38] text-white rounded-2xl p-8 text-center max-w-2xl mx-auto border border-[#B8912F]/40">
          <h3 className="font-serif text-2xl font-bold mb-2">Ready to pack for these luxury sanctuaries?</h3>
          <p className="text-xs text-gray-300 font-sans mb-6">
            Review our curated packing guidelines for evening terrace dinners and Dahabiya deck relaxation.
          </p>
          <button
            onClick={() => onNavigate('packing')}
            className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition shadow-lg"
          >
            Go to Packing List
          </button>
        </div>
      </div>
    </div>
  );
};
