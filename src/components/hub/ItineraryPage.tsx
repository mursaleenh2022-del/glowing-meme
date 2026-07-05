import React, { useState } from 'react';
import { ItineraryDay, PageId } from '../../types';
import { ITINERARY_DAYS, ACCOMMODATIONS } from '../../data/mockData';
import { Calendar, MapPin, Sun, Moon, ArrowRight, Building2, Filter, Eye, Sparkles } from 'lucide-react';

interface ItineraryPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const ItineraryPage: React.FC<ItineraryPageProps> = ({ onNavigate, isAdminMode }) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const filteredDays = selectedCity === 'all' 
    ? ITINERARY_DAYS 
    : ITINERARY_DAYS.filter(d => d.location.toLowerCase().includes(selectedCity.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Full Trip Schedule
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-4">
            Your Day-by-Day Expedition
          </h1>
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            From private after-hours Giza pyramid access to sailing the Nile on our chartered Dahabiya yacht, explore the daily rhythm of our 10-day Egyptian adventure.
          </p>

          {/* City Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by Stop:
            </span>
            {['all', 'Cairo', 'Luxor', 'Dahabiya', 'Aswan'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
                  selectedCity === city
                    ? 'bg-[#1E3B38] text-[#FAF6EE] shadow-md border border-[#B8912F]'
                    : 'bg-[#E8DCC8]/40 text-[#2B2620] hover:bg-[#E8DCC8]'
                }`}
              >
                {city === 'all' ? 'All 10 Days' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Where We Will Be Staying Quick Summary Card (Section 8.1 Requirement) */}
        <div className="bg-[#1E3B38] text-[#FAF6EE] rounded-2xl p-6 sm:p-8 mb-12 shadow-xl border border-[#B8912F]/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#FAF6EE]/15 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8912F] block mb-1">
                Accommodations Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Where We Will Be Staying
              </h2>
            </div>
            <button
              onClick={() => onNavigate('accommodations')}
              className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow"
            >
              <span>View Full Accommodations Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCOMMODATIONS.map((acc) => (
              <div
                key={acc.id}
                onClick={() => onNavigate('accommodations')}
                className="bg-[#FAF6EE]/5 hover:bg-[#FAF6EE]/10 border border-[#FAF6EE]/10 rounded-xl p-4 transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#B8912F] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {acc.city}</span>
                    <span>★ ★ ★ ★ ★</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B8912F] transition-colors">
                    {acc.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                    {acc.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-[#B8912F]">
                  <span>Property Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-6">
          {filteredDays.map((day) => {
            const isExpanded = expandedDay === day.dayNumber;
            return (
              <div
                key={day.dayNumber}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-[#B8912F] shadow-xl ring-1 ring-[#B8912F]/30' : 'border-[#E8DCC8] shadow hover:shadow-md'
                }`}
              >
                {/* Day Header Bar */}
                <div
                  onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-white to-[#FAF6EE]/50 hover:bg-[#FAF6EE] transition"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1E3B38] text-[#B8912F] flex flex-col items-center justify-center font-serif font-bold shadow-md shrink-0 border border-[#B8912F]/40">
                      <span className="text-[10px] uppercase tracking-widest text-[#FAF6EE]">Day</span>
                      <span className="text-lg sm:text-xl leading-none">{day.dayNumber}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#B5673E] font-semibold uppercase tracking-wider">
                        <span>{day.date}</span>
                        <span>•</span>
                        <span className="bg-[#E8DCC8]/60 text-[#1E3B38] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B8912F]" /> {day.location}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E3B38] mt-1">
                        {day.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-sans font-medium mt-0.5">
                        ✦ {day.highlight}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B8912F] bg-[#1E3B38]/5 px-3 py-1 rounded-full border border-[#1E3B38]/10">
                      {isExpanded ? 'Collapse Day' : 'View Full Schedule'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#E8DCC8] p-6 sm:p-8 bg-[#FAF6EE]/40 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#B5673E] mb-2">
                          Day Overview
                        </h4>
                        <p className="text-sm sm:text-base text-[#2B2620] leading-relaxed font-sans">
                          {day.description}
                        </p>
                      </div>

                      {/* Morning, Afternoon, Evening Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="bg-white p-4 rounded-xl border border-[#E8DCC8] shadow-xs">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                            <Sun className="w-4 h-4 text-amber-500" /> Morning
                          </div>
                          <p className="text-xs text-gray-700 leading-normal">{day.morningActivity}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E8DCC8] shadow-xs">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 mb-2">
                            <Sun className="w-4 h-4 text-orange-500" /> Afternoon
                          </div>
                          <p className="text-xs text-gray-700 leading-normal">{day.afternoonActivity}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-[#E8DCC8] shadow-xs">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                            <Moon className="w-4 h-4 text-indigo-700" /> Evening
                          </div>
                          <p className="text-xs text-gray-700 leading-normal">{day.eveningActivity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Day Image */}
                    <div className="rounded-xl overflow-hidden shadow-md bg-[#1E3B38] relative min-h-[220px]">
                      <img src={day.imageUrl} alt={day.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8912F] block">Stop #{day.dayNumber}</span>
                        <p className="text-xs font-serif font-medium">{day.location} Expedition</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpful Info Teaser Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1E3B38] to-[#2B2620] text-[#FAF6EE] rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#B8912F]/40">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#B8912F] font-semibold block mb-1">
              Logistics & Preparation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Need Visa, Packing, or Climate guidance?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Check out our Helpful Information and Packing List pages to ensure you are ready for desert temperatures and temple dress codes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('packing')}
              className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition shadow"
            >
              Packing List
            </button>
            <button
              onClick={() => onNavigate('helpful-info')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition"
            >
              Helpful Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
