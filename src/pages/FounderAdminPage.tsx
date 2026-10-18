import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Scissors,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  Settings,
  Star,
  Lock,
  CreditCard,
  Building
} from 'lucide-react';

export const FounderAdminPage: React.FC = () => {
  const {
    currentRole,
    currentAdmin,
    tailors,
    allCustomers,
    orders,
    reviews,
    transactions,
    releaseEscrowPayout,
    galleryItems,
    updateTailorStatus,
    setCurrentView
  } = useApp();

  // Strict role enforcement
  if (currentRole !== 'ADMIN') {
    return (
      <div className="py-24 bg-[#120B08] min-h-screen text-[#F4ECE1] text-center px-4">
        <div className="max-w-md mx-auto bg-[#1C100A] border border-red-900/60 p-8 rounded-2xl shadow-2xl">
          <Lock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#FFF]">Access Restricted</h2>
          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1 mb-4">
            Executive Founder Authorization Required
          </div>
          <p className="text-xs text-[#A89885] leading-relaxed mb-6 font-light">
            This administrative terminal is strictly reserved for STICHLY&CO. Founders (Sunaina & Simran Tyagi). Tailors and Clients do not possess administrative security clearance.
          </p>
          <button
            onClick={() => setCurrentView('HOME')}
            className="px-6 py-2.5 rounded bg-[#D4AF37] text-[#120B08] text-xs font-bold uppercase tracking-wider"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'analytics' | 'vendors' | 'orders' | 'transactions' | 'moderation'>('analytics');

  // Platform KPIs Calculations
  const totalGMV = orders.reduce((sum, o) => sum + (o.agreedPrice || o.currentQuote), 0);
  const platformCommission = Math.round(totalGMV * 0.1); // 10% platform fee
  const activeOrdersCount = orders.filter((o) => o.stage !== 'COMPLETED').length;
  const pendingTailorCount = tailors.filter((t) => t.status === 'PENDING_APPROVAL').length;

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founder Header */}
        <div className="bg-gradient-to-r from-[#29170E] via-[#3D2214] to-[#24130A] border border-[#5E361D] rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1C100A] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFDA79] shadow-lg flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#FFDA79] bg-[#1A0E08]/80 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 mb-1">
                <span>Executive Command Portal</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF7E8]">
                STICHLY&CO. Platform Administration
              </h1>
              <p className="text-xs text-[#D8C9B5] mt-0.5">
                Authenticated Founder: <strong className="text-[#FFF]">{currentAdmin.name}</strong> ({currentAdmin.title})
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase text-[#C2B099] block">Platform Marketplace Fee</span>
            <span className="font-serif text-2xl font-bold text-[#FFDA79]">10% Karigar Revenue Share</span>
            <div className="text-[10px] text-[#A6947D]">Settlement Currency: Indian Rupees (₹)</div>
          </div>
        </div>

        {/* Executive Platform KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A0F0A] p-5 rounded-xl border border-[#3E2415] shadow-lg">
            <div className="text-[10px] uppercase text-[#8C7A68]">Gross Merchandise Value (GMV)</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C378] mt-1">
              ₹{totalGMV.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Total bespoke volume facilitated</div>
          </div>

          <div className="bg-[#1A0F0A] p-5 rounded-xl border border-[#3E2415] shadow-lg">
            <div className="text-[10px] uppercase text-[#8C7A68]">Platform Revenue (10%)</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF] mt-1">
              ₹{platformCommission.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Net platform commission</div>
          </div>

          <div className="bg-[#1A0F0A] p-5 rounded-xl border border-[#3E2415] shadow-lg">
            <div className="text-[10px] uppercase text-[#8C7A68]">Verified Ateliers</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF] mt-1">
              {tailors.length}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Across 10 major Indian hubs</div>
          </div>

          <div className="bg-[#1A0F0A] p-5 rounded-xl border border-[#3E2415] shadow-lg">
            <div className="text-[10px] uppercase text-[#8C7A68]">Active Clients & Orders</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF] mt-1">
              {allCustomers.length} / {activeOrdersCount}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Registered clients / in progress</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#331C10] mb-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-[#D4AF37] text-[#FFDA79]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Marketplace Analytics
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'vendors'
                ? 'border-[#D4AF37] text-[#FFDA79]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Atelier & Vendor Approvals ({tailors.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-[#FFDA79]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Platform Orders & Negotiations ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'transactions'
                ? 'border-[#D4AF37] text-[#FFDA79]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Escrow Transactions & Vault ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-6 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'moderation'
                ? 'border-[#D4AF37] text-[#FFDA79]'
                : 'border-transparent text-[#A89885] hover:text-[#FFF]'
            }`}
          >
            Review & Content Moderation ({reviews.length})
          </button>
        </div>

        {/* Tab 1: Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-[#FFF7E8] mb-4">
                Popular Garment Silhouettes & Demand
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D8C9B5]">Royal Sherwanis & Achkans</span>
                    <span className="text-[#E5C378] font-bold">34% of Volume</span>
                  </div>
                  <div className="h-1.5 bg-[#140C08] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[34%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D8C9B5]">Bridal Zardozi Lehengas</span>
                    <span className="text-[#E5C378] font-bold">28% of Volume</span>
                  </div>
                  <div className="h-1.5 bg-[#140C08] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D8C9B5]">Jodhpuri Bandhgalas</span>
                    <span className="text-[#E5C378] font-bold">20% of Volume</span>
                  </div>
                  <div className="h-1.5 bg-[#140C08] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[20%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D8C9B5]">Savile Row Tuxedos & Suits</span>
                    <span className="text-[#E5C378] font-bold">12% of Volume</span>
                  </div>
                  <div className="h-1.5 bg-[#140C08] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[12%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-[#FFF7E8] mb-4">
                Regional Hub Distribution
              </h3>
              <div className="space-y-2.5 text-xs text-[#D8C9B5]">
                <div className="flex justify-between py-2 border-b border-[#2C1910]">
                  <span>Delhi NCR (Chandni Chowk, Connaught Place, Noida)</span>
                  <span className="font-bold text-[#FFF]">₹14,500 Avg Order</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#2C1910]">
                  <span>Mumbai (Bandra West, Pali Hill)</span>
                  <span className="font-bold text-[#FFF]">₹12,800 Avg Order</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#2C1910]">
                  <span>Jaipur (Johari Bazaar, C-Scheme)</span>
                  <span className="font-bold text-[#FFF]">₹9,200 Avg Order</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#2C1910]">
                  <span>Bengaluru (Indiranagar, Lavelle Road)</span>
                  <span className="font-bold text-[#FFF]">₹8,600 Avg Order</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Lucknow (Hazratganj, Chowk)</span>
                  <span className="font-bold text-[#FFF]">₹9,800 Avg Order</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vendor Approvals */}
        {activeTab === 'vendors' && (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">
              Atelier Directory & Verification Controls
            </h3>
            <p className="text-xs text-[#A89885] mb-4">
              Founders hold sole authority to approve or suspend atelier credentials and enforce craftsmanship standards.
            </p>

            <div className="divide-y divide-[#2C1910]">
              {tailors.map((tailor) => (
                <div key={tailor.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={tailor.avatar} alt={tailor.name} className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]" />
                    <div>
                      <div className="font-serif text-base font-bold text-[#FFF]">{tailor.atelierName}</div>
                      <div className="text-xs text-[#A89885]">{tailor.name} • {tailor.city} ({tailor.locality})</div>
                      <div className="text-[10px] text-[#D4AF37]">{tailor.yearsExperience} yrs exp • {tailor.specialties.join(', ')}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      tailor.status === 'ACTIVE'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-600/40'
                    }`}>
                      {tailor.status}
                    </span>

                    {tailor.status !== 'ACTIVE' ? (
                      <button
                        onClick={() => updateTailorStatus(tailor.id, 'ACTIVE')}
                        className="px-3 py-1 bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold rounded flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Atelier</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTailorStatus(tailor.id, 'SUSPENDED')}
                        className="px-3 py-1 bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-medium rounded border border-red-800/40"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Orders & Negotiations */}
        {activeTab === 'orders' && (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-4">
              All Platform Bespoke Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8C9B5]">
                <thead className="bg-[#140C08] text-[#8C7A68] uppercase text-[10px] border-b border-[#2C1910]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Atelier</th>
                    <th className="p-3">Garment</th>
                    <th className="p-3">Quote (₹)</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Negotiation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#24130A]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#1E110A]">
                      <td className="p-3 font-mono text-[#D4AF37]">#{ord.id}</td>
                      <td className="p-3 font-semibold text-[#FFF]">{ord.customerName}</td>
                      <td className="p-3">{ord.atelierName} ({ord.tailorCity})</td>
                      <td className="p-3">{ord.garmentTitle}</td>
                      <td className="p-3 font-serif font-bold text-[#E5C378]">
                        ₹{(ord.agreedPrice || ord.currentQuote).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-[#2C1910] text-[#FFF] text-[10px]">
                          {ord.stage}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold text-[#D4AF37]">
                          {ord.negotiationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Escrow Transactions & Vault */}
        {activeTab === 'transactions' && (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C1910]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FFF7E8]">
                  Escrow Vault & Karigar Payout Ledger
                </h3>
                <p className="text-xs text-[#A89885] mt-0.5">
                  Payments are locked in escrow until the client trial fitting. Founders disburse 90% artisan payout upon trial completion.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#D4AF37] font-semibold bg-[#2C1910] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  Total Transactions: {transactions.length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8C9B5]">
                <thead className="bg-[#140C08] text-[#8C7A68] uppercase text-[10px] border-b border-[#2C1910]">
                  <tr>
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Order / Garment</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Atelier</th>
                    <th className="p-3">Gross (₹)</th>
                    <th className="p-3">Platform 10%</th>
                    <th className="p-3">Artisan Payout</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Escrow Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#24130A]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#1E110A]">
                      <td className="p-3 font-mono font-bold text-[#D4AF37]">{tx.id}</td>
                      <td className="p-3 font-medium text-[#FFF]">{tx.garmentTitle}</td>
                      <td className="p-3">{tx.customerName}</td>
                      <td className="p-3">{tx.atelierName}</td>
                      <td className="p-3 font-serif font-bold text-sm text-[#E5C378]">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-serif text-[#A89885]">
                        ₹{tx.platformCommission.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-serif font-bold text-[#FFF]">
                        ₹{tx.artisanPayoutAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-[#24130A] text-[#C2B099] text-[10px]">
                          {tx.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tx.status === 'RELEASED_TO_TAILOR'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-600/40'
                        }`}>
                          {tx.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-3">
                        {tx.status === 'HELD_IN_ESCROW' ? (
                          <button
                            onClick={() => releaseEscrowPayout(tx.id)}
                            className="px-2.5 py-1 bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-[10px] font-bold rounded shadow cursor-pointer whitespace-nowrap"
                          >
                            Release Payout
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#8C7A68]">Disbursed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Review Moderation */}
        {activeTab === 'moderation' && (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-2">
              Client Book of Records Moderation
            </h3>
            <p className="text-xs text-[#A89885] mb-4">
              Ensure all feedback reflects verified bespoke craftsmanship without fraudulent reviews.
            </p>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#140C08] rounded-lg border border-[#2F1B10] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#FFF] text-xs">{rev.customerName} ({rev.customerCity})</span>
                      <span className="text-[10px] text-[#D4AF37]">★ {rev.rating}</span>
                      <span className="text-[10px] text-[#8C7A68]">Crafted by {rev.atelierName}</span>
                    </div>
                    <p className="text-xs text-[#C9BAA6] italic font-light">"{rev.reviewText}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
