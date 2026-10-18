import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { Heart, Sliders, Scissors, Search, Sparkles, Filter } from 'lucide-react';

export const DesignGalleryPage: React.FC = () => {
  const {
    galleryItems,
    toggleSaveDesign,
    currentCustomer,
    setSelectedTailorId,
    setActiveAttireFilter,
    setCurrentView
  } = useApp();

  const [selectedGender, setSelectedGender] = useState<'All' | 'Men' | 'Women'>('All');
  const [selectedAttire, setSelectedAttire] = useState<'All' | 'Indian' | 'Western'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = galleryItems.filter((item) => {
    if (selectedGender !== 'All' && item.gender !== selectedGender) return false;
    if (selectedAttire !== 'All' && item.attireType !== selectedAttire) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchAtelier = item.atelierName.toLowerCase().includes(q);
      const matchGarment = item.garmentType.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchAtelier && !matchGarment && !matchTag) return false;
    }
    return true;
  });

  const handleRequestSimilar = (item: GalleryItem) => {
    setSelectedTailorId(item.tailorId);
    setActiveAttireFilter({
      gender: item.gender,
      attireType: item.attireType,
      category: item.garmentType
    });
    setCurrentView('DESIGN_STUDIO');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Karigar Showcase</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Bespoke Lookbook Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            Explore handcrafted works published by India’s master ateliers. Save silhouettes to your inspirations or request a similar custom creation.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-4 mb-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase font-bold text-[#8C7A68]">Gender:</span>
            {(['All', 'Men', 'Women'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  selectedGender === g
                    ? 'bg-[#D4AF37] text-[#120B08] font-bold'
                    : 'bg-[#22130B] text-[#C9BAA6] border border-[#3E2415]'
                }`}
              >
                {g}
              </button>
            ))}

            <span className="text-[#3D2619] mx-1">•</span>

            <span className="text-[11px] uppercase font-bold text-[#8C7A68]">Attire:</span>
            {(['All', 'Indian', 'Western'] as const).map((att) => (
              <button
                key={att}
                onClick={() => setSelectedAttire(att)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  selectedAttire === att
                    ? 'bg-[#D4AF37] text-[#120B08] font-bold'
                    : 'bg-[#22130B] text-[#C9BAA6] border border-[#3E2415]'
                }`}
              >
                {att}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search lookbook by style, fabric, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-[#140C08] border border-[#3E2415] rounded-lg text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isSaved = currentCustomer.savedDesignIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div>
                  <div className="h-72 relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-transparent to-transparent opacity-80" />

                    <button
                      onClick={() => toggleSaveDesign(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#120B08]/80 text-[#FFF] hover:text-[#D4AF37] transition-colors"
                      title={isSaved ? 'Remove from saved' : 'Save to My Inspirations'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#2C1910] text-[#E5C378] text-[10px] font-semibold">
                        {item.gender} • {item.attireType}
                      </span>
                      <span className="font-serif text-sm font-bold text-[#FFF]">
                        From ₹{item.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-[#FFF7E8] line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A89885] mb-2">
                      Atelier: <span className="text-[#FFF] font-medium">{item.atelierName}</span> ({item.city})
                    </p>
                    <p className="text-[11px] text-[#8C7A68] mb-3">
                      Fabric: {item.fabric} • Est. {item.turnaroundDays}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-[#24130A] text-[#C2B099]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleRequestSimilar(item)}
                    className="w-full py-2.5 rounded bg-[#351F14] hover:bg-[#462B1B] text-xs font-semibold text-[#E5C378] text-center border border-[#D4AF37]/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Request Similar Design</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
