import React, { useState, useEffect } from 'react';
import { PageId, GuestVariant, IntakeFormSubmission } from '../../types';
import { Send, CheckCircle2, Plane, Utensils, Wine, AlertTriangle, ShieldCheck, Sparkles, ArrowRight, RefreshCw, Eye } from 'lucide-react';

interface IntakeFormPageProps {
  guest: GuestVariant;
  onNavigate: (page: PageId) => void;
  onSubmitForm: (submission: IntakeFormSubmission) => void;
  isAdminMode: boolean;
}

export const IntakeFormPage: React.FC<IntakeFormPageProps> = ({
  guest,
  onNavigate,
  onSubmitForm
}) => {
  const [formData, setFormData] = useState({
    arrivalDay: guest.intakeData?.arrivalDay || 'Monday, Jan 12, 2026',
    arrivalAirline: guest.intakeData?.arrivalAirline || '',
    arrivalFlightNumber: guest.intakeData?.arrivalFlightNumber || '',
    departureDay: guest.intakeData?.departureDay || 'Wednesday, Jan 21, 2026',
    departureAirline: guest.intakeData?.departureAirline || '',
    departureFlightNumber: guest.intakeData?.departureFlightNumber || '',
    drinkFavorites: guest.intakeData?.drinkFavorites || '',
    drinkDislikes: guest.intakeData?.drinkDislikes || '',
    foodFavorites: guest.intakeData?.foodFavorites || '',
    foodDislikes: guest.intakeData?.foodDislikes || '',
    allergies: guest.intakeData?.allergies || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(guest.submittedForm);

  // Sync state when switching guest persona
  useEffect(() => {
    setIsSuccess(guest.submittedForm);
    if (guest.intakeData) {
      setFormData({
        arrivalDay: guest.intakeData.arrivalDay,
        arrivalAirline: guest.intakeData.arrivalAirline,
        arrivalFlightNumber: guest.intakeData.arrivalFlightNumber,
        departureDay: guest.intakeData.departureDay,
        departureAirline: guest.intakeData.departureAirline,
        departureFlightNumber: guest.intakeData.departureFlightNumber,
        drinkFavorites: guest.intakeData.drinkFavorites,
        drinkDislikes: guest.intakeData.drinkDislikes,
        foodFavorites: guest.intakeData.foodFavorites,
        foodDislikes: guest.intakeData.foodDislikes,
        allergies: guest.intakeData.allergies
      });
    } else {
      setFormData({
        arrivalDay: 'Monday, Jan 12, 2026',
        arrivalAirline: '',
        arrivalFlightNumber: '',
        departureDay: 'Wednesday, Jan 21, 2026',
        departureAirline: '',
        departureFlightNumber: '',
        drinkFavorites: '',
        drinkDislikes: '',
        foodFavorites: '',
        foodDislikes: '',
        allergies: ''
      });
    }
  }, [guest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newSub: IntakeFormSubmission = {
        guestId: guest.id,
        guestName: guest.name,
        arrivalDay: formData.arrivalDay,
        arrivalAirline: formData.arrivalAirline || 'Private/TBD',
        arrivalFlightNumber: formData.arrivalFlightNumber || 'TBD',
        departureDay: formData.departureDay,
        departureAirline: formData.departureAirline || 'Private/TBD',
        departureFlightNumber: formData.departureFlightNumber || 'TBD',
        drinkFavorites: formData.drinkFavorites || 'No preferences noted',
        drinkDislikes: formData.drinkDislikes || 'None',
        foodFavorites: formData.foodFavorites || 'No preferences noted',
        foodDislikes: formData.foodDislikes || 'None',
        allergies: formData.allergies || 'None',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      onSubmitForm(newSub);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2B2620] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B5673E] font-semibold block mb-2">
            Exclusive Expedition • Guest Registry
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3B38] mb-3">
            Information We Need From You
          </h1>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Please complete this quick form for <strong>{guest.name}</strong>. Your arrival and departure flight details allow our VIP concierge to arrange your jet-bridge meet & greet and chauffeured limousine transfers in Cairo and Aswan.
          </p>
        </div>

        {/* SUCCESS CONFIRMATION BANNER */}
        {isSuccess ? (
          <div className="bg-[#1E3B38] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#B8912F] text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8912F] font-bold block mb-1">
                ✦ RSVP Confirmed ✦
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                Thank You, {guest.shortName}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-sans mt-3 max-w-lg mx-auto leading-relaxed">
                Your travel information and dietary preferences have been securely submitted to Josh Earl’s Host Dashboard. All private transfers and customized dining menus for your stay at The St. Regis and onboard the Dahabiya Al Mourad will be tailored accordingly.
              </p>
            </div>

            <div className="bg-[#FAF6EE]/10 border border-white/10 rounded-2xl p-6 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 uppercase tracking-wider">Arrival Flight:</span>
                <span className="font-bold text-[#B8912F]">{formData.arrivalAirline} {formData.arrivalFlightNumber} ({formData.arrivalDay})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 uppercase tracking-wider">Departure Flight:</span>
                <span className="font-bold text-[#B8912F]">{formData.departureAirline} {formData.departureFlightNumber} ({formData.departureDay})</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400 uppercase tracking-wider">Food & Drink Favorites:</span>
                <span className="font-medium text-white max-w-[200px] text-right truncate">{formData.foodFavorites || 'None specified'} / {formData.drinkFavorites || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase tracking-wider">Allergies Logged:</span>
                <span className="font-bold text-emerald-300">{formData.allergies || 'None reported'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Edit My Responses
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="bg-[#B8912F] hover:bg-[#B8912F]/90 text-[#2B2620] px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-1.5"
              >
                <span>Return to Landing Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* FORM BODY (Gravity Forms / WPForms Elementor Simulator) */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E8DCC8] shadow-xl p-6 sm:p-10 space-y-10">
            {/* Guest Badge */}
            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E8DCC8] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E3B38] text-[#B8912F] flex items-center justify-center font-serif font-bold text-lg">
                  {guest.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B5673E] tracking-wider block">Invitee Record</span>
                  <span className="font-serif text-lg font-bold text-[#1E3B38]">{guest.name}</span>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-mono hidden sm:inline">ID: {guest.id}</span>
            </div>

            {/* SECTION 9.1: Travel Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#E8DCC8] pb-3 text-[#1E3B38]">
                <Plane className="w-5 h-5 text-[#B8912F]" />
                <h3 className="font-serif text-2xl font-bold">9.1 Travel Information</h3>
              </div>

              {/* Arrival Details */}
              <div className="bg-[#FAF6EE]/50 p-5 rounded-2xl border border-[#E8DCC8] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] flex items-center gap-1.5">
                  <span>🛬 Arrival in Cairo (CAI)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Arrival Day
                    </label>
                    <select
                      name="arrivalDay"
                      value={formData.arrivalDay}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    >
                      <option value="Monday, Jan 12, 2026">Mon, Jan 12, 2026 (Group Day 1)</option>
                      <option value="Sunday, Jan 11, 2026">Sun, Jan 11, 2026 (Early Arrival)</option>
                      <option value="Tuesday, Jan 13, 2026">Tue, Jan 13, 2026 (Late Arrival)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Airline Name
                    </label>
                    <input
                      type="text"
                      name="arrivalAirline"
                      placeholder="e.g. British Airways, Emirates, Delta"
                      value={formData.arrivalAirline}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Flight Number & Time
                    </label>
                    <input
                      type="text"
                      name="arrivalFlightNumber"
                      placeholder="e.g. BA 154 at 14:30"
                      value={formData.arrivalFlightNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    />
                  </div>
                </div>
              </div>

              {/* Departure Details */}
              <div className="bg-[#FAF6EE]/50 p-5 rounded-2xl border border-[#E8DCC8] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3B38] flex items-center gap-1.5">
                  <span>🛫 Departure from Aswan (ASW) or Cairo (CAI)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Departure Day
                    </label>
                    <select
                      name="departureDay"
                      value={formData.departureDay}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    >
                      <option value="Wednesday, Jan 21, 2026">Wed, Jan 21, 2026 (Group Day 10)</option>
                      <option value="Thursday, Jan 22, 2026">Thu, Jan 22, 2026 (Extended Stay)</option>
                      <option value="Friday, Jan 23, 2026">Fri, Jan 23, 2026 (Extended Stay)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Airline Name
                    </label>
                    <input
                      type="text"
                      name="departureAirline"
                      placeholder="e.g. Lufthansa, EgyptAir, Air France"
                      value={formData.departureAirline}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Flight Number & Time
                    </label>
                    <input
                      type="text"
                      name="departureFlightNumber"
                      placeholder="e.g. LH 581 at 18:45"
                      value={formData.departureFlightNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-[#E8DCC8] rounded-lg px-3 py-2 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 9.2: Preferences / Allergies */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#E8DCC8] pb-3 text-[#1E3B38]">
                <Utensils className="w-5 h-5 text-[#B8912F]" />
                <h3 className="font-serif text-2xl font-bold">9.2 Preferences & Allergies</h3>
              </div>
              <p className="text-xs text-gray-600 font-sans">
                Our private chefs at Al Moudira, The St. Regis, and onboard the Dahabiya Al Mourad will customize menus to your exact taste profile.
              </p>

              {/* Drinks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3B38] flex items-center gap-1.5">
                    <Wine className="w-4 h-4 text-[#B8912F]" /> Drink Favorites
                  </label>
                  <textarea
                    name="drinkFavorites"
                    rows={2}
                    placeholder="e.g. Dry Martini, Pinot Noir, Mint Tea, Sparkling water with lime"
                    value={formData.drinkFavorites}
                    onChange={handleChange}
                    className="w-full bg-[#FAF6EE] border border-[#E8DCC8] rounded-xl p-3 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Wine className="w-4 h-4 text-gray-400" /> Drink Dislikes
                  </label>
                  <textarea
                    name="drinkDislikes"
                    rows={2}
                    placeholder="e.g. No sugary cocktails, no gin, no tonic"
                    value={formData.drinkDislikes}
                    onChange={handleChange}
                    className="w-full bg-[#FAF6EE] border border-[#E8DCC8] rounded-xl p-3 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                  />
                </div>
              </div>

              {/* Foods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3B38] flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-[#B8912F]" /> Food Favorites
                  </label>
                  <textarea
                    name="foodFavorites"
                    rows={2}
                    placeholder="e.g. Grilled seafood, lamb chops, Mediterranean mezze, fresh salads"
                    value={formData.foodFavorites}
                    onChange={handleChange}
                    className="w-full bg-[#FAF6EE] border border-[#E8DCC8] rounded-xl p-3 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-gray-400" /> Food Dislikes
                  </label>
                  <textarea
                    name="foodDislikes"
                    rows={2}
                    placeholder="e.g. No cilantro/coriander, no heavy cream sauces, no oysters"
                    value={formData.foodDislikes}
                    onChange={handleChange}
                    className="w-full bg-[#FAF6EE] border border-[#E8DCC8] rounded-xl p-3 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-[#B8912F]"
                  />
                </div>
              </div>

              {/* Allergies (Critical) */}
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Dietary Allergies & Medical Sensitivities
                </label>
                <input
                  type="text"
                  name="allergies"
                  placeholder="e.g. Peanut allergy, Shellfish sensitivity, Gluten free / Celiac, Lactose intolerant, or None"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full bg-white border border-red-300 rounded-xl p-3 text-xs font-sans text-[#2B2620] focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold text-red-900 placeholder-red-400"
                />
                <span className="text-[11px] text-red-700 block">
                  * If you have no allergies, simply type "None". Our chefs will be briefed before your arrival.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E8DCC8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-sans flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your privacy is protected. Data is accessible solely by Josh Earl.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#1E3B38] hover:bg-[#1E3B38]/90 text-[#FAF6EE] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2 border border-[#B8912F]/40"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Submitting to Host Dashboard...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#B8912F]" />
                    <span>Submit Travel Information</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
