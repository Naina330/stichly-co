import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderItem, PaymentMethod, PaymentType } from '../types';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  X,
  QrCode,
  Download,
  Building,
  Smartphone,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

interface OnlinePaymentModalProps {
  order: OrderItem;
  onClose: () => void;
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({ order, onClose }) => {
  const { executeTransaction, currentCustomer, setCurrentView } = useApp();

  const totalAgreed = order.agreedPrice || order.currentQuote;
  const halfAdvance = Math.round(totalAgreed / 2);

  const [paymentType, setPaymentType] = useState<PaymentType>('ADVANCE_50_PERCENT');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  // Form Fields
  const [upiId, setUpiId] = useState<string>(`${currentCustomer.email.split('@')[0]}@okhdfcbank`);
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('392');
  const [cardHolder, setCardHolder] = useState<string>(currentCustomer.name);
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');

  // Transaction Processing & Success States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactionSuccess, setTransactionSuccess] = useState<any | null>(null);

  const payableAmount = paymentType === 'FULL_PAYMENT' ? totalAgreed : halfAdvance;
  const gstAmount = Math.round(payableAmount * 0.05);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const txn = executeTransaction({
        orderId: order.id,
        amount: payableAmount,
        paymentType,
        paymentMethod,
        paymentDetails: {
          upiId: paymentMethod === 'UPI' ? upiId : undefined,
          cardLast4: paymentMethod === 'CARD' ? cardNumber.slice(-4) : undefined,
          bankName: paymentMethod === 'NETBANKING' ? selectedBank : undefined
        }
      });
      setIsProcessing(false);
      setTransactionSuccess(txn);
    }, 1800);
  };

  const handlePrintReceipt = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Print not supported in sandboxed environment', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1A0F0A] border border-[#52331F] rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-[#EADFCF] shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A89885] hover:text-[#FFF] p-1 rounded-full hover:bg-[#2C1910] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!transactionSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2C1910]">
              <div className="w-10 h-10 rounded-full bg-[#2C1910] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  STICHLY&CO. Escrow Payment Gateway
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                  Complete Bespoke Transaction
                </h3>
              </div>
            </div>

            {/* Order Brief */}
            <div className="bg-[#140C08] p-4 rounded-xl border border-[#2F1B10] mb-6 flex items-center justify-between">
              <div>
                <div className="font-serif text-base font-bold text-[#FFF]">{order.garmentTitle}</div>
                <div className="text-xs text-[#A89885]">
                  Atelier: <span className="text-[#E5C378]">{order.atelierName}</span> ({order.tailorCity}) • Order #{order.id}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-[#8C7A68] block">Total Agreed Price</span>
                <span className="font-serif text-xl font-bold text-[#E5C378]">
                  ₹{totalAgreed.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Escrow Trust Guarantee */}
            <div className="bg-emerald-950/30 border border-emerald-600/40 rounded-xl p-3.5 mb-6 flex items-start gap-3 text-xs text-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">STICHLY&CO. 100% Escrow Protection:</strong> Your funds are securely held in our escrow vault and will only be disbursed to the master tailor once you have completed your first fitting trial and verified the drape.
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              {/* Payment Split Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                  Choose Payment Schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentType('ADVANCE_50_PERCENT')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentType === 'ADVANCE_50_PERCENT'
                        ? 'border-[#D4AF37] bg-[#2E1A10] shadow-md'
                        : 'border-[#3D2619] bg-[#140C08] hover:border-[#52331F]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-[#FFF]">50% Bespoke Advance</span>
                      <span className="font-serif font-bold text-sm text-[#E5C378]">
                        ₹{halfAdvance.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89885] font-light">
                      Reserves fabric cutting and muslin pattern drafting. Pay remaining 50% upon trial.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentType('FULL_PAYMENT')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentType === 'FULL_PAYMENT'
                        ? 'border-[#D4AF37] bg-[#2E1A10] shadow-md'
                        : 'border-[#3D2619] bg-[#140C08] hover:border-[#52331F]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-[#FFF]">100% Full Payment</span>
                      <span className="font-serif font-bold text-sm text-[#E5C378]">
                        ₹{totalAgreed.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89885] font-light">
                      Fully escrow-protected. Expedites atelier delivery schedule and priority fitting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block mb-2">
                  Select Online Payment Method (₹ INR)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
                    { id: 'CARD', label: 'Cards', icon: CreditCard, desc: 'Visa, Master, RuPay' },
                    { id: 'NETBANKING', label: 'Net Banking', icon: Building, desc: 'HDFC, ICICI, SBI' }
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#2E1A10] text-[#FFF]'
                            : 'border-[#3D2619] bg-[#140C08] text-[#A89885] hover:border-[#52331F]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                        <div className="text-xs font-bold">{pm.label}</div>
                        <div className="text-[9px] text-[#8C7A68] truncate">{pm.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Specific Inputs */}
              {paymentMethod === 'UPI' && (
                <div className="bg-[#140C08] p-4 rounded-xl border border-[#3E2415] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FFF]">Instant UPI Transfer</span>
                    <span className="text-[10px] text-[#D4AF37] flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Zero Merchant Convenience Fee</span>
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">Enter UPI ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. mobileNumber@upi or user@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="flex gap-2 text-[10px] text-[#8C7A68]">
                    <span className="px-2 py-0.5 rounded bg-[#22130B]">@okhdfcbank</span>
                    <span className="px-2 py-0.5 rounded bg-[#22130B]">@ybl</span>
                    <span className="px-2 py-0.5 rounded bg-[#22130B]">@paytm</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <div className="bg-[#140C08] p-4 rounded-xl border border-[#3E2415] space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">Name on Card</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'NETBANKING' && (
                <div className="bg-[#140C08] p-4 rounded-xl border border-[#3E2415] space-y-3">
                  <label className="text-[10px] uppercase text-[#8C7A68] block mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full p-2.5 bg-[#1A0F0A] border border-[#3E2415] rounded text-xs text-[#E5C378] focus:outline-none"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Price Breakdown Footer */}
              <div className="pt-4 border-t border-[#2C1910] space-y-2 text-xs">
                <div className="flex justify-between text-[#A89885]">
                  <span>Bespoke Tailoring Fee</span>
                  <span>₹{payableAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#A89885]">
                  <span>GST on Tailoring Services (5%)</span>
                  <span className="text-emerald-400">Included in Quote</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#FFF] pt-2 border-t border-[#24130A]">
                  <span>Total Amount Payable Now</span>
                  <span className="font-serif text-xl text-[#E5C378]">
                    ₹{payableAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Lock className="w-4 h-4 animate-spin" />
                    <span>Securing Escrow Vault...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{payableAmount.toLocaleString('en-IN')} via Escrow</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Receipt Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                Transaction Successful • Secured in Escrow
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#FFF7E8] mt-1">
                Bespoke Payment Confirmed
              </h3>
              <p className="text-xs text-[#A89885] mt-1">
                Transaction Ref: <strong className="font-mono text-[#D4AF37]">{transactionSuccess.id}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#140C08] border border-[#3E2415] rounded-xl p-5 text-left text-xs text-[#D8C9B5] space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-[#24140D]">
                <span className="text-[#8C7A68]">Amount Paid:</span>
                <span className="font-serif font-bold text-base text-[#E5C378]">
                  ₹{transactionSuccess.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24140D]">
                <span className="text-[#8C7A68]">Payment Type:</span>
                <span className="font-medium text-[#FFF]">
                  {transactionSuccess.paymentType.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24140D]">
                <span className="text-[#8C7A68]">Method:</span>
                <span className="font-medium text-[#FFF]">{transactionSuccess.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#24140D]">
                <span className="text-[#8C7A68]">Atelier:</span>
                <span className="font-medium text-[#FFF]">{transactionSuccess.atelierName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C7A68]">Escrow Vault:</span>
                <span className="text-emerald-300 font-semibold">Held until trial fitting</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#2D180F] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] border border-[#D4AF37]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print Tax Invoice</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setCurrentView('TRANSACTIONS');
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#23130A] hover:bg-[#321C10] text-xs font-semibold text-[#FFF] border border-[#D4AF37]/40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>View in Ledger</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Back to Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
