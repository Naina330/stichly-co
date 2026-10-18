import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  ShieldCheck,
  Camera,
  Heart,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Sliders,
  CreditCard,
  Lock,
  Send,
  Bot,
  Smartphone,
  Building,
  DollarSign
} from 'lucide-react';
import { FoundersSection } from '../components/FoundersSection';
import { AboutSection } from '../components/AboutSection';

export const HomePage: React.FC = () => {
  const {
    setCurrentView,
    tailors,
    galleryItems,
    reviews,
    selectedCity,
    setSelectedCity,
    setSelectedTailorId,
    setActiveAttireFilter,
    toggleSaveDesign,
    currentCustomer,
    openAIAssistWithPrompt,
    setIsAIAssistOpen,
    transactions,
    orders,
    setPaymentModalOrder
  } = useApp();

  // AI Assist Quick State
  const [quickAiPrompt, setQuickAiPrompt] = useState<string>('');
  const [quickAiResponse, setQuickAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const handleHomeAiSubmit = async (customPrompt?: string) => {
    const prompt = customPrompt || quickAiPrompt;
    if (!prompt.trim() || isAiLoading) return;

    setIsAiLoading(true);
    setQuickAiResponse(null);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          userRole: 'CUSTOMER',
          context: {
            clientName: currentCustomer.name,
            clientCity: currentCustomer.city
          }
        })
      });
      const data = await res.json();
      setQuickAiResponse(data.reply);
    } catch (err) {
      setQuickAiResponse(
        `Atelier Concierge: For "${prompt}", we recommend choosing pure Raw Silk or Banarasi Brocade for royal Indian silhouettes, or 130s Merino Wool for Western suits. Request bespoke quotes in ₹ directly through our verified masters.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Filter tailors nearby if specific city selected
  const nearbyTailors = selectedCity === 'All Cities'
    ? tailors.slice(0, 3)
    : tailors.filter((t) => t.city.toLowerCase() === selectedCity.toLowerCase());

  const featuredTailors = tailors.slice(0, 3);
  const trendingDesigns = galleryItems.slice(0, 4);

  return (
    <div className="bg-[#120B08] text-[#F4ECE1]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 sm:py-32 border-b border-[#331C10]">
        {/* Background Image with Dark Chocolate Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Indian Bespoke Atelier"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.1] scale-105 transform motion-safe:animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120B08] via-[#120B08]/70 to-[#120B08]/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#120B08]/60 to-[#120B08]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle gold badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C1910]/90 border border-[#D4AF37]/40 text-[#E5C378] text-xs font-semibold tracking-widest uppercase mb-8 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Luxury Bespoke Tailoring Marketplace • India</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF7E8] leading-[1.15] mb-6">
            Your Style. Your Tailor.{' '}
            <span className="block italic gold-gradient-text">Your Creation.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#D8C9B5] font-light leading-relaxed mb-10">
            Discover skilled local tailors, customize your own designs, and turn your ideas into beautifully crafted clothing.
          </p>

          {/* Core Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 max-w-2xl mx-auto">
            <button
              onClick={() => setCurrentView('TAILORS')}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:from-[#D4AF37] hover:to-[#B8911C] text-[#120B08] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
              <span>Find a Tailor</span>
            </button>

            <button
              onClick={() => setCurrentView('DESIGN_STUDIO')}
              className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#2D180F]/90 hover:bg-[#3D2214] text-[#FFF7E8] font-semibold text-xs uppercase tracking-widest border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#D4AF37]" />
              <span>Create Your Design</span>
            </button>

            <button
              onClick={() => setIsAIAssistOpen(true)}
              className="w-full sm:w-auto px-5 py-3.5 rounded bg-[#1F120B] hover:bg-[#2C1910] text-[#E5C378] hover:text-[#FFF] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              title="Open Stichly AI Bespoke Fashion Concierge"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>✦ AI Concierge</span>
            </button>

            <button
              onClick={() => setCurrentView('TRANSACTIONS')}
              className="w-full sm:w-auto px-4 py-3.5 rounded bg-transparent hover:bg-[#20120B] text-[#D8C9B5] hover:text-[#FFF] font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Escrow Pay</span>
            </button>
          </div>

          {/* Quick Pillars */}
          <div className="mt-16 pt-8 border-t border-[#331C10]/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#2A170E] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#FFF]">Direct Karigars</div>
                <div className="text-[#9E8E7C] text-[11px]">No middleman markup</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#2A170E] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
                <span className="font-serif font-bold text-sm">₹</span>
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#FFF]">Price Negotiation</div>
                <div className="text-[#9E8E7C] text-[11px]">Fair pricing in INR (₹)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#2A170E] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#FFF]">AI Design Scanner</div>
                <div className="text-[#9E8E7C] text-[11px]">Deconstruct any photo</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#2A170E] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#FFF]">Fitting Trials</div>
                <div className="text-[#9E8E7C] text-[11px]">Guaranteed drape & fit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW STICHLY&CO. WORKS */}
      <section className="py-20 bg-[#160D08] border-b border-[#331C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              The Bespoke Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
              How STICHLY&CO. Works
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-4" />
            <p className="text-sm text-[#A89885]">
              Customer discovers tailor → explores tailor's portfolio → creates/selects design → communicates with tailor → negotiates price → confirms order → tailoring/stitching → fitting → delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Discover or Create',
                desc: 'Explore India’s finest regional ateliers or build your unique garment from scratch in our Design Studio with AI scan assistance.'
              },
              {
                step: '02',
                title: 'Private Discussion',
                desc: 'Chat directly with the master karigar, share inspiration pictures, specify fabrics (Silk, Wool, Linen), and body measurements.'
              },
              {
                step: '03',
                title: 'Price Negotiation (₹)',
                desc: 'Receive atelier quotes in Indian Rupees. Counter-offer politely, negotiate terms, and lock the final agreed price.'
              },
              {
                step: '04',
                title: 'Trial & Delivery',
                desc: 'Track cutting, muslin canvas basting, and fitting trials on our 12-stage progress tracker until doorstep delivery.'
              }
            ].map((st, i) => (
              <div
                key={i}
                className="bg-[#1C100A] border border-[#3D2415] hover:border-[#D4AF37]/50 rounded-xl p-6 transition-all duration-300 relative group"
              >
                <div className="font-mono text-3xl font-bold text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors mb-4">
                  {st.step}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">{st.title}</h3>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2B. STICHLY AI ASSIST SPOTLIGHT SECTION */}
      <section className="py-20 bg-[#120B08] border-b border-[#331C10] relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>AI Fashion Concierge & Sizing Intelligence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
              Stichly AI Assist
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-4" />
            <p className="text-sm text-[#A89885] font-light">
              Your 24/7 bespoke consultant for royal Indian & Western silhouettes, luxury textile wisdom, precision measurement sizing, and polite negotiation in Indian Rupees (₹).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Interactive Console (7 Cols) */}
            <div className="lg:col-span-7 bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#2C1910] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2E1A10] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#FFF]">Try Stichly AI Concierge</h3>
                      <p className="text-[11px] text-[#A89885]">Instant bespoke recommendations powered by Gemini</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/30 font-semibold">
                    Live 24/7
                  </span>
                </div>

                {/* Prompt suggestions chips */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                    Popular Bespoke Questions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Recommend a royal winter Sherwani color & fabric",
                      "How do I negotiate politely in ₹ with a master tailor?",
                      "Compare Banarasi Katan Silk vs Raw Silk drape",
                      "How to measure chest & shoulder accurately at home?"
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuickAiPrompt(p);
                          handleHomeAiSubmit(p);
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-[#24130A] hover:bg-[#351C10] text-[#D8C9B5] hover:text-[#FFF] border border-[#3E2415] hover:border-[#D4AF37]/50 transition-colors cursor-pointer text-left"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Query Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={quickAiPrompt}
                    onChange={(e) => setQuickAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleHomeAiSubmit()}
                    placeholder="Ask about fabrics, styling, silhouettes, or tailor negotiations..."
                    className="w-full bg-[#120B08] border border-[#3E2415] focus:border-[#D4AF37] rounded-xl px-4 py-3.5 pr-24 text-xs text-[#FFF] placeholder-[#6E5D4C] focus:outline-none"
                  />
                  <button
                    onClick={() => handleHomeAiSubmit()}
                    disabled={isAiLoading || !quickAiPrompt.trim()}
                    className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 disabled:opacity-50 text-[#120B08] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    {isAiLoading ? (
                      <span className="animate-spin text-xs">⟳</span>
                    ) : (
                      <>
                        <span>Ask AI</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>

                {/* AI Response Preview */}
                {quickAiResponse ? (
                  <div className="p-4 bg-[#140C08] rounded-xl border border-[#3D2619] text-xs text-[#EADFCF] leading-relaxed animate-in fade-in space-y-2">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Concierge Recommendation</span>
                    </div>
                    <div className="whitespace-pre-line text-xs font-light">{quickAiResponse}</div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#140C08]/50 rounded-xl border border-[#2A160E] text-xs text-[#8C7A68] italic">
                    Tip: Ask about Banarasi brocades, sizing guides, or polite negotiation tactics in ₹ to see instant expert advice.
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-[#29160E] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-[#A6947D]">
                  Need full dialogue? Open the dedicated AI workspace.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAIAssistOpen(true)}
                    className="px-3 py-2 rounded bg-[#2A170E] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] border border-[#D4AF37]/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Open Floating Concierge</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('ASSISTANT')}
                    className="px-4 py-2 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-xs font-bold text-[#120B08] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Full AI Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Feature Highlights (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="p-5 bg-[#1A0F0A] border border-[#3E2415] rounded-xl space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#2E1A10] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-2">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#FFF]">AI Visual Design Scanner</h4>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Upload any photo from Instagram, Pinterest, or bridal fashion weeks. Our vision AI breaks down the silhouette, fabric recommendations, and embroidery details for your tailor.
                </p>
                <button
                  onClick={() => setCurrentView('SCANNER')}
                  className="text-xs text-[#D4AF37] font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Launch AI Scanner</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-5 bg-[#1A0F0A] border border-[#3E2415] rounded-xl space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#2E1A10] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-2">
                  <span className="font-serif font-bold text-sm">₹</span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#FFF]">Price Negotiation Coach</h4>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Tailors price their work based on hand-stitching hours and complexity. Stichly AI helps you counter-offer fairly in INR without disrespecting artisan heritage.
                </p>
              </div>

              <div className="p-5 bg-[#1A0F0A] border border-[#3E2415] rounded-xl space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#2E1A10] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-2">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#FFF]">Bespoke Measurement Sizing</h4>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Save unlimited measurement profiles for weddings, black-tie galas, and festive kurtas. Get tailored checklists for shoulder, bicep, and inseam accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEPARATE MEN AND WOMEN DISCOVERY CARDS */}
      <section className="py-20 bg-[#120B08] border-b border-[#331C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Distinct Bespoke Worlds
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF7E8] mt-1">
                Explore by Wardrobe
              </h2>
            </div>
            <p className="text-xs text-[#A89885] max-w-md mt-2 md:mt-0 font-light">
              Indian heritage wear and sharp Western bespoke tailored to perfection. Clear separation for effortless discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MEN Bespoke Portal Card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#442817] group h-[420px] shadow-2xl flex flex-col justify-end p-8">
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=80"
                alt="Men Bespoke"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B08] via-[#120B08]/60 to-transparent" />

              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Men's Atelier
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#FFF7E8] mt-1 mb-2">
                  Gentlemen's Bespoke
                </h3>
                <p className="text-xs text-[#D8C9B5] max-w-md mb-6 font-light">
                  Royal Bandhgalas, Handloom Sherwanis, Belgian Linen Nehru Jackets, Savile-style Tuxedos, and Made-to-Measure Suits.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setActiveAttireFilter({ gender: 'Men', attireType: 'Indian' });
                      setCurrentView('MEN');
                    }}
                    className="px-4 py-2 rounded bg-[#3B2213] hover:bg-[#4E2E1A] text-xs font-semibold text-[#FFF] border border-[#D4AF37]/40 transition-colors"
                  >
                    Men's Indian Wear →
                  </button>
                  <button
                    onClick={() => {
                      setActiveAttireFilter({ gender: 'Men', attireType: 'Western' });
                      setCurrentView('MEN');
                    }}
                    className="px-4 py-2 rounded bg-[#20120B] hover:bg-[#331C10] text-xs font-semibold text-[#D8C9B5] border border-[#3E2415] transition-colors"
                  >
                    Men's Western Wear →
                  </button>
                </div>
              </div>
            </div>

            {/* WOMEN Bespoke Portal Card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#442817] group h-[420px] shadow-2xl flex flex-col justify-end p-8">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                alt="Women Bespoke"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B08] via-[#120B08]/60 to-transparent" />

              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Women's Atelier
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#FFF7E8] mt-1 mb-2">
                  Haute Couture & Heritage
                </h3>
                <p className="text-xs text-[#D8C9B5] max-w-md mb-6 font-light">
                  Bridal Zardozi Lehengas, Architectural Saree Blouses, Awadhi Chikankari Anarkalis, Draped Indo-Western Gowns.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setActiveAttireFilter({ gender: 'Women', attireType: 'Indian' });
                      setCurrentView('WOMEN');
                    }}
                    className="px-4 py-2 rounded bg-[#3B2213] hover:bg-[#4E2E1A] text-xs font-semibold text-[#FFF] border border-[#D4AF37]/40 transition-colors"
                  >
                    Women's Indian Wear →
                  </button>
                  <button
                    onClick={() => {
                      setActiveAttireFilter({ gender: 'Women', attireType: 'Western' });
                      setCurrentView('WOMEN');
                    }}
                    className="px-4 py-2 rounded bg-[#20120B] hover:bg-[#331C10] text-xs font-semibold text-[#D8C9B5] border border-[#3E2415] transition-colors"
                  >
                    Women's Western Wear →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BESPOKE MASTERS (TAILORS) */}
      <section className="py-20 bg-[#160D08] border-b border-[#331C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Master Artisans of India
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF7E8] mt-1">
                Featured Ateliers
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('TAILORS')}
              className="text-xs text-[#E5C378] hover:text-[#FFF] font-semibold flex items-center gap-1.5 mt-2 sm:mt-0 transition-colors cursor-pointer"
            >
              <span>View All Masters in India</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTailors.map((tailor) => (
              <div
                key={tailor.id}
                className="bg-[#1C100A] border border-[#442817] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Atelier Cover */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={tailor.coverImage}
                      alt={tailor.atelierName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C100A] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#120B08]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] text-[#E5C378] font-bold border border-[#D4AF37]/30 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>{tailor.rating}</span>
                      <span className="text-[#8C7A68]">({tailor.reviewCount})</span>
                    </div>
                  </div>

                  {/* Tailor Info */}
                  <div className="p-6 -mt-8 relative z-10">
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
                        <p className="text-xs text-[#A89885]">{tailor.name} • {tailor.yearsExperience} yrs exp</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#D8C9B5] mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{tailor.city} ({tailor.locality})</span>
                    </div>

                    <p className="text-xs text-[#BAA995] line-clamp-2 mb-4 leading-relaxed font-light">
                      {tailor.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tailor.specialties.slice(0, 3).map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-[#2A170F] text-[#E5C378] text-[10px] font-medium border border-[#3E2415]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t border-[#2C1910]">
                      <div>
                        <span className="text-[#8A7969] text-[10px] block">Starting Quote</span>
                        <span className="font-serif text-base font-bold text-[#FFF]">
                          ₹{tailor.startingPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#8A7969] text-[10px] block">Turnaround</span>
                        <span className="text-[#D8C9B5] font-medium">{tailor.turnaroundDays}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedTailorId(tailor.id);
                      setCurrentView('TAILOR_PROFILE');
                    }}
                    className="flex-1 py-2.5 rounded bg-[#341F13] hover:bg-[#462B1B] text-xs font-semibold text-[#FFF] text-center border border-[#D4AF37]/30 transition-colors cursor-pointer"
                  >
                    View Atelier
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTailorId(tailor.id);
                      setCurrentView('DESIGN_STUDIO');
                    }}
                    className="flex-1 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-xs font-bold text-[#120B08] text-center transition-colors cursor-pointer"
                  >
                    Request Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISUAL AI DESIGN SCANNER HIGHLIGHT BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#140C08] to-[#1C100A] border-b border-[#331C10] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#24140D] border border-[#52331F] rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A2214] text-[#E5C378] text-[11px] font-semibold tracking-wider uppercase rounded-full mb-4 border border-[#D4AF37]/30">
                <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Camera & Image Upload Feature</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF7E8] mb-4">
                Visual Design Scanner
              </h2>
              <p className="text-sm text-[#D8C9B5] leading-relaxed mb-6 font-light">
                Seen an outfit online, in an editorial magazine, or at a festive celebration? Snap or upload a photo. Our scanner extracts garment silhouettes, fabric suggestions, and visible tailoring details to instantly brief your tailor.
              </p>
              <div className="text-[11px] text-[#A6947D] italic mb-6">
                *Design understanding only. Body measurements are approximations requiring tailor verification.
              </div>
              <button
                onClick={() => setCurrentView('SCANNER')}
                className="px-6 py-3.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Launch Visual Scanner</span>
              </button>
            </div>

            <div className="w-full lg:w-96 bg-[#160D08] border border-[#3E2415] rounded-xl p-5 text-xs text-[#D8C9B5] shadow-xl">
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                Example Deconstruction
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Garment Type:</span>
                  <span className="font-medium text-[#FFF]">Royal Velvet Bandhgala</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Silhouette:</span>
                  <span className="font-medium text-[#FFF]">Structured Jodhpuri Cut</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Recommended Fabric:</span>
                  <span className="font-medium text-[#FFF]">Crushed Silk Velvet + Wool Canvas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2C1910]">
                  <span className="text-[#8C7A68]">Visible Details:</span>
                  <span className="font-medium text-[#FFF]">Mandarin collar, hammered brass buttons</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8C7A68]">Est. Bespoke Quote:</span>
                  <span className="font-serif font-bold text-[#E5C378]">₹7,500 - ₹9,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING DESIGNS & LOOKBOOK */}
      <section className="py-20 bg-[#120B08] border-b border-[#331C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                Lookbook Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF7E8] mt-1">
                Trending Bespoke Creations
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('DESIGN_GALLERY')}
              className="text-xs text-[#E5C378] hover:text-[#FFF] font-semibold flex items-center gap-1.5 mt-2 sm:mt-0 transition-colors cursor-pointer"
            >
              <span>Explore Entire Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDesigns.map((item) => {
              const isSaved = currentCustomer.savedDesignIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-[#1C100A] border border-[#3E2415] rounded-xl overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C100A] via-transparent to-transparent opacity-80" />

                    <button
                      onClick={() => toggleSaveDesign(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#140C08]/80 text-[#FFF] hover:text-[#D4AF37] transition-colors"
                      title={isSaved ? 'Remove from saved' : 'Save to My Inspirations'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#2A170F]/90 text-[#E5C378] text-[10px] font-semibold border border-[#3E2415]">
                        {item.gender} • {item.attireType}
                      </span>
                      <span className="font-serif text-sm font-bold text-[#FFF]">
                        From ₹{item.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#FFF7E8] line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#A89885] mb-2">
                        Atelier: <span className="text-[#D8C9B5]">{item.atelierName}</span> ({item.city})
                      </p>
                      <p className="text-[11px] text-[#8C7A68] line-clamp-1">
                        Fabric: {item.fabric}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#2C1910] flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTailorId(item.tailorId);
                          setCurrentView('DESIGN_STUDIO');
                        }}
                        className="w-full py-2 rounded bg-[#351F14] hover:bg-[#462B1B] text-xs font-semibold text-[#E5C378] text-center border border-[#D4AF37]/30 transition-colors cursor-pointer"
                      >
                        Request Similar Design
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CLIENT BOOK OF RECORDS (REVIEWS) */}
      <section className="py-20 bg-[#160D08] border-b border-[#331C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Authentic Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
              Client Book of Records
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-4" />
            <p className="text-xs text-[#A89885] italic font-serif">
              *Sample prototype records showcasing real bespoke tailoring reviews and 5-pillar craftsman grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#1C100A] border border-[#3E2415] rounded-xl p-6 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8C7A68]">{rev.date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#FFF7E8] mb-1">
                    {rev.outfitName}
                  </h3>
                  <div className="text-[11px] text-[#D4AF37] font-medium mb-3">
                    Crafted by {rev.atelierName}
                  </div>

                  <p className="text-xs text-[#C9BAA6] leading-relaxed italic font-light mb-4">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2C1910]">
                  <div className="text-xs font-semibold text-[#FFF]">{rev.customerName}</div>
                  <div className="text-[10px] text-[#8C7A68]">{rev.customerCity} • Verified Client</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7B. SECURE ONLINE TRANSACTIONS & ESCROW VAULT SECTION */}
      <section className="py-20 bg-[#140C08] border-b border-[#331C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>100% Escrow Protected Bespoke Commerce</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
              Secure Online Transactions
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-4" />
            <p className="text-sm text-[#A89885] font-light">
              Never worry about upfront tailoring payments. Our RBI-compliant Escrow Vault holds funds safely until your physical trial fitting is verified and approved.
            </p>
          </div>

          {/* Three pillars of Online Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Pillar 1 */}
            <div className="p-6 bg-[#1A0F0A] border border-[#3E2415] rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2D180F] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FFF] mb-2">
                  50/50 Bespoke Escrow Split
                </h3>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Pay a 50% advance to lock in fabric cutting and karigar drafting. The remaining 50% is released only after your physical trial fitting and drape approval.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#29170E] text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero financial risk on bespoke work</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-[#1A0F0A] border border-[#3E2415] rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2D180F] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FFF] mb-2">
                  Unified Indian Payment Rails
                </h3>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Direct instant settlement via UPI 2.0 (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, Mastercard, and Net Banking across 40+ Indian scheduled banks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#29170E] text-[11px] text-[#E5C378] flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>256-bit bank grade encryption</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-[#1A0F0A] border border-[#3E2415] rounded-2xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2D180F] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#FFF] mb-2">
                  Audit Trail & GST Invoices
                </h3>
                <p className="text-xs text-[#A89885] leading-relaxed font-light">
                  Instant SAC 9988 tax invoice generation, verified payment receipts, digital QR verification, and complete ledger records for both clients and ateliers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#29170E] text-[11px] text-[#D8C9B5] flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Official GST tax compliance</span>
              </div>
            </div>
          </div>

          {/* Interactive Vault CTA Banner */}
          <div className="bg-gradient-to-r from-[#2B180E] via-[#3A2013] to-[#25130A] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Transparency & Control
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF7E8]">
                Manage Your Bespoke Escrow & Online Payments
              </h3>
              <p className="text-xs text-[#C9BAA6] max-w-xl font-light">
                View your active advances, pending balances, download official tax receipts, or complete order checkout with 1-click escrow protection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setCurrentView('TRANSACTIONS')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Go to Transactions Ledger</span>
              </button>

              <button
                onClick={() => {
                  const targetOrder = orders.find(
                    (o) => o.negotiationStatus === 'PRICE_AGREED' && o.paymentStatus !== 'FULLY_PAID'
                  ) || orders[0];
                  if (targetOrder) {
                    setPaymentModalOrder(targetOrder);
                  } else {
                    setCurrentView('TRANSACTIONS');
                  }
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#1A0F0A] hover:bg-[#28160E] text-[#E5C378] hover:text-[#FFF] font-semibold text-xs border border-[#D4AF37]/40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Pay Online (Escrow)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEET THE FOUNDERS SECTION */}
      <FoundersSection />

      {/* 9. ABOUT STICHLY&CO. SECTION */}
      <AboutSection />
    </div>
  );
};
