import React, { useState } from 'react';
import { OrderItem } from '../types';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Lock
} from 'lucide-react';

interface NegotiationCardProps {
  order: OrderItem;
  onOpenChat?: () => void;
}

export const NegotiationCard: React.FC<NegotiationCardProps> = ({ order, onOpenChat }) => {
  const {
    currentRole,
    submitCounterOffer,
    acceptQuoteOffer,
    rejectQuoteOffer,
    setPaymentModalOrder
  } = useApp();

  const [counterAmount, setCounterAmount] = useState<string>('');
  const [counterNote, setCounterNote] = useState<string>('');
  const [showCounterInput, setShowCounterInput] = useState<boolean>(false);

  const lastHistory = order.negotiationHistory[order.negotiationHistory.length - 1];
  const isAgreed = order.negotiationStatus === 'PRICE_AGREED';
  const isDeclined = order.negotiationStatus === 'DECLINED';
  const isPaid = order.paymentStatus === 'FULLY_PAID' || order.paymentStatus === 'ADVANCE_PAID';

  // Can the current user respond?
  // If last entry was sent by the OTHER party, the current party can counter or accept.
  const canRespond =
    !isAgreed &&
    !isDeclined &&
    (lastHistory ? lastHistory.senderRole !== currentRole : true);

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(counterAmount, 10);
    if (isNaN(num) || num <= 0) return;
    submitCounterOffer(order.id, num, counterNote);
    setCounterAmount('');
    setCounterNote('');
    setShowCounterInput(false);
  };

  return (
    <div className="bg-[#1A0F0A] border border-[#442817] rounded-xl p-6 shadow-xl relative overflow-hidden">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#AA8221] via-[#D4AF37] to-[#F5D88E]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2C1910]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Live Bespoke Price Negotiation
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                isPaid
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                  : isAgreed
                  ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                  : isDeclined
                  ? 'bg-red-900/60 text-red-300 border border-red-500/40'
                  : 'bg-[#3B2213] text-[#FFDA79] border border-[#D4AF37]/40'
              }`}
            >
              {isPaid
                ? 'Paid in Escrow'
                : isAgreed
                ? 'Price Agreed & Locked'
                : isDeclined
                ? 'Offer Declined'
                : 'In Negotiation'}
            </span>
          </div>
          <h3 className="font-serif text-2xl text-[#FFF7E8] font-bold mt-1">
            {order.garmentTitle}
          </h3>
          <p className="text-xs text-[#A89885]">
            Order #{order.id} • Atelier:{' '}
            <span className="text-[#FFF] font-medium">{order.atelierName}</span> ({order.tailorCity})
          </p>
        </div>

        {/* Price Summary Badge */}
        <div className="bg-[#26150D] border border-[#3E2415] rounded-lg p-3 text-right min-w-[180px]">
          <div className="text-[10px] text-[#A6947D] uppercase tracking-wider">
            {isAgreed ? 'Final Agreed Price' : 'Current Active Quote'}
          </div>
          <div className="font-serif text-3xl font-bold text-[#E5C378]">
            ₹{(order.agreedPrice || order.currentQuote).toLocaleString('en-IN')}
          </div>
          {order.initialQuote !== order.currentQuote && !isAgreed && (
            <div className="text-[11px] text-[#8C7A68] line-through">
              Initial: ₹{order.initialQuote.toLocaleString('en-IN')}
            </div>
          )}
        </div>
      </div>

      {/* Agreed State Banner with Online Payment CTA */}
      {isAgreed && (
        <div className="bg-emerald-950/40 border border-emerald-600/40 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-xs text-emerald-200">
              <span className="font-bold">Price locked at ₹{(order.agreedPrice || order.currentQuote).toLocaleString('en-IN')}.</span>
              {isPaid ? (
                <span> Funds secured in Escrow (₹{order.paidAmount?.toLocaleString('en-IN')}). Atelier cutting in progress.</span>
              ) : (
                <span> Both parties agreed. Complete online escrow deposit to confirm pattern cutting slot.</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setPaymentModalOrder(order)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isPaid ? 'View Escrow Receipt' : 'Pay Online (Escrow)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Negotiation History Timeline */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
          Negotiation History & Dialogue
        </h4>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {order.negotiationHistory.map((item, idx) => {
            const isTailor = item.senderRole === 'TAILOR';
            return (
              <div
                key={item.id || idx}
                className={`p-3.5 rounded-lg border text-xs ${
                  isTailor
                    ? 'bg-[#22130B] border-[#442817] text-[#EADFCF]'
                    : 'bg-[#180E09] border-[#362012] text-[#D8C9B5]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        isTailor ? 'bg-[#3B2213] text-[#E5C378]' : 'bg-[#2A1E16] text-[#A6947D]'
                      }`}
                    >
                      {item.senderRole === 'TAILOR' ? 'Tailor Atelier' : 'Client Offer'}
                    </span>
                    <span className="font-medium text-[#FFF]">{item.senderName}</span>
                  </div>
                  <span className="text-[10px] text-[#8A7969]">{item.timestamp}</span>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <div className="font-serif text-lg font-bold text-[#E5C378]">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A6947D]">
                    Status: {item.status}
                  </span>
                </div>

                {item.note && (
                  <p className="text-xs text-[#C2B19D] mt-1.5 italic font-light">
                    "{item.note}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Negotiation Actions */}
      {!isAgreed && !isDeclined && (
        <div className="pt-4 border-t border-[#2C1910]">
          {showCounterInput ? (
            <form onSubmit={handleSendCounter} className="space-y-3 bg-[#24140D] p-4 rounded-lg border border-[#4D2D1B]">
              <div className="text-xs font-semibold text-[#FFF7E8]">
                Submit Counter-Offer (as {currentRole === 'TAILOR' ? 'Atelier' : 'Client'})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-[#A89885] block mb-1">
                    Your Proposed Price (₹ INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#D4AF37] font-serif font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 7800"
                      value={counterAmount}
                      onChange={(e) => setCounterAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-[#170C08] border border-[#442817] rounded text-sm text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#A89885] block mb-1">
                    Note / Terms (Alterations, lining, fabric notes)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Including two trials and silk lining"
                    value={counterNote}
                    onChange={(e) => setCounterNote(e.target.value)}
                    className="w-full px-3 py-2 bg-[#170C08] border border-[#442817] rounded text-sm text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCounterInput(false)}
                  className="px-3 py-1.5 bg-[#1C100A] text-xs text-[#A89885] hover:text-[#FFF] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#E5C378] text-[#140C08] text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Counter-Offer</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#A89885]">
                {canRespond ? (
                  <span className="text-[#E5C378]">
                    It's your turn to respond to the offer of ₹{order.currentQuote.toLocaleString('en-IN')}.
                  </span>
                ) : (
                  <span>Awaiting response from {lastHistory?.senderRole === 'TAILOR' ? 'Client' : 'Tailor Atelier'}...</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {onOpenChat && (
                  <button
                    onClick={onOpenChat}
                    className="px-3 py-2 bg-[#26150D] hover:bg-[#382013] text-[#D8C9B5] text-xs font-medium rounded border border-[#3E2415] transition-colors"
                  >
                    Open Live Chat
                  </button>
                )}

                <button
                  onClick={() => setShowCounterInput(true)}
                  className="px-4 py-2 bg-[#3D2314] hover:bg-[#4E2E1A] text-[#FFF] text-xs font-semibold rounded border border-[#D4AF37]/40 transition-colors"
                >
                  Counter-Offer (₹)
                </button>

                {canRespond && (
                  <>
                    <button
                      onClick={() => rejectQuoteOffer(order.id)}
                      className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium rounded border border-red-800/40 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => acceptQuoteOffer(order.id)}
                      className="px-4 py-2 bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#AA8221] hover:brightness-110 text-[#120B08] text-xs font-bold rounded shadow transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Accept ₹{order.currentQuote.toLocaleString('en-IN')} & Lock Price</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
