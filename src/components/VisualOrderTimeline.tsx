import React from 'react';
import { OrderStage } from '../types';
import { CheckCircle2, Clock, CircleDot, ArrowRight } from 'lucide-react';

interface VisualOrderTimelineProps {
  currentStage: OrderStage;
  onUpdateStage?: (stage: OrderStage) => void;
  canEdit?: boolean;
}

export const ORDER_STAGES_LIST: { id: OrderStage; label: string; desc: string }[] = [
  { id: 'DESIGN_REQUEST', label: '1. Design Request', desc: 'Bespoke specifications & inspiration submitted' },
  { id: 'QUOTE_REQUESTED', label: '2. Quote Requested', desc: 'Atelier reviewing complexity & materials' },
  { id: 'NEGOTIATION', label: '3. Negotiation', desc: 'Direct price discussion in Indian Rupees (₹)' },
  { id: 'PRICE_AGREED', label: '4. Price Agreed', desc: 'Bespoke quotation mutually locked' },
  { id: 'ORDER_CONFIRMED', label: '5. Order Confirmed', desc: 'Deposit confirmed & pattern slot reserved' },
  { id: 'MEASUREMENTS', label: '6. Measurements', desc: 'Body profile verified & drafted on muslin' },
  { id: 'CUTTING_STITCHING', label: '7. Cutting & Stitching', desc: 'Master cutter drafting horsehair canvas' },
  { id: 'TRIAL', label: '8. Trial Fitting', desc: 'First basted garment fitting session' },
  { id: 'ALTERATIONS', label: '9. Alterations', desc: 'Fine-tuning drape, contours, and hems' },
  { id: 'READY', label: '10. Ready for Atelier Dispatch', desc: 'Final steam press & quality inspection' },
  { id: 'DELIVERED', label: '11. Delivered', desc: 'Received by client in luxury garment bag' },
  { id: 'COMPLETED', label: '12. Completed', desc: 'Bespoke experience rated in Client Book' }
];

export const VisualOrderTimeline: React.FC<VisualOrderTimelineProps> = ({
  currentStage,
  onUpdateStage,
  canEdit = false
}) => {
  const currentIndex = ORDER_STAGES_LIST.findIndex((s) => s.id === currentStage);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="bg-[#180E09] border border-[#3E2415] rounded-xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#2C1910]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            STICHLY&CO. Bespoke Lifecycle Tracker
          </span>
          <h3 className="font-serif text-xl text-[#FFF7E8] font-bold">12-Stage Order Progress</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#A89885]">Current Stage:</span>
          <span className="px-2.5 py-1 bg-[#2E1A10] text-[#E5C378] text-xs font-semibold rounded-full border border-[#D4AF37]/40">
            {ORDER_STAGES_LIST[safeIndex]?.label}
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative mb-8">
        <div className="h-1.5 bg-[#2A170F] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#AA8221] via-[#D4AF37] to-[#F5D88E] transition-all duration-500"
            style={{ width: `${((safeIndex + 1) / ORDER_STAGES_LIST.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#8C7A68] mt-1.5">
          <span>1. Design Submission</span>
          <span>6. Canvas & Cut</span>
          <span>12. Completed</span>
        </div>
      </div>

      {/* Horizontal or Grid Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {ORDER_STAGES_LIST.map((stage, idx) => {
          const isPassed = idx < safeIndex;
          const isCurrent = idx === safeIndex;
          const isUpcoming = idx > safeIndex;

          return (
            <div
              key={stage.id}
              onClick={() => {
                if (canEdit && onUpdateStage) {
                  onUpdateStage(stage.id);
                }
              }}
              className={`p-3 rounded-lg border text-left transition-all ${
                canEdit ? 'cursor-pointer hover:scale-[1.02]' : ''
              } ${
                isCurrent
                  ? 'bg-[#2E1A10] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                  : isPassed
                  ? 'bg-[#1E110A] border-[#442817] text-[#C9BAA6]'
                  : 'bg-[#140C08]/60 border-[#24130A] opacity-60 text-[#7D6B58]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[#D4AF37]">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                ) : isCurrent ? (
                  <CircleDot className="w-3.5 h-3.5 text-[#FFDA79] animate-pulse" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-[#5C4A3B]" />
                )}
              </div>
              <div
                className={`text-xs font-semibold truncate ${
                  isCurrent ? 'text-[#FFF7E8]' : isPassed ? 'text-[#E5D7C5]' : 'text-[#8A7969]'
                }`}
              >
                {stage.label.split('. ')[1]}
              </div>
              <div className="text-[10px] text-[#9E8E7C] line-clamp-2 mt-1 leading-tight font-light">
                {stage.desc}
              </div>
            </div>
          );
        })}
      </div>

      {canEdit && (
        <div className="mt-6 pt-4 border-t border-[#2C1910] flex items-center justify-between text-xs text-[#A89885]">
          <span>Tailor Management Control: Click any stage above to advance or update order status.</span>
          {safeIndex < ORDER_STAGES_LIST.length - 1 && onUpdateStage && (
            <button
              onClick={() => onUpdateStage(ORDER_STAGES_LIST[safeIndex + 1].id)}
              className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] font-bold rounded flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Advance to Stage {safeIndex + 2}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
