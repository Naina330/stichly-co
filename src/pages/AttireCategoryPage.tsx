import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MEN_INDIAN_CATEGORIES,
  MEN_WESTERN_CATEGORIES,
  WOMEN_INDIAN_CATEGORIES,
  WOMEN_WESTERN_CATEGORIES
} from '../data/categories';
import { Scissors, Sparkles, Sliders, ArrowRight, Check } from 'lucide-react';

interface AttireCategoryPageProps {
  gender: 'Men' | 'Women';
}

export const AttireCategoryPage: React.FC<AttireCategoryPageProps> = ({ gender }) => {
  const { setCurrentView, setActiveAttireFilter, activeAttireFilter } = useApp();

  const [selectedAttireType, setSelectedAttireType] = useState<'Indian' | 'Western'>(
    activeAttireFilter?.attireType || 'Indian'
  );

  const indianList = gender === 'Men' ? MEN_INDIAN_CATEGORIES : WOMEN_INDIAN_CATEGORIES;
  const westernList = gender === 'Men' ? MEN_WESTERN_CATEGORIES : WOMEN_WESTERN_CATEGORIES;

  const currentList = selectedAttireType === 'Indian' ? indianList : westernList;

  const handleSelectCategory = (cat: string) => {
    setActiveAttireFilter({ gender, attireType: selectedAttireType, category: cat });
    setCurrentView('DESIGN_STUDIO');
  };

  const handleCustomDesign = () => {
    setActiveAttireFilter({ gender, attireType: selectedAttireType, category: 'Custom / I Have My Own Design' });
    setCurrentView('DESIGN_STUDIO');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 bg-[#29170E] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-3">
            {gender}'s Bespoke Wardrobe
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            {gender === 'Men' ? "Gentlemen's Bespoke Tailoring" : "Women's Bespoke Couture"}
          </h1>
          <p className="text-sm text-[#C9BAA6] mt-3 font-light leading-relaxed">
            Every garment is handcrafted to your exact posture and dimensions by master karigars across India. Select a silhouette to begin your custom design or submit your own concept.
          </p>

          {/* Subtabs: INDIAN WEAR vs WESTERN WEAR */}
          <div className="mt-8 inline-flex p-1.5 bg-[#1C100A] rounded-xl border border-[#442817]">
            <button
              onClick={() => setSelectedAttireType('Indian')}
              className={`px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedAttireType === 'Indian'
                  ? 'bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] text-[#120B08] shadow-md'
                  : 'text-[#D8C9B5] hover:text-[#FFF]'
              }`}
            >
              Indian Wear
            </button>
            <button
              onClick={() => setSelectedAttireType('Western')}
              className={`px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedAttireType === 'Western'
                  ? 'bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] text-[#120B08] shadow-md'
                  : 'text-[#D8C9B5] hover:text-[#FFF]'
              }`}
            >
              Western Wear
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentList.map((category, idx) => (
            <div
              key={idx}
              className="bg-[#1C100A] border border-[#3E2415] hover:border-[#D4AF37]/60 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2A170F] text-[#E5C378] border border-[#3E2415]">
                    {gender} • {selectedAttireType}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#FFF7E8] group-hover:text-[#E5C378] transition-colors mb-2">
                  {category}
                </h3>
                <p className="text-xs text-[#9E8E7C] font-light leading-relaxed mb-6">
                  Custom tailored with authentic fabrics, bespoke chest canvas, hand-piped lapels, and personalized fitting trials.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2C1910] space-y-2">
                <button
                  onClick={() => handleSelectCategory(category)}
                  className="w-full py-2.5 rounded bg-[#351F14] hover:bg-[#462B1B] text-xs font-semibold text-[#E5C378] text-center border border-[#D4AF37]/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize in Studio</span>
                </button>
              </div>
            </div>
          ))}

          {/* Special "Custom / I Have My Own Design" Card */}
          <div
            onClick={handleCustomDesign}
            className="bg-gradient-to-br from-[#2E1A10] to-[#1C100A] border-2 border-dashed border-[#D4AF37]/60 hover:border-[#D4AF37] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#FFF7E8] mb-2">
                Custom / I Have My Own Design
              </h3>
              <p className="text-xs text-[#D8C9B5] font-light leading-relaxed mb-4">
                Have a sketch, an archival heirloom photo, or an Instagram / Pinterest inspiration? Upload your image or use our Visual Scanner to build a one-of-a-kind bespoke piece.
              </p>
            </div>

            <div className="pt-4 border-t border-[#3D2619]">
              <span className="w-full py-2.5 rounded bg-[#D4AF37] group-hover:bg-[#E5C378] text-xs font-bold text-[#120B08] text-center transition-colors flex items-center justify-center gap-1.5">
                <span>Submit Your Custom Concept</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
