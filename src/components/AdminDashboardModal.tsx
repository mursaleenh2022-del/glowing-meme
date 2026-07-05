import React, { useState } from 'react';
import { GuestVariant, IntakeFormSubmission } from '../types';
import { GUESTS } from '../data/mockData';
import { X, Crown, Download, CheckCircle2, AlertCircle, Users, Utensils, Plane, ShieldCheck, Sparkles, Filter } from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestList: GuestVariant[];
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  guestList
}) => {
  const [filterType, setFilterType] = useState<'all' | 'submitted' | 'pending'>('all');
  const [selectedGuestView, setSelectedGuestView] = useState<GuestVariant | null>(null);

  if (!isOpen) return null;

  const submittedCount = guestList.filter(g => g.submittedForm).length;
  const pendingCount = guestList.length - submittedCount;

  const filteredGuests = guestList.filter(g => {
    if (filterType === 'submitted') return g.submittedForm;
    if (filterType === 'pending') return !g.submittedForm;
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Guest ID', 'Name', 'Email', 'Role', 'Submitted RSVP', 'Arrival Flight', 'Departure Flight', 'Food Favorites', 'Food Dislikes', 'Allergies'];
    const rows = guestList.map(g => [
      g.id,
      g.name,
      g.email,
      g.role,
      g.submittedForm ? 'Yes' : 'No',
      g.intakeData ? `${g.intakeData.arrivalAirline} ${g.intakeData.arrivalFlightNumber} (${g.intakeData.arrivalDay})` : 'Pending',
      g.intakeData ? `${g.intakeData.departureAirline} ${g.intakeData.departureFlightNumber} (${g.intakeData.departureDay})` : 'Pending',
      g.intakeData ? `"${g.intakeData.foodFavorites}"` : 'Pending',
      g.intakeData ? `"${g.intakeData.foodDislikes}"` : 'Pending',
      g.intakeData ? `"${g.intakeData.allergies}"` : 'Pending'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'egypt_2026_guest_intake_registry.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF6EE] text-[#2B2620] w-full max-w-6xl max-h-[90vh] rounded-3xl border-2 border-[#B8912F] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#1E3B38] text-[#FAF6EE] p-6 flex items-center justify-between border-b border-[#B8912F]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#B8912F] text-[#2B2620] rounded-xl font-bold shadow">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">Josh Earl’s Host Admin Dashboard</h2>
                <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                  Encrypted Host Access Portal
                </span>
              </div>
              <p className="text-xs text-gray-300 font-sans mt-0.5">
                Monitor all 10 invited guest variants, review submitted travel logistics, and export chef dietary registries.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
            title="Close Dashboard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DCC8] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-gray-400 block">Total Invited Guests</span>
                <span className="font-serif text-3xl font-bold text-[#1E3B38]">{guestList.length}</span>
              </div>
              <Users className="w-8 h-8 text-[#1E3B38] opacity-20" />
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8DCC8] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 block">RSVP Form Submitted</span>
                <span className="font-serif text-3xl font-bold text-emerald-700">{submittedCount}</span>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-600 opacity-20" />
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8DCC8] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-amber-600 block">Forms Pending</span>
                <span className="font-serif text-3xl font-bold text-amber-700">{pendingCount}</span>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600 opacity-20" />
            </div>
            <div className="bg-[#1E3B38] text-white p-5 rounded-2xl border border-[#B8912F]/40 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#B8912F] block">Chef Registry Status</span>
                <span className="font-serif text-lg font-bold text-white">Active Sync</span>
              </div>
              <Utensils className="w-8 h-8 text-[#B8912F] opacity-40" />
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DCC8]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Guests:
              </span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  filterType === 'all' ? 'bg-[#1E3B38] text-[#FAF6EE]' : 'bg-[#FAF6EE] text-[#2B2620] hover:bg-[#E8DCC8]'
                }`}
              >
                All ({guestList.length})
              </button>
              <button
                onClick={() => setFilterType('submitted')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  filterType === 'submitted' ? 'bg-emerald-800 text-white' : 'bg-[#FAF6EE] text-[#2B2620] hover:bg-[#E8DCC8]'
                }`}
              >
                RSVP’d ({submittedCount})
              </button>
              <button
                onClick={() => setFilterType('pending')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  filterType === 'pending' ? 'bg-amber-700 text-white' : 'bg-[#FAF6EE] text-[#2B2620] hover:bg-[#E8DCC8]'
                }`}
              >
                Pending ({pendingCount})
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Export All Intake Data (.CSV)</span>
            </button>
          </div>

          {/* Guests Table */}
          <div className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1E3B38] text-[#FAF6EE] text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Guest Name / Variant</th>
                    <th className="py-3.5 px-4">ACF Hieroglyph Mapping</th>
                    <th className="py-3.5 px-4 text-center">RSVP Form Status</th>
                    <th className="py-3.5 px-4">Flight Logistics</th>
                    <th className="py-3.5 px-4">Allergies Logged</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DCC8]/60 text-xs font-sans">
                  {filteredGuests.map((g) => (
                    <tr key={g.id} className="hover:bg-[#FAF6EE]/70 transition">
                      <td className="py-4 px-4 font-serif text-base font-bold text-[#1E3B38]">
                        <div className="flex items-center gap-2">
                          <span>{g.name}</span>
                          {g.role === 'vip' && (
                            <span className="bg-[#B8912F]/20 text-[#B8912F] text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">VIP</span>
                          )}
                        </div>
                        <span className="text-[11px] font-sans font-normal text-gray-500 block">{g.email}</span>
                      </td>
                      <td className="py-4 px-4 font-serif text-lg text-[#B8912F] tracking-widest">
                        {g.hieroglyphs}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {g.submittedForm ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {g.intakeData ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1 text-[11px]">
                              <Plane className="w-3 h-3 text-emerald-600" />
                              <span>IN: {g.intakeData.arrivalAirline} {g.intakeData.arrivalFlightNumber}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-gray-500">
                              <Plane className="w-3 h-3 text-amber-600 rotate-90" />
                              <span>OUT: {g.intakeData.departureAirline} {g.intakeData.departureFlightNumber}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Awaiting submission</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {g.intakeData ? (
                          <span className={`font-semibold ${g.intakeData.allergies.toLowerCase() !== 'none' ? 'text-red-700 bg-red-100 px-2 py-0.5 rounded' : 'text-gray-600'}`}>
                            {g.intakeData.allergies}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedGuestView(g)}
                          className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] bg-[#E8DCC8]/50 hover:bg-[#1E3B38] hover:text-white px-3 py-1.5 rounded transition"
                        >
                          Inspect Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Guest Deep Inspection Modal/Card */}
          {selectedGuestView && (
            <div className="bg-[#1E3B38] text-white rounded-3xl p-6 sm:p-8 border border-[#B8912F] shadow-2xl animate-in fade-in duration-200">
              <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B8912F] font-bold block">Detailed Record Inspection</span>
                  <h3 className="font-serif text-3xl font-bold">{selectedGuestView.name}</h3>
                  <p className="text-xs text-gray-300 font-sans mt-0.5">Unique Link ID: <code>{selectedGuestView.id}</code></p>
                </div>
                <button
                  onClick={() => setSelectedGuestView(null)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-bold uppercase"
                >
                  Close Detail
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#B8912F]">Personalized Welcome Note</h4>
                  <p className="text-sm font-serif italic text-gray-200 leading-relaxed">
                    “{selectedGuestView.welcomeNote}”
                  </p>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-gray-400">
                    <span>Hieroglyphs: <span className="text-[#B8912F] font-serif text-sm">{selectedGuestView.hieroglyphs}</span></span>
                    <span>Role: {selectedGuestView.role.toUpperCase()}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <h4 className="font-serif text-lg font-bold text-[#B8912F]">Intake Registry & Dietary Preferences</h4>
                  {selectedGuestView.intakeData ? (
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Arrival Flight:</span>
                        <span className="font-bold">{selectedGuestView.intakeData.arrivalAirline} {selectedGuestView.intakeData.arrivalFlightNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Departure Flight:</span>
                        <span className="font-bold">{selectedGuestView.intakeData.departureAirline} {selectedGuestView.intakeData.departureFlightNumber}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Drink Likes/Dislikes:</span>
                        <span className="text-right max-w-[200px]">{selectedGuestView.intakeData.drinkFavorites} / <span className="text-amber-400">{selectedGuestView.intakeData.drinkDislikes}</span></span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Food Likes/Dislikes:</span>
                        <span className="text-right max-w-[200px]">{selectedGuestView.intakeData.foodFavorites} / <span className="text-amber-400">{selectedGuestView.intakeData.foodDislikes}</span></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Allergies Logged:</span>
                        <span className="font-bold text-red-300">{selectedGuestView.intakeData.allergies}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic py-4">This guest has not submitted their intake form yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF6EE] p-4 border-t border-[#E8DCC8] flex items-center justify-between text-xs text-gray-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Host Access • Private VIP Expedition Portal</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#1E3B38] hover:bg-[#1E3B38]/90 text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider transition"
          >
            Close Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
