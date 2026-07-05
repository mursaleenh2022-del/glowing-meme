/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { PageId, GuestVariant, IntakeFormSubmission } from './types';
import { GUESTS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { LandingHero } from './components/LandingHero';
import { ItineraryPage } from './components/hub/ItineraryPage';
import { AccommodationsPage } from './components/hub/AccommodationsPage';
import { HelpfulInfoPage } from './components/hub/HelpfulInfoPage';
import { PackingListPage } from './components/hub/PackingListPage';
import { WeatherPage } from './components/hub/WeatherPage';
import { MediaPage } from './components/hub/MediaPage';
import { IntakeFormPage } from './components/hub/IntakeFormPage';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Compass, ShieldCheck, Heart, Sparkles, PhoneCall, Mail, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [guestList, setGuestList] = useState<GuestVariant[]>(GUESTS);
  const [activeGuest, setActiveGuest] = useState<GuestVariant>(GUESTS[0]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle form submission
  const handleFormSubmission = (submission: IntakeFormSubmission) => {
    const updatedList = guestList.map(g => {
      if (g.id === submission.guestId) {
        return {
          ...g,
          submittedForm: true,
          intakeData: submission
        };
      }
      return g;
    });
    setGuestList(updatedList);

    const updatedActive = updatedList.find(g => g.id === activeGuest.id);
    if (updatedActive) {
      setActiveGuest(updatedActive);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#2B2620] selection:bg-[#B8912F] selection:text-white font-sans antialiased">
      {/* Sticky Navigation Header */}
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        activeGuest={activeGuest}
        onSelectGuest={setActiveGuest}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Expedition Content Area */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingHero
            guest={activeGuest}
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'itinerary' && (
          <ItineraryPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'accommodations' && (
          <AccommodationsPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'helpful-info' && (
          <HelpfulInfoPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'packing' && (
          <PackingListPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'weather' && (
          <WeatherPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'media' && (
          <MediaPage
            onNavigate={setCurrentPage}
            isAdminMode={isAdminMode}
          />
        )}
        {currentPage === 'intake-form' && (
          <IntakeFormPage
            guest={activeGuest}
            onNavigate={setCurrentPage}
            onSubmitForm={handleFormSubmission}
            isAdminMode={isAdminMode}
          />
        )}
      </main>

      {/* Host Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        guestList={guestList}
      />

      {/* Luxury Site Footer */}
      <footer className="bg-[#1E3B38] text-[#FAF6EE] border-t border-[#B8912F]/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#FAF6EE]/10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#B8912F]" />
              <span className="font-serif text-xl font-bold tracking-wider uppercase text-white">Egypt 2026</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              An exclusive, bespoke Egyptian expedition hosted by Josh Earl. Ten invited guests, four timeless destinations, and one private Dahabiya Nile yacht.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#B8912F] font-serif">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Guest Experience</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#B8912F] uppercase tracking-wider">Navigation Hub</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><button onClick={() => setCurrentPage('landing')} className="hover:text-[#B8912F] transition">0. Landing Experience</button></li>
              <li><button onClick={() => setCurrentPage('itinerary')} className="hover:text-[#B8912F] transition">1. Day-by-Day Itinerary</button></li>
              <li><button onClick={() => setCurrentPage('accommodations')} className="hover:text-[#B8912F] transition">2. Where We Are Staying</button></li>
              <li><button onClick={() => setCurrentPage('helpful-info')} className="hover:text-[#B8912F] transition">3. Helpful Information</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#B8912F] uppercase tracking-wider">Preparation</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><button onClick={() => setCurrentPage('packing')} className="hover:text-[#B8912F] transition">4. Packing Guidance</button></li>
              <li><button onClick={() => setCurrentPage('weather')} className="hover:text-[#B8912F] transition">5. Weather & Climate</button></li>
              <li><button onClick={() => setCurrentPage('media')} className="hover:text-[#B8912F] transition">6. Recommended Media</button></li>
              <li><button onClick={() => setCurrentPage('intake-form')} className="hover:text-[#B8912F] transition font-semibold text-white">7. Guest Intake Form</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#B8912F] uppercase tracking-wider">Host Concierge</h4>
            <p className="text-xs text-gray-300">
              Need immediate assistance with flights or dietary preferences?
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-200">
                <Mail className="w-4 h-4 text-[#B8912F]" />
                <span>concierge@joshearlegypt.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <PhoneCall className="w-4 h-4 text-[#B8912F]" />
                <span>+1 (800) 555-EGYPT</span>
              </div>
            </div>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="mt-3 w-full bg-[#3C5C4A] hover:bg-[#3C5C4A]/80 text-white py-2 rounded text-[11px] font-bold uppercase tracking-widest border border-[#B8912F]/40 transition"
            >
              👑 Josh Earl’s Host Access
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted VIP Portal • Josh Earl Private Expedition • 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2026 Josh Earl. All rights reserved.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition flex items-center gap-1 text-[11px]"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
