import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderItem } from '../types';
import { NegotiationCard } from '../components/NegotiationCard';
import { VisualOrderTimeline } from '../components/VisualOrderTimeline';
import {
  ShoppingBag,
  Scissors,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  CreditCard,
  Lock,
  ShieldCheck
} from 'lucide-react';

export const OrdersNegotiationsPage: React.FC = () => {
  const {
    orders,
    currentRole,
    currentCustomer,
    currentTailor,
    updateOrderStage,
    startOrGetConversation,
    setCurrentView,
    selectedOrderId,
    setSelectedOrderId,
    setPaymentModalOrder
  } = useApp();

  // Role-based filtering:
  // If role is Customer: see only their own orders
  // If role is Tailor: see only orders placed with their atelier
  // If role is Admin: see all orders
  const relevantOrders = orders.filter((o) => {
    if (currentRole === 'CUSTOMER') return o.customerId === currentCustomer.id;
    if (currentRole === 'TAILOR') return o.tailorId === currentTailor.id;
    return true; // ADMIN
  });

  const activeOrder = relevantOrders.find((o) => o.id === selectedOrderId) || relevantOrders[0];

  const handleOpenChat = (order: OrderItem) => {
    startOrGetConversation(order.customerId, order.tailorId, order.id);
    setCurrentView('CHAT');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bespoke Order Management</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFF7E8]">
            Orders & Price Negotiations
          </h1>
          <p className="text-xs sm:text-sm text-[#A89885] mt-2 font-light">
            Review active atelier quotations, submit counter-offers in Indian Rupees (₹), track 12-stage craftsmanship milestones, and schedule trial fittings.
          </p>
        </div>

        {relevantOrders.length === 0 ? (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-12 text-center max-w-lg mx-auto shadow-xl">
            <Scissors className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl text-[#FFF7E8] font-bold">No Active Bespoke Orders</h3>
            <p className="text-xs text-[#A89885] mt-2 mb-6 font-light">
              {currentRole === 'CUSTOMER'
                ? "You haven't requested any custom garments yet. Start with our Design Studio or explore Bespoke Masters."
                : "No incoming bespoke requests for your atelier at the moment."}
            </p>
            {currentRole === 'CUSTOMER' && (
              <button
                onClick={() => setCurrentView('DESIGN_STUDIO')}
                className="px-6 py-3 rounded bg-[#D4AF37] text-[#120B08] text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Create Your Design Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Orders Selector Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 px-1">
                Your Bespoke Requests ({relevantOrders.length})
              </div>

              {relevantOrders.map((ord) => {
                const isSelected = activeOrder?.id === ord.id;
                const isPriceAgreed = ord.negotiationStatus === 'PRICE_AGREED';

                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#2E1A10] shadow-xl'
                        : 'border-[#3D2619] bg-[#1A0F0A] hover:border-[#5C3720]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-[#A6947D]">#{ord.id}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isPriceAgreed
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                            : 'bg-[#3B2213] text-[#FFDA79] border border-[#D4AF37]/40'
                        }`}
                      >
                        {isPriceAgreed ? 'Price Locked' : ord.stage.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#FFF] line-clamp-1">
                      {ord.garmentTitle}
                    </h4>

                    <div className="text-xs text-[#A89885] mt-1">
                      Atelier:{' '}
                      <span className="text-[#D8C9B5] font-medium">{ord.atelierName}</span> ({ord.tailorCity})
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#29170E] text-xs">
                      <span className="text-[11px] text-[#8C7A68]">
                        Quote: <strong className="text-[#E5C378] font-serif">₹{ord.currentQuote.toLocaleString('en-IN')}</strong>
                      </span>
                      <span className="text-[10px] text-[#8C7A68]">
                        Est. Delivery: {ord.deliveryEstimatedDate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Order Workspace (8 Cols) */}
            {activeOrder && (
              <div className="lg:col-span-8 space-y-8">
                {/* 1. Core Price Negotiation Card */}
                <NegotiationCard
                  order={activeOrder}
                  onOpenChat={() => handleOpenChat(activeOrder)}
                />

                {/* 2. Visual 12-Stage Timeline Tracker */}
                <VisualOrderTimeline
                  currentStage={activeOrder.stage}
                  canEdit={currentRole === 'TAILOR' || currentRole === 'ADMIN'}
                  onUpdateStage={(newStage) => updateOrderStage(activeOrder.id, newStage)}
                />

                {/* 3. Escrow Payment & Transactions Card */}
                <div className="bg-[#1A0F0A] border border-[#442817] rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2C1910]">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#D4AF37]" />
                      <h4 className="font-serif text-lg font-bold text-[#FFF7E8]">
                        Online Payment & Escrow Vault Ledger
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentView('TRANSACTIONS')}
                        className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>All Transactions</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        activeOrder.paymentStatus === 'FULLY_PAID'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                          : activeOrder.paymentStatus === 'ADVANCE_PAID'
                          ? 'bg-amber-950 text-amber-300 border border-amber-600/40'
                          : 'bg-[#2E1A10] text-[#D4AF37] border border-[#D4AF37]/30'
                      }`}>
                        {activeOrder.paymentStatus?.replace(/_/g, ' ') || 'UNPAID'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#140C08] rounded-xl border border-[#2F1B10]">
                    <div>
                      <div className="text-[10px] uppercase text-[#8C7A68]">Total Paid in Escrow</div>
                      <div className="font-serif text-2xl font-bold text-[#E5C378]">
                        ₹{(activeOrder.paidAmount || 0).toLocaleString('en-IN')}
                        <span className="text-xs text-[#8C7A68] font-sans font-normal ml-1">
                          / ₹{(activeOrder.agreedPrice || activeOrder.currentQuote).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A6947D] mt-0.5">
                        Funds are protected in STICHLY&CO. Escrow until trial fitting approval.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeOrder.paymentStatus !== 'FULLY_PAID' ? (
                        <button
                          onClick={() => setPaymentModalOrder(activeOrder)}
                          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>
                            {activeOrder.paymentStatus === 'ADVANCE_PAID' ? 'Pay Final Balance' : 'Pay Online (Escrow)'}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentView('TRANSACTIONS')}
                          className="px-4 py-2 rounded-lg bg-[#2D180F] text-[#E5C378] text-xs font-semibold border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>View Tax Invoice</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Transaction history for this order */}
                  {activeOrder.transactions && activeOrder.transactions.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] text-[#8C7A68] uppercase font-semibold block">
                        Recorded Payment Receipts
                      </span>
                      {activeOrder.transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="p-3 bg-[#160D08] rounded-lg border border-[#3E2415] flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-mono text-[#D4AF37] font-bold">{tx.id}</div>
                            <div className="text-[10px] text-[#A6947D]">
                              {tx.timestamp} • {tx.paymentMethod} • {tx.paymentType.replace(/_/g, ' ')}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif font-bold text-sm text-[#FFF]">
                              ₹{tx.amount.toLocaleString('en-IN')}
                            </div>
                            <span className="text-[9px] text-emerald-400 font-medium">
                              {tx.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Bespoke Garment Specifications Details */}
                <div className="bg-[#1A0F0A] border border-[#442817] rounded-xl p-6 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#2C1910] mb-4">
                    <h4 className="font-serif text-lg font-bold text-[#FFF7E8]">
                      Design Specifications & Fabric Manifest
                    </h4>
                    <button
                      onClick={() => handleOpenChat(activeOrder)}
                      className="px-3 py-1.5 bg-[#2E1A10] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] rounded border border-[#D4AF37]/30 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Atelier</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#D8C9B5]">
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Silhouette</span>
                      <span className="font-semibold text-[#FFF]">{activeOrder.designSpecs?.garmentType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Gender & Attire</span>
                      <span className="font-semibold text-[#FFF]">{activeOrder.designSpecs?.gender} • {activeOrder.designSpecs?.attireType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Fabric Selected</span>
                      <span className="font-semibold text-[#E5C378]">{activeOrder.designSpecs?.fabric}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Color / Tone</span>
                      <span className="font-semibold text-[#FFF]">{activeOrder.designSpecs?.color}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Embroidery</span>
                      <span className="font-semibold text-[#FFF]">{activeOrder.designSpecs?.embroidery || 'None'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase">Buttons / Placket</span>
                      <span className="font-semibold text-[#FFF]">{activeOrder.designSpecs?.buttons || 'Concealed Placket'}</span>
                    </div>
                  </div>

                  {activeOrder.designSpecs?.specialInstructions && (
                    <div className="mt-4 pt-3 border-t border-[#29170E] text-xs text-[#BAA995]">
                      <span className="text-[10px] text-[#8C7A68] block uppercase mb-1">Tailor Instructions</span>
                      <p className="italic font-light">"{activeOrder.designSpecs.specialInstructions}"</p>
                    </div>
                  )}

                  {activeOrder.referenceImages?.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#29170E]">
                      <span className="text-[10px] text-[#8C7A68] block uppercase mb-2">Reference Images</span>
                      <div className="flex gap-2">
                        {activeOrder.referenceImages.map((img, i) => (
                          <img key={i} src={img} alt="Reference" className="w-16 h-16 rounded object-cover border border-[#3E2415]" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
