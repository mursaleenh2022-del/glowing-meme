import React from 'react';
import { PageId } from '../../types';
import { WEATHER_DATA } from '../../data/mockData';
import { CloudSun, Sun, Thermometer, ShieldAlert, ArrowRight, BookOpen, Sparkles, MapPin } from 'lucide-react';

interface WeatherPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Climate & Forecast
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-4">
            Weather & Climate Outlook
          </h1>
          <div className="inline-flex items-center gap-2 bg-[#B8912F]/15 border border-[#B8912F]/40 text-[#1E3B38] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sun className="w-4 h-4 text-[#B8912F]" />
            <span>January & February: Egyptian Dry Season</span>
          </div>
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            Our expedition takes place during Egypt’s most coveted winter months. Guests should expect warm, brilliantly sunny days with zero rainfall, followed by brisk, chilly desert nights once the sun dips below the horizon.
          </p>
        </div>

        {/* AVERAGE TEMPERATURE TABLE (Section 8.3 Requirement) */}
        <div className="bg-white rounded-3xl border border-[#E8DCC8] shadow-xl overflow-hidden mb-12">
          <div className="bg-[#1E3B38] text-[#FAF6EE] p-6 sm:p-8 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8912F] block">
                Destination Temperature Benchmarks
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Average Highs & Lows by City
              </h2>
            </div>
            <Thermometer className="w-8 h-8 text-[#B8912F] hidden sm:block opacity-80" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1E3B38] text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4">Destination Stop</th>
                    <th className="py-3 px-4 text-center">Average High (Day)</th>
                    <th className="py-3 px-4 text-center">Average Low (Night)</th>
                    <th className="py-3 px-4">Sun & UV Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DCC8]">
                  {WEATHER_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF6EE]/60 transition">
                      <td className="py-5 px-4 font-serif text-xl font-bold text-[#1E3B38] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#B8912F] shrink-0" />
                        <span>{row.destination}</span>
                      </td>
                      <td className="py-5 px-4 text-center font-sans text-lg font-bold text-amber-700 bg-amber-50/50 rounded-lg my-1">
                        {row.avgHigh}
                      </td>
                      <td className="py-5 px-4 text-center font-sans text-lg font-bold text-indigo-900 bg-indigo-50/50 rounded-lg my-1">
                        {row.avgLow}
                      </td>
                      <td className="py-5 px-4 font-sans text-xs text-gray-600 leading-relaxed">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BRIGHT SUN WARNING & FULL COVERAGE GUIDELINES (Section 8.3 Requirement) */}
        <div className="bg-gradient-to-r from-[#B5673E]/10 via-[#FAF6EE] to-[#B8912F]/10 border-l-4 border-[#B5673E] rounded-2xl p-6 sm:p-8 shadow-md mb-12 flex flex-col sm:flex-row items-start gap-5">
          <div className="p-3.5 bg-[#B5673E] text-white rounded-xl shrink-0 shadow">
            <Sun className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1E3B38] mb-2">
              Important Note: The Desert Sun is Very Bright
            </h3>
            <p className="text-sm text-[#2B2620]/90 font-sans leading-relaxed">
              Even in cool winter temperatures, the Egyptian desert sun reflects powerfully off limestone pyramids, temple pillars, and the waters of the Nile. For all outdoor activities on the Giza Plateau, Valley of the Kings, and Abu Simbel, <strong>full coverage is strongly recommended</strong>. Wear breathable long-sleeve cotton/linen shirts, wide-brimmed hats, UV-blocking sunglasses, and SPF 50+ sunscreen daily.
            </p>
          </div>
        </div>

        {/* PRE-TRIP LEARNING RESOURCES LINK-OUT (Section 8.3 Requirement) */}
        <div className="bg-[#1E3B38] text-white rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto border border-[#B8912F]/40 shadow-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B8912F] bg-[#FAF6EE]/10 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Pre-Trip Immersion
          </span>
          <h2 className="font-serif text-3xl font-bold mb-3">Learn more before the trip</h2>
          <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
            Get into the spirit of ancient Egypt before packing your suitcase. Explore our curated library of nonfiction books, documentaries, movies, podcasts, and online classes.
          </p>
          <button
            onClick={() => onNavigate('media')}
            className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition shadow-lg flex items-center gap-2 mx-auto"
          >
            <span>Explore Books & Media Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#E8DCC8]">
          <button
            onClick={() => onNavigate('packing')}
            className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] hover:underline"
          >
            ← Back to Packing List
          </button>
          <button
            onClick={() => onNavigate('media')}
            className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] hover:underline flex items-center gap-1"
          >
            <span>Go to Books & Media</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
