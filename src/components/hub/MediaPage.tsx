import React, { useState } from 'react';
import { PageId } from '../../types';
import { MEDIA_RECOMMENDATIONS } from '../../data/mockData';
import { BookOpen, Film, Tv, Radio, GraduationCap, ArrowRight, Sparkles, AlertCircle, Eye, Plus, Check } from 'lucide-react';

interface MediaPageProps {
  onNavigate: (page: PageId) => void;
  isAdminMode: boolean;
}

export const MediaPage: React.FC<MediaPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [customItemInput, setCustomItemInput] = useState<{ [key: string]: string }>({});

  const getCategoryIcon = (name: string) => {
    if (name.includes('Nonfiction')) return <BookOpen className="w-5 h-5 text-[#B8912F]" />;
    if (name.includes('Fiction')) return <BookOpen className="w-5 h-5 text-[#B5673E]" />;
    if (name.includes('Documentaries')) return <Tv className="w-5 h-5 text-indigo-700" />;
    if (name.includes('Movies')) return <Film className="w-5 h-5 text-emerald-700" />;
    if (name.includes('Podcasts')) return <Radio className="w-5 h-5 text-amber-700" />;
    if (name.includes('Classes')) return <GraduationCap className="w-5 h-5 text-purple-700" />;
    return <BookOpen className="w-5 h-5 text-[#B8912F]" />;
  };

  const filteredCategories = activeTab === 'all'
    ? MEDIA_RECOMMENDATIONS
    : MEDIA_RECOMMENDATIONS.filter(c => c.categoryName.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Pre-Trip Immersion & Learning
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-4">
            Recommended Books & Media
          </h1>
          <p className="font-sans text-base text-gray-600 leading-relaxed">
            Immerse yourself in the legends of pharaohs, the mystery of Nile expeditions, and the architectural wonders of ancient Egypt before we set sail.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {['all', 'Books', 'Documentaries', 'Movies', 'Podcasts', 'Classes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition ${
                  activeTab === tab
                    ? 'bg-[#1E3B38] text-[#FAF6EE] shadow-md border border-[#B8912F]'
                    : 'bg-[#E8DCC8]/40 text-[#2B2620] hover:bg-[#E8DCC8]'
                }`}
              >
                {tab === 'all' ? 'All Categories (6)' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E8DCC8] p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-3 border-b border-[#E8DCC8] pb-4 mb-6">
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC8]">
                  {getCategoryIcon(cat.categoryName)}
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3B38]">
                    {cat.categoryName}
                  </h2>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((item, i) => {
                  if (item.isPlaceholder) {
                    return (
                      <div
                        key={i}
                        className="md:col-span-2 bg-amber-50/70 border-2 border-dashed border-[#B8912F]/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-3 text-left">
                          <AlertCircle className="w-5 h-5 text-[#B8912F] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                              {item.title}
                            </span>
                            <p className="text-xs text-gray-700 font-sans mt-2 max-w-xl">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="bg-[#FAF6EE]/50 hover:bg-[#FAF6EE] border border-[#E8DCC8] rounded-2xl p-6 transition flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#B5673E] mb-1">
                          <span>{cat.categoryName.split('—')[0]}</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#B8912F]" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1E3B38]">
                          {item.title}
                        </h3>
                        {item.authorOrCreator && (
                          <p className="text-xs font-semibold text-gray-500 font-sans italic mt-0.5">
                            By {item.authorOrCreator}
                          </p>
                        )}
                        <p className="text-xs text-[#2B2620]/90 font-sans leading-relaxed mt-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Intake Form */}
        <div className="mt-16 bg-[#1E3B38] text-white rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto border border-[#B8912F]/40 shadow-xl">
          <h2 className="font-serif text-3xl font-bold mb-2">Ready to Submit Your Travel Logistics?</h2>
          <p className="text-xs text-gray-300 font-sans leading-relaxed mb-6">
            Now that you have explored the itinerary, accommodations, and packing essentials, please submit your arrival/departure flight numbers and dietary preferences for Josh Earl.
          </p>
          <button
            onClick={() => onNavigate('intake-form')}
            className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center gap-2 mx-auto animate-bounce"
          >
            <span>Complete Guest Intake Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[#E8DCC8]">
          <button
            onClick={() => onNavigate('weather')}
            className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] hover:underline"
          >
            ← Back to Weather
          </button>
          <button
            onClick={() => onNavigate('intake-form')}
            className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] hover:underline flex items-center gap-1"
          >
            <span>Go to Intake Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
