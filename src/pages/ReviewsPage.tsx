import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerReview } from '../types';
import { Star, Award, Plus, CheckCircle2, MessageSquare } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, submitReview, tailors, currentCustomer } = useApp();

  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [selectedTailorId, setSelectedTailorId] = useState<string>(tailors[0].id);
  const [outfitName, setOutfitName] = useState<string>('Custom Banarasi Bandhgala Ensemble');
  const [outfitCategory, setOutfitCategory] = useState<string>('Men • Indian');
  const [rating, setRating] = useState<number>(5.0);
  const [reviewText, setReviewText] = useState<string>('');
  const [craftsmanshipRating, setCraftsmanshipRating] = useState<number>(5.0);
  const [fitRating, setFitRating] = useState<number>(5.0);
  const [communicationRating, setCommunicationRating] = useState<number>(5.0);
  const [valueRating, setValueRating] = useState<number>(4.8);
  const [deliveryRating, setDeliveryRating] = useState<number>(5.0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tailor = tailors.find((t) => t.id === selectedTailorId) || tailors[0];

    submitReview({
      customerName: currentCustomer.name,
      customerCity: currentCustomer.city,
      tailorId: tailor.id,
      tailorName: tailor.name,
      atelierName: tailor.atelierName,
      outfitName,
      outfitCategory,
      rating,
      reviewText: reviewText || 'Exceptional craftsmanship. The fitting trials ensured an impeccable silhouette.',
      breakdown: {
        craftsmanship: craftsmanshipRating,
        fit: fitRating,
        communication: communicationRating,
        value: valueRating,
        delivery: deliveryRating
      },
      verifiedClient: true
    });

    setShowSubmitModal(false);
    setReviewText('');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Honored Craftsmanship Ledger</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Client Book of Records
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            An archival chronicle of bespoke testimonials across India. Evaluated on 5 rigorous pillars: Craftsmanship, Fit, Communication, Value, and Punctuality.
          </p>
          <div className="text-[11px] text-[#A6947D] mt-2 italic font-serif">
            *Demo/sample customer reviews (Mahi Suryavanshi, Mansi Jha, Khushi Gour, Charu) illustrating authentic bespoke experiences.
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow"
            >
              Submit Your Bespoke Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2C1910] mb-4">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                      {rev.outfitCategory}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#FFF] mt-0.5">
                      {rev.outfitName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8C7A68]">{rev.date}</span>
                  </div>
                </div>

                <div className="text-xs text-[#E5C378] font-medium mb-3">
                  Tailored by {rev.atelierName} ({rev.tailorName})
                </div>

                <p className="text-xs sm:text-sm text-[#D8C9B5] leading-relaxed italic font-light mb-6">
                  "{rev.reviewText}"
                </p>

                {/* 5-Pillar Breakdown */}
                <div className="bg-[#140C08] p-4 rounded-xl border border-[#2F1B10] mb-4">
                  <div className="text-[10px] text-[#8C7A68] uppercase font-semibold mb-2">
                    5-Pillar Rating Breakdown
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-[11px]">
                    <div>
                      <span className="text-[#8C7A68] block text-[9px]">Craft</span>
                      <strong className="text-[#D4AF37]">{rev.breakdown.craftsmanship}★</strong>
                    </div>
                    <div>
                      <span className="text-[#8C7A68] block text-[9px]">Fit</span>
                      <strong className="text-[#D4AF37]">{rev.breakdown.fit}★</strong>
                    </div>
                    <div>
                      <span className="text-[#8C7A68] block text-[9px]">Comms</span>
                      <strong className="text-[#D4AF37]">{rev.breakdown.communication}★</strong>
                    </div>
                    <div>
                      <span className="text-[#8C7A68] block text-[9px]">Value</span>
                      <strong className="text-[#D4AF37]">{rev.breakdown.value}★</strong>
                    </div>
                    <div>
                      <span className="text-[#8C7A68] block text-[9px]">Delivery</span>
                      <strong className="text-[#D4AF37]">{rev.breakdown.delivery}★</strong>
                    </div>
                  </div>
                </div>

                {rev.tailorReply && (
                  <div className="p-3 bg-[#24150D] rounded-lg border border-[#442817] text-xs text-[#BAA995] mb-4">
                    <span className="text-[10px] text-[#D4AF37] font-semibold uppercase block mb-1">
                      Atelier Note
                    </span>
                    <p className="italic font-light">"{rev.tailorReply}"</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#2C1910] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#FFF]">{rev.customerName}</span>
                  <span className="text-[#8C7A68] text-[11px] block">{rev.customerCity}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sample Client Record</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting Review */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1C100A] border border-[#52331F] rounded-xl max-w-lg w-full p-6 text-[#EADFCF] shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-[#FFF7E8] mb-1">
                Submit Client Record
              </h3>
              <p className="text-xs text-[#A89885] mb-4">
                Record your feedback on the fit, stitching quality, and negotiation experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Tailor Atelier</label>
                  <select
                    value={selectedTailorId}
                    onChange={(e) => setSelectedTailorId(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  >
                    {tailors.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[#1C100A]">
                        {t.atelierName} ({t.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Garment Name</label>
                  <input
                    type="text"
                    required
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Review Experience</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how the outfit draped, the fitting trial, and the artisan's craft..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 bg-[#26150D] text-xs text-[#A89885] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] text-[#120B08] text-xs font-bold rounded"
                  >
                    Publish to Client Book
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
