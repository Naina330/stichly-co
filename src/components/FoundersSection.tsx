import React from 'react';
import { Award, Compass, HeartHandshake } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#120B08] border-t border-[#331C10] relative overflow-hidden">
      {/* Subtle gold radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            The Visionaries Behind STICHLY&CO.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
            Meet the Founders
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-[#D4C6B3] text-sm sm:text-base leading-relaxed font-light">
            STICHLY&CO. was born out of a shared passion to honor India's generational tailoring masters while giving modern clients complete creative autonomy over what they wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Founder: SUNAINA */}
          <div className="bg-[#1A0F0A] border border-[#442817] hover:border-[#D4AF37]/50 rounded-xl p-8 transition-all duration-300 shadow-xl group">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
                  alt="Sunaina - Founder"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-[#140C08] p-1.5 rounded-full shadow">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block px-3 py-1 bg-[#2C1910] text-[#E5C378] text-[11px] font-semibold tracking-wider uppercase rounded-full mb-2 border border-[#D4AF37]/30">
                  Founder
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                  SUNAINA
                </h3>
                <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-3">
                  Founder & Creative Director
                </div>
                <p className="text-xs sm:text-sm text-[#C9BAA6] leading-relaxed font-light">
                  "Every garment tailored by hand carries the karigar's soul. We created STICHLY&CO. so you don't have to settle for factory mass-fashion; your personal aesthetic deserves the dignity of true master craft."
                </p>
              </div>
            </div>
          </div>

          {/* Co-Founder: SIMRAN TYAGI */}
          <div className="bg-[#1A0F0A] border border-[#442817] hover:border-[#D4AF37]/50 rounded-xl p-8 transition-all duration-300 shadow-xl group">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
                  alt="Simran Tyagi - Co-Founder"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-[#140C08] p-1.5 rounded-full shadow">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block px-3 py-1 bg-[#2C1910] text-[#E5C378] text-[11px] font-semibold tracking-wider uppercase rounded-full mb-2 border border-[#D4AF37]/30">
                  Co-Founder
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                  SIMRAN TYAGI
                </h3>
                <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium mb-3">
                  Co-Founder
                </div>
                <p className="text-xs sm:text-sm text-[#C9BAA6] leading-relaxed font-light">
                  "Transparency, direct negotiation in Indian Rupees, and respecting artisan livelihoods are our foundation. We build technology that empowers India's local ateliers to thrive on their own terms."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Philosophy Banner */}
        <div className="mt-12 max-w-4xl mx-auto bg-[#160D08]/80 border border-[#331C10] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2A170E] flex items-center justify-center text-[#D4AF37] flex-shrink-0 border border-[#D4AF37]/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#FFF7E8]">The STICHLY&CO. Artisan Promise</h4>
              <p className="text-xs text-[#B3A18C]">
                100% direct artisan payments, zero hidden middleman markups, and guaranteed fit trials.
              </p>
            </div>
          </div>
          <div className="text-xs font-serif italic text-[#D4AF37] text-center sm:text-right">
            "Masterfully Sewn. Precisely Yours."
          </div>
        </div>
      </div>
    </section>
  );
};
