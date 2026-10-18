import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BespokeTransaction, PaymentStatus } from '../types';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  ArrowRight,
  Download,
  Building,
  Smartphone,
  CheckCircle2,
  Clock,
  Printer,
  X,
  QrCode,
  FileText,
  DollarSign,
  TrendingUp,
  Filter,
  Eye,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const {
    transactions,
    orders,
    currentRole,
    currentCustomer,
    currentTailor,
    setPaymentModalOrder,
    releaseEscrowPayout,
    setCurrentView,
    setSelectedOrderId
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | PaymentStatus>('ALL');
  const [selectedInvoiceTxn, setSelectedInvoiceTxn] = useState<BespokeTransaction | null>(null);

  // Filter transactions based on role
  const relevantTransactions = transactions.filter((t) => {
    if (currentRole === 'CUSTOMER') return t.customerId === currentCustomer.id;
    if (currentRole === 'TAILOR') return t.tailorId === currentTailor.id;
    return true; // ADMIN
  });

  const filteredTransactions = relevantTransactions.filter((t) => {
    if (statusFilter === 'ALL') return true;
    return t.status === statusFilter;
  });

  // Calculate Escrow Vault & Payment KPIs
  const totalVolume = relevantTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalInEscrow = relevantTransactions
    .filter((t) => t.status === 'HELD_IN_ESCROW')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalReleased = relevantTransactions
    .filter((t) => t.status === 'RELEASED_TO_TAILOR')
    .reduce((acc, t) => acc + t.amount, 0);

  // Orders with pending payments
  const ordersPendingPayment = orders.filter((o) => {
    if (currentRole === 'CUSTOMER' && o.customerId !== currentCustomer.id) return false;
    if (currentRole === 'TAILOR' && o.tailorId !== currentTailor.id) return false;
    return (
      (o.negotiationStatus === 'PRICE_AGREED' || o.negotiationStatus === 'IN_NEGOTIATION') &&
      o.paymentStatus !== 'FULLY_PAID'
    );
  });

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Print not supported in sandboxed environment', e);
    }
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Escrow Protected Digital Banking</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Online Transactions & Escrow Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            Secure Indian bespoke commerce via UPI, Cards, and Net Banking. Funds are safely held in the STICHLY&CO. Escrow Vault and disbursed to artisans only after trial fitting approval.
          </p>
        </div>

        {/* Security & Banking Assurance Banner */}
        <div className="bg-[#180E09] border border-[#3E2415] rounded-2xl p-5 mb-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#FFF]">STICHLY&CO. Escrow Trust Guarantee</h4>
              <p className="text-xs text-[#A89885]">
                50% advance secures fabric & karigar drafting. 50% balance released upon verified fit. 100% refund on unfulfilled orders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#D8C9B5]">
            <span className="px-2.5 py-1 bg-[#28160E] border border-[#4D2D1B] rounded font-mono">UPI 2.0 Instant</span>
            <span className="px-2.5 py-1 bg-[#28160E] border border-[#4D2D1B] rounded font-mono">RuPay / Visa / MC</span>
            <span className="px-2.5 py-1 bg-[#28160E] border border-[#4D2D1B] rounded font-mono">RBI / Escrow Vault</span>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A0F0A] border border-[#3D2619] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-[#8C7A68] mb-1">
              <span>Total Volume</span>
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#FFF7E8]">
              ₹{totalVolume.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-[#A6947D]">
              {relevantTransactions.length} recorded payments
            </span>
          </div>

          <div className="bg-[#1A0F0A] border border-amber-900/40 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span>Held in Escrow Vault</span>
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#FFDA79]">
              ₹{totalInEscrow.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-amber-300/70">
              Protected until trial completion
            </span>
          </div>

          <div className="bg-[#1A0F0A] border border-emerald-900/40 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span>Released to Ateliers</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl font-bold text-emerald-300">
              ₹{totalReleased.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-400/70">
              Approved after trial verification
            </span>
          </div>

          <div className="bg-[#1A0F0A] border border-[#3D2619] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-xs text-[#8C7A68] mb-1">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#E5C378]">
              {ordersPendingPayment.length} Orders
            </div>
            <span className="text-[11px] text-[#A6947D]">
              Awaiting advance or final balance
            </span>
          </div>
        </div>

        {/* Section 1: Orders Requiring Online Payment */}
        {ordersPendingPayment.length > 0 && (
          <div className="mb-10 bg-[#1E110A] border border-[#59341B] rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#3D2214]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Action Required
                </span>
                <h3 className="font-serif text-xl font-bold text-[#FFF]">
                  Pending Bespoke Payments ({ordersPendingPayment.length})
                </h3>
              </div>
              <span className="text-xs text-[#A89885]">
                Lock your artisan's calendar with a 50% advance deposit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ordersPendingPayment.map((ord) => {
                const totalAgreed = ord.agreedPrice || ord.currentQuote;
                const paid = ord.paidAmount || 0;
                const remaining = totalAgreed - paid;
                const isAdvanceNeeded = paid === 0;

                return (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#140C08] border border-[#3D2619] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#A89885] mb-1">
                        <span className="font-mono">Order #{ord.id}</span>
                        <span className="text-[#D4AF37] font-semibold">
                          {isAdvanceNeeded ? 'Advance Due' : 'Balance Due'}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#FFF] line-clamp-1">
                        {ord.garmentTitle}
                      </h4>
                      <p className="text-xs text-[#A89885] mt-0.5">
                        Atelier: <span className="text-[#E5C378]">{ord.atelierName}</span> ({ord.tailorCity})
                      </p>

                      <div className="mt-3 p-2.5 bg-[#1B100B] rounded-lg border border-[#2D180F] text-xs flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-[#8C7A68] block">Payable Online</span>
                          <strong className="text-sm font-serif text-[#FFDA79]">
                            ₹{(isAdvanceNeeded ? Math.round(totalAgreed / 2) : remaining).toLocaleString('en-IN')}
                          </strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#8C7A68] block">Total Order</span>
                          <span className="text-xs text-[#D8C9B5]">₹{totalAgreed.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setPaymentModalOrder(ord)}
                        className="flex-1 py-2 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Online Now</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrderId(ord.id);
                          setCurrentView('ORDERS');
                        }}
                        className="px-3 py-2 rounded bg-[#2A170E] hover:bg-[#3D2214] text-[#D8C9B5] text-xs border border-[#3E2415] cursor-pointer"
                        title="View Order"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Complete Transaction Ledger */}
        <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2C1910]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Audit Trail
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF]">
                Bespoke Transactions Ledger
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8C7A68] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {(['ALL', 'HELD_IN_ESCROW', 'RELEASED_TO_TAILOR', 'REFUNDED'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    statusFilter === filter
                      ? 'bg-[#D4AF37] text-[#120B08] font-bold'
                      : 'bg-[#26150D] text-[#A89885] hover:text-[#FFF] hover:bg-[#382014]'
                  }`}
                >
                  {filter === 'ALL'
                    ? 'All Transactions'
                    : filter.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-[#A89885]">
              <Lock className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-50" />
              <p className="text-sm">No transactions found for the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2D180F] text-[#8C7A68] uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Transaction ID & Date</th>
                    <th className="py-3 px-3">Garment & Order</th>
                    <th className="py-3 px-3">Party (Client / Atelier)</th>
                    <th className="py-3 px-3">Payment Method</th>
                    <th className="py-3 px-3">Amount (₹)</th>
                    <th className="py-3 px-3">Escrow Status</th>
                    <th className="py-3 px-3 text-right">Invoice & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26140B]">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#23130A] transition-colors">
                      <td className="py-4 px-3 align-top">
                        <span className="font-mono text-[#D4AF37] font-semibold block">{tx.id}</span>
                        <span className="text-[10px] text-[#8C7A68] block mt-0.5">{tx.timestamp}</span>
                      </td>

                      <td className="py-4 px-3 align-top">
                        <span className="font-serif font-bold text-[#FFF] block">{tx.garmentTitle}</span>
                        <span className="text-[10px] text-[#A6947D] block">Order #{tx.orderId}</span>
                        <span className="text-[10px] text-[#8C7A68] block mt-0.5">
                          {tx.paymentType.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-4 px-3 align-top">
                        <span className="text-[#FFF] font-medium block">
                          Client: {tx.customerName}
                        </span>
                        <span className="text-[#E5C378] text-[11px] block">
                          Atelier: {tx.atelierName}
                        </span>
                      </td>

                      <td className="py-4 px-3 align-top">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#2D180F] border border-[#3E2415] text-[11px]">
                          {tx.paymentMethod === 'UPI' ? (
                            <>
                              <Smartphone className="w-3 h-3 text-[#D4AF37]" />
                              <span>UPI ({tx.paymentDetails.upiId || 'Direct UPI'})</span>
                            </>
                          ) : tx.paymentMethod === 'CARD' ? (
                            <>
                              <CreditCard className="w-3 h-3 text-[#D4AF37]" />
                              <span>Card ending ••{tx.paymentDetails.cardLast4 || '8821'}</span>
                            </>
                          ) : (
                            <>
                              <Building className="w-3 h-3 text-[#D4AF37]" />
                              <span>{tx.paymentDetails.bankName || 'Net Banking'}</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-3 align-top">
                        <span className="font-serif text-base font-bold text-[#FFF] block">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#8C7A68] block">
                          Incl. 5% GST (₹{tx.gstAmount.toLocaleString('en-IN')})
                        </span>
                      </td>

                      <td className="py-4 px-3 align-top">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            tx.status === 'RELEASED_TO_TAILOR'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                              : tx.status === 'HELD_IN_ESCROW'
                              ? 'bg-amber-950 text-amber-300 border border-amber-600/40'
                              : 'bg-red-950 text-red-300 border border-red-600/40'
                          }`}
                        >
                          {tx.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[9px] text-[#8C7A68] block mt-1">
                          {tx.escrowReleaseConditions}
                        </span>
                      </td>

                      <td className="py-4 px-3 align-top text-right space-y-1.5">
                        <button
                          onClick={() => setSelectedInvoiceTxn(tx)}
                          className="px-2.5 py-1 bg-[#2C1910] hover:bg-[#3D2214] text-[#E5C378] rounded border border-[#D4AF37]/30 text-[11px] font-medium inline-flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View Invoice</span>
                        </button>

                        {/* If in Escrow and user is Tailor or Admin, option to release after fitting */}
                        {tx.status === 'HELD_IN_ESCROW' && (currentRole === 'TAILOR' || currentRole === 'ADMIN') && (
                          <button
                            onClick={() => releaseEscrowPayout(tx.id)}
                            className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded border border-emerald-600/40 text-[10px] font-medium inline-flex items-center gap-1 cursor-pointer block ml-auto mt-1"
                            title="Release escrow funds to tailor upon fitting approval"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Confirm Fit & Payout</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 3: Escrow Flow Infographic */}
        <div className="mt-12 bg-[#160D08] border border-[#331C10] rounded-2xl p-6 sm:p-8">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF7E8] text-center mb-6">
            How The STICHLY&CO. Escrow Guarantee Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-[#1E110A] rounded-xl border border-[#3D2619]">
              <div className="w-10 h-10 rounded-full bg-[#2C1910] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold mx-auto mb-3">
                1
              </div>
              <h4 className="text-xs font-bold text-[#FFF] mb-1">Price Agreed</h4>
              <p className="text-[11px] text-[#A89885]">
                Client & tailor agree on bespoke quote in ₹ through live negotiation.
              </p>
            </div>

            <div className="p-4 bg-[#1E110A] rounded-xl border border-[#3D2619]">
              <div className="w-10 h-10 rounded-full bg-[#2C1910] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold mx-auto mb-3">
                2
              </div>
              <h4 className="text-xs font-bold text-[#FFF] mb-1">50% Advance in Escrow</h4>
              <p className="text-[11px] text-[#A89885]">
                Client pays advance via UPI/Card. Funds are locked securely in STICHLY&CO. Vault.
              </p>
            </div>

            <div className="p-4 bg-[#1E110A] rounded-xl border border-[#3D2619]">
              <div className="w-10 h-10 rounded-full bg-[#2C1910] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold mx-auto mb-3">
                3
              </div>
              <h4 className="text-xs font-bold text-[#FFF] mb-1">Craftsmanship & Fitting</h4>
              <p className="text-[11px] text-[#A89885]">
                Master tailor cuts fabric, stitches garment, and conducts physical muslin trial fitting.
              </p>
            </div>

            <div className="p-4 bg-[#1E110A] rounded-xl border border-[#3D2619]">
              <div className="w-10 h-10 rounded-full bg-[#2C1910] border border-emerald-500 text-emerald-400 font-serif font-bold mx-auto mb-3">
                4
              </div>
              <h4 className="text-xs font-bold text-[#FFF] mb-1">Payout Disbursed</h4>
              <p className="text-[11px] text-[#A89885]">
                Upon fit verification and delivery, escrow automatically pays the artisan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoiceTxn && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1C100A] border border-[#52331F] rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-[#EADFCF] shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedInvoiceTxn(null)}
              className="absolute top-5 right-5 text-[#A89885] hover:text-[#FFF] p-1 rounded-full hover:bg-[#2C1910] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Printable View */}
            <div id="printable-invoice" className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-[#3D2619]">
                <div>
                  <span className="font-brand text-2xl font-bold tracking-[0.15em] text-[#FFF7E8] block">
                    STICHLY&CO.
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#B89B66] block">
                    Luxury Bespoke Marketplace Pvt. Ltd.
                  </span>
                  <span className="text-[10px] text-[#8C7A68] block mt-1">
                    GSTIN: 07AAACS1429B1Z8 • SAC Code: 9988 (Custom Tailoring)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">
                    INVOICE #{selectedInvoiceTxn.id}
                  </span>
                  <span className="text-[10px] text-[#8C7A68] block">
                    Date: {selectedInvoiceTxn.timestamp}
                  </span>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600/30">
                    PAID VIA {selectedInvoiceTxn.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-[#140C08] p-3.5 rounded-xl border border-[#2D180F]">
                <div>
                  <span className="text-[10px] uppercase text-[#8C7A68] font-bold block mb-1">
                    Billed To (Client):
                  </span>
                  <div className="font-semibold text-[#FFF]">{selectedInvoiceTxn.customerName}</div>
                  <div className="text-[#A89885]">Client ID: {selectedInvoiceTxn.customerId}</div>
                  <div className="text-[#A89885]">India</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#8C7A68] font-bold block mb-1">
                    Fulfilling Atelier:
                  </span>
                  <div className="font-semibold text-[#E5C378]">{selectedInvoiceTxn.atelierName}</div>
                  <div className="text-[#A89885]">Master Artisan: {selectedInvoiceTxn.tailorName}</div>
                  <div className="text-[#A89885]">Verified Bespoke Partner</div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="border border-[#2D180F] rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-[#160D08] text-[#8C7A68] uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Description</th>
                      <th className="py-2.5 px-3 text-left">Stage / Type</th>
                      <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26140B]">
                    <tr>
                      <td className="py-3 px-3">
                        <strong className="text-[#FFF] block">{selectedInvoiceTxn.garmentTitle}</strong>
                        <span className="text-[10px] text-[#A89885]">
                          Order Reference #{selectedInvoiceTxn.orderId}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#D8C9B5]">
                        {selectedInvoiceTxn.paymentType.replace(/_/g, ' ')}
                      </td>
                      <td className="py-3 px-3 text-right font-serif font-bold text-[#FFF]">
                        ₹{(selectedInvoiceTxn.amount - selectedInvoiceTxn.gstAmount).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="bg-[#140C08] text-[11px] text-[#A89885]">
                      <td colSpan={2} className="py-2 px-3 text-right">
                        Applicable GST (5% Textile / Tailoring):
                      </td>
                      <td className="py-2 px-3 text-right font-serif text-[#D4AF37]">
                        ₹{selectedInvoiceTxn.gstAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="bg-[#1B0F0A] font-bold text-sm">
                      <td colSpan={2} className="py-3 px-3 text-right text-[#FFF]">
                        Total Amount Paid:
                      </td>
                      <td className="py-3 px-3 text-right font-serif text-[#E5C378]">
                        ₹{selectedInvoiceTxn.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Escrow Guarantee Clause */}
              <div className="p-3 bg-emerald-950/20 border border-emerald-600/30 rounded-xl text-[11px] text-emerald-200/90 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Escrow Security Covenant:</strong> This payment is held in the STICHLY&CO. Escrow Trust Account. Funds will be remitted to {selectedInvoiceTxn.atelierName} exclusively after trial fitting approval.
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#3D2619]">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded bg-[#2D180F] hover:bg-[#3D2214] text-[#E5C378] text-xs font-semibold border border-[#D4AF37]/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceTxn(null)}
                  className="px-5 py-2 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
