import React from 'react';
import { Sparkles, Scissors, Users, Eye, Sliders, CheckCircle2, Feather } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      title: 'Craftsmanship',
      desc: 'Centuries of needlework wisdom, hand-basted horsehair canvases, and intricate Zardozi embroidery preserved in every stitch.',
      icon: Scissors
    },
    {
      title: 'Customization',
      desc: 'Freedom to define silhouettes, fabrics, necklines, sleeves, and pockets without standardized sizing limits.',
      icon: Sliders
    },
    {
      title: 'Local Artisans',
      desc: 'Direct livelihood and recognition for master karigars across Chandni Chowk, Bandra, Johari Bazaar, and Hazratganj.',
      icon: Users
    },
    {
      title: 'Transparency',
      desc: 'Open price negotiation in Indian Rupees (₹), verified reviews, and honest timelines with zero hidden fees.',
      icon: Eye
    },
    {
      title: 'Personalization',
      desc: 'Every garment is drafted exclusively to your unique measurements and personal aesthetic.',
      icon: Feather
    },
    {
      title: 'Indian Heritage + Modern Design',
      desc: 'The timeless grace of Banarasi, Chanderi, and Chikankari married with sleek contemporary silhouettes and tuxedos.',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-20 bg-[#160D08] border-t border-[#331C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Our Purpose & Ethos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFF7E8] mt-2 mb-4">
            About STICHLY&CO.
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#EADFCF] leading-relaxed font-serif italic">
            "STICHLY&CO. was created to bridge the gap between India's skilled local tailoring community and customers looking for personalized clothing."
          </p>
          <p className="text-xs sm:text-sm text-[#A89885] mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            Customers bring the vision. Tailors bring the craft. STICHLY&CO. brings them together in a seamless digital atelier with direct communication, price negotiation, and trial tracking.
          </p>
        </div>

        {/* 6 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-[#1C100A] border border-[#3E2415] hover:border-[#D4AF37]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2A170E] flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform border border-[#D4AF37]/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">{v.title}</h3>
                <p className="text-xs text-[#BAA995] leading-relaxed font-light">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
