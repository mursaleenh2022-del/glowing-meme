import React, { useState } from 'react';
import { PageId, GuestVariant } from '../types';
import { Compass, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  activeGuest: GuestVariant;
  onSelectGuest: (guest: GuestVariant) => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
  onOpenAdminModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  activeGuest,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'itinerary', label: '1. Itinerary' },
    { id: 'accommodations', label: '2. Accommodations' },
    { id: 'helpful-info', label: '3. Helpful Info' },
    { id: 'packing', label: '4. Packing List' },
    { id: 'weather', label: '5. Weather' },
    { id: 'media', label: '6. Books & Media' },
    { id: 'intake-form', label: '7. Intake Form' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#1E3B38] border border-[#B8912F] flex items-center justify-center text-[#B8912F] shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-[#1E3B38] group-hover:text-[#B8912F] transition-colors uppercase">
                Egypt
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const isForm = link.id === 'intake-form';
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-2 text-xs uppercase tracking-[0.12em] font-medium transition-all rounded ${
                    isActive
                      ? 'bg-[#1E3B38] text-[#FAF6EE] shadow-sm border border-[#B8912F]/40'
                      : isForm
                      ? 'bg-[#B8912F]/15 text-[#1E3B38] hover:bg-[#B8912F]/25 border border-[#B8912F]/30 font-semibold'
                      : 'text-[#2B2620] hover:text-[#B8912F] hover:bg-[#E8DCC8]/40'
                  }`}
                >
                  {link.label.replace(/^\d+\.\s*/, '')}
                  {isForm && !activeGuest.submittedForm && (
                    <span className="ml-1 inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>



          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onNavigate('intake-form')}
              className="bg-[#1E3B38] text-[#FAF6EE] text-xs font-medium px-3 py-1.5 rounded uppercase tracking-wider border border-[#B8912F]/40"
            >
              RSVP
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#2B2620] hover:text-[#B8912F] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6EE] border-t border-[#E8DCC8] shadow-xl px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top duration-200">
          <div className="py-2 px-3 text-xs font-semibold text-[#1E3B38] uppercase tracking-wider border-b border-[#E8DCC8] mb-2">
            <span>Navigation Hub</span>
          </div>
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm uppercase tracking-wider font-medium rounded transition flex items-center justify-between ${
                  isActive
                    ? 'bg-[#1E3B38] text-[#FAF6EE] font-bold border-l-4 border-[#B8912F]'
                    : 'text-[#2B2620] hover:bg-[#E8DCC8]/40'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'intake-form' && !activeGuest.submittedForm && (
                  <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">Action Needed</span>
                )}
              </button>
            );
          })}

        </div>
      )}
    </header>
  );
};
