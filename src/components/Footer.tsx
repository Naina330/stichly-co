import React from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveAttireFilter, setCurrentRole } = useApp();

  return (
    <footer className="bg-[#0E0705] text-[#C9BAA6] border-t border-[#331C10] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => setCurrentView('HOME')}>
              <span className="font-brand text-2xl font-bold tracking-[0.2em] text-[#FFF7E8]">
                STICHLY&CO.
              </span>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-light mt-0.5">
                Masterfully Sewn. Precisely Yours.
              </p>
            </div>
            <p className="text-xs text-[#A89885] leading-relaxed max-w-sm font-light">
              "Connecting India's local tailoring masters with modern customers who want something uniquely theirs."
            </p>
            <div className="pt-2 text-xs text-[#8A7966] space-y-1">
              <div>
                <span className="text-[#E5C378] font-medium">Founder:</span> Sunaina — Founder & Creative Director
              </div>
              <div>
                <span className="text-[#E5C378] font-medium">Co-Founder:</span> Simran Tyagi — Co-Founder
              </div>
              <div className="text-[11px] text-[#A6947D] pt-1">
                Headquarters: New Delhi • Active in Delhi NCR, Mumbai, Jaipur, Bengaluru, Lucknow
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFF7E8] tracking-wider uppercase mb-4 text-[#D4AF37]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('TAILORS')}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Find a Tailor
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveAttireFilter({ gender: 'Men' });
                    setCurrentView('MEN');
                  }}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Men's Bespoke
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveAttireFilter({ gender: 'Women' });
                    setCurrentView('WOMEN');
                  }}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Women's Bespoke
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('DESIGN_STUDIO')}
                  className="hover:text-[#FFF7E8] transition-colors text-[#E5C378]"
                >
                  Design Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('DESIGN_GALLERY')}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Design Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('REVIEWS')}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Client Book of Records
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ASSISTANT')}
                  className="hover:text-[#FFF7E8] transition-colors"
                >
                  Stichly AI Assist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('TRANSACTIONS')}
                  className="hover:text-[#FFF7E8] transition-colors text-[#D4AF37]"
                >
                  Online Transactions & Escrow
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRole('TAILOR');
                    setCurrentView('TAILOR_DASHBOARD');
                  }}
                  className="hover:text-[#FFF7E8] transition-colors text-[#D4AF37] font-medium"
                >
                  Become a Tailor / Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Attire Categories */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFF7E8] tracking-wider uppercase mb-4 text-[#D4AF37]">
              Bespoke Silhouettes
            </h4>
            <ul className="space-y-2 text-xs text-[#9E8E7C]">
              <li>Royal Sherwanis & Achkans</li>
              <li>Jodhpuri Bandhgalas</li>
              <li>Bridal Zardozi Lehengas</li>
              <li>Bespoke Saree Blouses</li>
              <li>Savile-Style Tuxedos & Suits</li>
              <li>Belgian Linen Nehru Vests</li>
              <li>Awadhi Chikankari Anarkalis</li>
              <li>Contemporary Indo-Western Gowns</li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFF7E8] tracking-wider uppercase mb-4 text-[#D4AF37]">
              Trust & Ethics
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-[#EADFCF]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verified Karigar Status</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#EADFCF]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Transparent Quotes in ₹</span>
              </li>
              <li className="text-[#9E8E7C] pt-2">
                All bespoke pricing is in Indian Rupees (₹). Tailors negotiate openly directly with clients before cutting.
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    setCurrentRole('ADMIN');
                    setCurrentView('ADMIN_DASHBOARD');
                  }}
                  className="text-[11px] text-[#A6947D] hover:text-[#D4AF37] underline"
                >
                  Executive Portal Access
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#24130A] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6B5C] gap-4">
          <div>
            © {new Date().getFullYear()} STICHLY&CO. All rights reserved. Masterfully Sewn. Precisely Yours.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Bespoke Service</span>
            <span>Artisan Fair Wage Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
