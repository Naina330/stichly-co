import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Heart
} from 'lucide-react';

export const TailorProfilePage: React.FC = () => {
  const {
    selectedTailorId,
    tailors,
    setCurrentView,
    setSelectedTailorId,
    startOrGetConversation,
    currentCustomer,
    toggleSaveDesign,
    openAIAssistWithPrompt
  } = useApp();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'fabrics' | 'reviews'>('portfolio');

  const tailor = tailors.find((t) => t.id === selectedTailorId) || tailors[0];

  const handleStartChat = () => {
    startOrGetConversation(currentCustomer.id, tailor.id);
    setCurrentView('CHAT');
  };

  const handleStartDesign = () => {
    setSelectedTailorId(tailor.id);
    setCurrentView('DESIGN_STUDIO');
  };

  return (
    <div className="py-8 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => setCurrentView('TAILORS')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A89885] hover:text-[#FFF] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bespoke Masters</span>
        </button>

        {/* Hero Atelier Header Card */}
        <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl overflow-hidden shadow-2xl mb-10">
          {/* Cover Photo */}
          <div className="h-64 sm:h-80 relative overflow-hidden">
            <img
              src={tailor.coverImage}
              alt={tailor.atelierName}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/40 to-transparent" />

            <div className="absolute top-4 right-4 bg-[#120B08]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 flex items-center gap-2">
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-serif text-base font-bold text-[#FFF]">{tailor.rating}</span>
              <span className="text-xs text-[#8C7A68]">({tailor.reviewCount} client reviews)</span>
            </div>
          </div>

          {/* Profile Header Details */}
          <div className="p-6 sm:p-8 -mt-16 sm:-mt-20 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2C1910]">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <img
                  src={tailor.avatar}
                  alt={tailor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#1A0F0A] ring-2 ring-[#D4AF37] shadow-2xl"
                />
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF7E8]">
                      {tailor.atelierName}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2C1910] text-[#D4AF37] text-[10px] font-semibold border border-[#D4AF37]/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Master Karigar</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A89885]">
                    {tailor.name} • {tailor.yearsExperience} Years of Bespoke Heritage
                  </p>
                  <p className="text-xs text-[#D8C9B5] mt-1 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{tailor.city} ({tailor.locality})</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-end">
                <button
                  onClick={() =>
                    openAIAssistWithPrompt(
                      `Please evaluate ${tailor.atelierName} in ${tailor.city}. What are their master specialties, starting prices in ₹, and recommended fabrics for custom tailoring?`
                    )
                  }
                  className="px-4 py-3 rounded bg-[#1C0F0A] hover:bg-[#2C1910] text-xs font-semibold text-[#E5C378] border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer shadow"
                  title="Ask AI Concierge about this atelier"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>AI Advisory</span>
                </button>

                <button
                  onClick={handleStartChat}
                  className="px-5 py-3 rounded bg-[#2D180F] hover:bg-[#3D2214] text-xs font-semibold text-[#FFF] border border-[#D4AF37]/40 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Chat & Consult</span>
                </button>

                <button
                  onClick={handleStartDesign}
                  className="px-6 py-3 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-xs font-bold text-[#120B08] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Request Custom Order</span>
                </button>
              </div>
            </div>

            {/* Atelier Highlights Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                <div className="text-[10px] uppercase text-[#8C7A68]">Starting Quote</div>
                <div className="font-serif text-lg font-bold text-[#E5C378]">
                  ₹{tailor.startingPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                <div className="text-[10px] uppercase text-[#8C7A68]">Turnaround</div>
                <div className="font-serif text-lg font-bold text-[#FFF]">
                  {tailor.turnaroundDays}
                </div>
              </div>
              <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                <div className="text-[10px] uppercase text-[#8C7A68]">Expertise</div>
                <div className="text-xs font-semibold text-[#D8C9B5] truncate">
                  {tailor.attireExpertise.join(' & ')} • {tailor.genderExpertise.join(' & ')}
                </div>
              </div>
              <div className="bg-[#140C08] p-3.5 rounded-lg border border-[#2F1B10]">
                <div className="text-[10px] uppercase text-[#8C7A68]">Craftsmanship Score</div>
                <div className="text-xs font-semibold text-[#D4AF37]">
                  {tailor.ratingBreakdown.craftsmanship} / 5.0 (Flawless)
                </div>
              </div>
            </div>

            {/* Atelier Story / Bio */}
            <div className="mt-6">
              <h3 className="font-serif text-lg font-bold text-[#FFF7E8] mb-2">About the Atelier</h3>
              <p className="text-xs sm:text-sm text-[#C9BAA6] leading-relaxed font-light">
                {tailor.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-[#331C10] mb-8 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'portfolio'
                ? 'border-[#D4AF37] text-[#E5C378]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Portfolio & Outfits ({tailor.portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'services'
                ? 'border-[#D4AF37] text-[#E5C378]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Bespoke Services & Pricing ({tailor.services.length})
          </button>
          <button
            onClick={() => setActiveTab('fabrics')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'fabrics'
                ? 'border-[#D4AF37] text-[#E5C378]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Available Fabrics ({tailor.availableFabrics.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#D4AF37] text-[#E5C378]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Client Reviews ({tailor.reviewCount})
          </button>
        </div>

        {/* Tab 1: Portfolio Outfits */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tailor.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="h-72 relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#120B08]/85 px-3 py-1 rounded text-xs text-[#E5C378] font-bold border border-[#D4AF37]/30">
                      ₹{item.priceEstimate.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#2A170F] text-[#D4AF37] border border-[#3E2415]">
                        {item.gender} • {item.attireType}
                      </span>
                      <span className="text-xs text-[#A89885]">{item.garmentType}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#C9BAA6] leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#BAA995] pt-3 border-t border-[#2C1910]">
                      <div>
                        <strong className="text-[#E5C378]">Fabric:</strong> {item.fabricUsed}
                      </div>
                      <div>
                        <strong className="text-[#E5C378]">Craft Details:</strong> {item.craftDetails}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={handleStartDesign}
                    className="w-full py-2.5 rounded bg-[#351F14] hover:bg-[#462B1B] text-xs font-semibold text-[#E5C378] text-center border border-[#D4AF37]/30 transition-colors cursor-pointer"
                  >
                    Request Similar Outfit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Services */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tailor.services.map((srv) => (
              <div
                key={srv.id}
                className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                    Bespoke Tailoring Service
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">{srv.title}</h3>
                  <p className="text-xs text-[#BAA995] leading-relaxed font-light mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C1910]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block">Starting At</span>
                      <span className="font-serif text-lg font-bold text-[#E5C378]">
                        ₹{srv.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8C7A68] block">Estimated</span>
                      <span className="text-xs text-[#FFF] font-medium">{srv.estimatedDays}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartDesign}
                    className="w-full py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-xs font-bold text-[#120B08] text-center transition-colors cursor-pointer"
                  >
                    Select Service & Draft Design
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Available Fabrics */}
        {activeTab === 'fabrics' && (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-[#FFF7E8] mb-2">
              Atelier Textile & Fabric Collection
            </h3>
            <p className="text-xs text-[#A89885] mb-6 font-light">
              Master Mohammad Riaz sources these certified handloom weaves directly from weavers in Varanasi, Chanderi, Kashmir, and Italian wool mills. You can also supply your own fabric.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tailor.availableFabrics.map((fab, idx) => (
                <div
                  key={idx}
                  className="bg-[#140C08] border border-[#321B0F] p-4 rounded-lg flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2C1910] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#FFF]">{fab}</div>
                    <div className="text-[10px] text-[#8C7A68]">In-Stock at Atelier</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Rating Breakdown Card */}
            <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-6">
                5-Pillar Craftsmanship Assessment
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                <div className="bg-[#140C08] p-3 rounded border border-[#2F1B10]">
                  <div className="text-xs text-[#A89885]">Craftsmanship</div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37] mt-1">
                    {tailor.ratingBreakdown.craftsmanship} ★
                  </div>
                </div>
                <div className="bg-[#140C08] p-3 rounded border border-[#2F1B10]">
                  <div className="text-xs text-[#A89885]">Fit & Silhouette</div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37] mt-1">
                    {tailor.ratingBreakdown.fit} ★
                  </div>
                </div>
                <div className="bg-[#140C08] p-3 rounded border border-[#2F1B10]">
                  <div className="text-xs text-[#A89885]">Communication</div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37] mt-1">
                    {tailor.ratingBreakdown.communication} ★
                  </div>
                </div>
                <div className="bg-[#140C08] p-3 rounded border border-[#2F1B10]">
                  <div className="text-xs text-[#A89885]">Price Value</div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37] mt-1">
                    {tailor.ratingBreakdown.value} ★
                  </div>
                </div>
                <div className="bg-[#140C08] p-3 rounded border border-[#2F1B10]">
                  <div className="text-xs text-[#A89885]">Delivery Punctuality</div>
                  <div className="font-serif text-xl font-bold text-[#D4AF37] mt-1">
                    {tailor.ratingBreakdown.delivery} ★
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs text-[#8C7A68]">14 September 2026</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#FFF]">Mahi Suryavanshi (Delhi)</h4>
              <p className="text-xs text-[#C9BAA6] mt-2 italic font-light leading-relaxed">
                "Master Mohammad Riaz crafted an antique velvet Bandhgala with hand-sewn canvas chest piece. The price negotiation was courteous, settling on ₹8,200. Fitting was exact on the first trial."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
