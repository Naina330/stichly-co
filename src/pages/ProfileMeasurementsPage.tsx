import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MeasurementProfile } from '../types';
import {
  User,
  Scissors,
  Plus,
  Trash2,
  Heart,
  Save,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  MapPin,
  Lock,
  CreditCard,
  Download
} from 'lucide-react';

export const ProfileMeasurementsPage: React.FC = () => {
  const {
    currentCustomer,
    saveMeasurementProfile,
    deleteMeasurementProfile,
    galleryItems,
    tailors,
    transactions,
    setCurrentView,
    setSelectedTailorId
  } = useApp();

  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>('Wedding Measurements Profile');
  const [gender, setGender] = useState<'Men' | 'Women'>(currentCustomer.measurementProfiles[0]?.gender || 'Women');
  const [height, setHeight] = useState<string>('5 ft 6 in');
  const [chest, setChest] = useState<string>('36 in');
  const [waist, setWaist] = useState<string>('28 in');
  const [hips, setHips] = useState<string>('38 in');
  const [shoulder, setShoulder] = useState<string>('14.5 in');
  const [sleeveLength, setSleeveLength] = useState<string>('21 in');
  const [inseam, setInseam] = useState<string>('30 in');
  const [neck, setNeck] = useState<string>('14 in');
  const [garmentLength, setGarmentLength] = useState<string>('44 in');
  const [notes, setNotes] = useState<string>('Prefers 1 inch comfort ease around bicep and armholes.');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveMeasurementProfile({
      name: profileName,
      gender,
      height,
      chest,
      waist,
      hips,
      shoulder,
      sleeveLength,
      inseam,
      neck,
      garmentLength,
      notes
    });
    setShowNewModal(false);
  };

  // Saved Designs and Favorites
  const savedDesigns = galleryItems.filter((g) => currentCustomer.savedDesignIds.includes(g.id));
  const favoriteTailors = tailors.filter((t) => currentCustomer.favoriteTailorIds.includes(t.id));

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header User Card */}
        <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 sm:p-8 mb-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentCustomer.avatar}
              alt={currentCustomer.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]"
            />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                Client Bespoke Profile
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#FFF7E8]">
                {currentCustomer.name}
              </h1>
              <p className="text-xs text-[#A89885] mt-0.5">
                {currentCustomer.city} • {currentCustomer.phone} • {currentCustomer.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Measurement Profile</span>
          </button>
        </div>

        {/* 1. MEASUREMENT PROFILES SECTION */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Saved Measurement Profiles
              </h2>
              <p className="text-xs text-[#A89885] mt-0.5">
                Accurate tailoring profiles attached to your custom orders. Tailors reference these for muslin pattern drafting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCustomer.measurementProfiles.map((prof) => (
              <div
                key={prof.id}
                className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl relative group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#2C1910] mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#FFF]">{prof.name}</h3>
                    <span className="text-[10px] text-[#D4AF37]">
                      {prof.gender} • Updated: {prof.updatedAt}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteMeasurementProfile(prof.id)}
                    className="p-1 text-[#8C7A68] hover:text-red-400 transition-colors"
                    title="Delete profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#D8C9B5] mb-4">
                  {prof.height && <div><span className="text-[10px] text-[#8C7A68] block">Height</span>{prof.height}</div>}
                  {prof.chest && <div><span className="text-[10px] text-[#8C7A68] block">Chest</span>{prof.chest}</div>}
                  {prof.waist && <div><span className="text-[10px] text-[#8C7A68] block">Waist</span>{prof.waist}</div>}
                  {prof.hips && <div><span className="text-[10px] text-[#8C7A68] block">Hips</span>{prof.hips}</div>}
                  {prof.shoulder && <div><span className="text-[10px] text-[#8C7A68] block">Shoulder</span>{prof.shoulder}</div>}
                  {prof.sleeveLength && <div><span className="text-[10px] text-[#8C7A68] block">Sleeve</span>{prof.sleeveLength}</div>}
                  {prof.neck && <div><span className="text-[10px] text-[#8C7A68] block">Neck</span>{prof.neck}</div>}
                  {prof.garmentLength && <div><span className="text-[10px] text-[#8C7A68] block">Length</span>{prof.garmentLength}</div>}
                </div>

                {prof.notes && (
                  <p className="text-[11px] text-[#A6947D] italic pt-2 border-t border-[#29170E]">
                    "{prof.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. SAVED INSPIRATIONS & FAVORITE ATELIERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#331C10]">
          {/* Saved Inspirations */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>My Inspirations ({savedDesigns.length})</span>
            </h3>

            {savedDesigns.length === 0 ? (
              <p className="text-xs text-[#8C7A68]">No saved designs yet.</p>
            ) : (
              <div className="space-y-3">
                {savedDesigns.map((des) => (
                  <div key={des.id} className="p-3 bg-[#1A0F0A] border border-[#3E2415] rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={des.imageUrl} alt={des.title} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <div className="text-xs font-bold text-[#FFF]">{des.title}</div>
                        <div className="text-[10px] text-[#A89885]">{des.atelierName} • ₹{des.startingPrice}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTailorId(des.tailorId);
                        setCurrentView('DESIGN_STUDIO');
                      }}
                      className="px-3 py-1 bg-[#2D180F] text-[#E5C378] text-xs font-semibold rounded border border-[#D4AF37]/30"
                    >
                      Draft Outfit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Tailors */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-4 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#D4AF37]" />
              <span>Favorite Tailors ({favoriteTailors.length})</span>
            </h3>

            {favoriteTailors.length === 0 ? (
              <p className="text-xs text-[#8C7A68]">No favorite tailors bookmarked.</p>
            ) : (
              <div className="space-y-3">
                {favoriteTailors.map((t) => (
                  <div key={t.id} className="p-3 bg-[#1A0F0A] border border-[#3E2415] rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
                      <div>
                        <div className="text-xs font-bold text-[#FFF]">{t.atelierName}</div>
                        <div className="text-[10px] text-[#A89885]">{t.city} • {t.rating} ★</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTailorId(t.id);
                        setCurrentView('TAILOR_PROFILE');
                      }}
                      className="px-3 py-1 bg-[#2D180F] text-[#E5C378] text-xs font-semibold rounded border border-[#D4AF37]/30"
                    >
                      View Atelier
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal for Adding Measurement Profile */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1C100A] border border-[#52331F] rounded-xl max-w-xl w-full p-6 text-[#EADFCF] shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-2xl font-bold text-[#FFF7E8] mb-1">
                Add Measurement Profile
              </h3>
              <p className="text-xs text-[#A89885] mb-4">
                Enter your body dimensions. Tailors use these for pattern drafting and initial fittings.
              </p>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Profile Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Height</label>
                    <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Chest / Bust</label>
                    <input type="text" value={chest} onChange={(e) => setChest(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Natural Waist</label>
                    <input type="text" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Hips</label>
                    <input type="text" value={hips} onChange={(e) => setHips(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Shoulder Width</label>
                    <input type="text" value={shoulder} onChange={(e) => setShoulder(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7A68] block mb-1">Sleeve Length</label>
                    <input type="text" value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Fitting Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 bg-[#26150D] text-xs text-[#A89885] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] text-[#120B08] text-xs font-bold rounded"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
