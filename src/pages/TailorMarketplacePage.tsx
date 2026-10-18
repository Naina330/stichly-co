import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_CITIES } from '../data/categories';
import {
  Scissors,
  MapPin,
  Star,
  Search,
  Filter,
  SlidersHorizontal,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const TailorMarketplacePage: React.FC = () => {
  const {
    tailors,
    setSelectedTailorId,
    setCurrentView,
    selectedCity,
    setSelectedCity,
    startOrGetConversation,
    currentCustomer
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Men' | 'Women'>('All');
  const [selectedAttire, setSelectedAttire] = useState<'All' | 'Indian' | 'Western'>('All');
  const [priceRange, setPriceRange] = useState<'All' | 'low' | 'mid' | 'high' | 'ultra'>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceAsc' | 'experience'>('recommended');

  const filteredTailors = useMemo(() => {
    return tailors.filter((t) => {
      // City filter
      if (selectedCity !== 'All Cities' && t.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesAtelier = t.atelierName.toLowerCase().includes(q);
        const matchesCity = t.city.toLowerCase().includes(q);
        const matchesSpecialty = t.specialties.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesAtelier && !matchesCity && !matchesSpecialty) return false;
      }
      // Gender filter
      if (selectedGender !== 'All' && !t.genderExpertise.includes(selectedGender as any)) {
        return false;
      }
      // Attire filter
      if (selectedAttire !== 'All' && !t.attireExpertise.includes(selectedAttire as any)) {
        return false;
      }
      // Price range
      if (priceRange === 'low' && t.startingPrice > 3500) return false;
      if (priceRange === 'mid' && (t.startingPrice < 3500 || t.startingPrice > 6000)) return false;
      if (priceRange === 'high' && (t.startingPrice < 6000 || t.startingPrice > 10000)) return false;
      if (priceRange === 'ultra' && t.startingPrice < 10000) return false;
      // Min rating
      if (t.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      return 0; // recommended
    });
  }, [tailors, selectedCity, searchQuery, selectedGender, selectedAttire, priceRange, minRating, sortBy]);

  const handleStartChat = (tailorId: string) => {
    const convId = startOrGetConversation(currentCustomer.id, tailorId);
    setCurrentView('CHAT');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-3">
            India's Master Artisans & Ateliers
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Find Bespoke Masters
          </h1>
          <p className="text-sm text-[#C9BAA6] mt-3 font-light leading-relaxed">
            Discover verified local tailors, explore their ateliers and craftsmanship, discuss custom designs, and negotiate directly in Indian Rupees (₹).
          </p>
          <div className="text-[11px] text-[#A6947D] mt-2 italic">
            *Sample/demo vendors representing authentic regional craftsmanship hubs across India.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-5 mb-10 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-[#A89885] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search atelier name, master tailor, city, or specialty (e.g. Bandhgala, Zardozi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#140C08] border border-[#3A2214] rounded-lg text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* City Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#140C08] border border-[#3A2214] rounded-lg text-xs text-[#E5C378] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1C100A] text-[#EDE4D8]">
                    {c === 'All Cities' ? '📍 All Indian Cities' : `📍 ${c}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#140C08] border border-[#3A2214] rounded-lg text-xs text-[#E5C378] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="recommended" className="bg-[#1C100A]">Recommended Masters</option>
                <option value="rating" className="bg-[#1C100A]">Highest Rated (5.0★)</option>
                <option value="priceAsc" className="bg-[#1C100A]">Starting Price: Low to High</option>
                <option value="experience" className="bg-[#1C100A]">Years of Experience</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#29170E] text-xs">
            <span className="text-[#8C7A68] text-[11px] font-semibold uppercase tracking-wider mr-2">Filters:</span>

            {/* Gender Filter Pills */}
            {(['All', 'Men', 'Women'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGender === g
                    ? 'bg-[#D4AF37] text-[#120B08] font-bold shadow'
                    : 'bg-[#22130C] text-[#C9BAA6] border border-[#3E2415] hover:border-[#D4AF37]/50'
                }`}
              >
                {g === 'All' ? 'All Genders' : `${g}'s Specialists`}
              </button>
            ))}

            <span className="text-[#4E3827] mx-1">•</span>

            {/* Attire Pills */}
            {(['All', 'Indian', 'Western'] as const).map((att) => (
              <button
                key={att}
                onClick={() => setSelectedAttire(att)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedAttire === att
                    ? 'bg-[#D4AF37] text-[#120B08] font-bold shadow'
                    : 'bg-[#22130C] text-[#C9BAA6] border border-[#3E2415] hover:border-[#D4AF37]/50'
                }`}
              >
                {att === 'All' ? 'All Attire' : `${att} Wear`}
              </button>
            ))}

            <span className="text-[#4E3827] mx-1">•</span>

            {/* Price Filter Pills */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="px-2.5 py-1 rounded bg-[#22130C] border border-[#3E2415] text-xs text-[#E5C378] focus:outline-none"
            >
              <option value="All" className="bg-[#1C100A]">Any Starting Price</option>
              <option value="low" className="bg-[#1C100A]">Under ₹3,500</option>
              <option value="mid" className="bg-[#1C100A]">₹3,500 – ₹6,000</option>
              <option value="high" className="bg-[#1C100A]">₹6,000 – ₹10,000</option>
              <option value="ultra" className="bg-[#1C100A]">₹10,000+ (Bridal / Royal)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-[#A89885] mb-6">
          <span>Showing {filteredTailors.length} Bespoke Ateliers in India</span>
          {selectedCity !== 'All Cities' && (
            <span className="text-[#D4AF37]">Filtered for {selectedCity}</span>
          )}
        </div>

        {/* Tailors Grid */}
        {filteredTailors.length === 0 ? (
          <div className="bg-[#1C100A] border border-[#3E2415] rounded-xl p-12 text-center max-w-lg mx-auto">
            <Scissors className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl text-[#FFF7E8] font-bold">No Ateliers Found</h3>
            <p className="text-xs text-[#A89885] mt-2 mb-4">
              Try adjusting your search query, price range, or selecting "All Cities".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('All Cities');
                setSelectedGender('All');
                setSelectedAttire('All');
                setPriceRange('All');
              }}
              className="px-4 py-2 bg-[#D4AF37] text-[#120B08] text-xs font-bold rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTailors.map((tailor) => (
              <div
                key={tailor.id}
                className="bg-[#1C100A] border border-[#442817] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Atelier Cover */}
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={tailor.coverImage}
                      alt={tailor.atelierName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C100A] via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 bg-[#120B08]/85 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] text-[#E5C378] font-bold border border-[#D4AF37]/30 flex items-center gap-1 shadow">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>{tailor.rating}</span>
                      <span className="text-[#8C7A68]">({tailor.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px] bg-[#120B08]/80 px-2 py-0.5 rounded text-[#D4AF37] border border-[#D4AF37]/30">
                      <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                      <span>Verified Master Karigar</span>
                    </div>
                  </div>

                  {/* Tailor Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={tailor.avatar}
                        alt={tailor.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-md flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#FFF7E8] leading-tight">
                          {tailor.atelierName}
                        </h3>
                        <p className="text-xs text-[#A89885]">{tailor.name} • {tailor.yearsExperience} Years Exp.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#D8C9B5] mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{tailor.city} • {tailor.locality}</span>
                    </div>

                    <p className="text-xs text-[#BAA995] line-clamp-2 mb-4 leading-relaxed font-light">
                      {tailor.bio}
                    </p>

                    {/* Specialties Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tailor.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-[#2A170F] text-[#E5C378] text-[10px] font-medium border border-[#3E2415]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & Turnaround */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-[#2C1910]">
                      <div>
                        <span className="text-[#8A7969] text-[10px] block">Starting Atelier Quote</span>
                        <span className="font-serif text-base font-bold text-[#FFF]">
                          ₹{tailor.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#8A7969] text-[10px] block">Turnaround</span>
                        <span className="text-[#D8C9B5] font-medium flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          <span>{tailor.turnaroundDays}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 CTAs: View Atelier, Chat, Request Custom Order */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedTailorId(tailor.id);
                        setCurrentView('TAILOR_PROFILE');
                      }}
                      className="py-2.5 rounded bg-[#2F1B10] hover:bg-[#422616] text-xs font-semibold text-[#FFF] text-center border border-[#D4AF37]/30 transition-colors cursor-pointer"
                    >
                      View Atelier
                    </button>
                    <button
                      onClick={() => handleStartChat(tailor.id)}
                      className="py-2.5 rounded bg-[#22130B] hover:bg-[#341E12] text-xs font-semibold text-[#D8C9B5] text-center border border-[#3E2415] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Chat</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTailorId(tailor.id);
                      setCurrentView('DESIGN_STUDIO');
                    }}
                    className="w-full py-2.5 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-xs font-bold text-[#120B08] text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Request Custom Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
