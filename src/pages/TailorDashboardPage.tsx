import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Plus,
  Upload,
  ShoppingBag,
  Clock,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Star,
  Layers,
  ArrowRight
} from 'lucide-react';
import { VisualOrderTimeline } from '../components/VisualOrderTimeline';
import { NegotiationCard } from '../components/NegotiationCard';

export const TailorDashboardPage: React.FC = () => {
  const {
    currentRole,
    currentTailor,
    orders,
    addPortfolioItemToTailor,
    updateOrderStage,
    startOrGetConversation,
    setCurrentView,
    setSelectedOrderId
  } = useApp();

  // Strict role check
  if (currentRole !== 'TAILOR') {
    return (
      <div className="py-20 bg-[#120B08] min-h-screen text-[#F4ECE1] text-center px-4">
        <div className="max-w-md mx-auto bg-[#1A0F0A] border border-[#442817] p-8 rounded-2xl shadow-xl">
          <AlertTriangle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">Atelier Access Restricted</h2>
          <p className="text-xs text-[#A89885] mt-2 mb-6 font-light">
            You are currently signed in as a Client ({currentRole}). Please use the top role selector to switch to an Artisan / Tailor profile to manage your atelier.
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

  // Tailor's orders only
  const tailorOrders = orders.filter((o) => o.tailorId === currentTailor.id);
  const activeNegotiations = tailorOrders.filter(
    (o) => o.negotiationStatus === 'IN_NEGOTIATION' || o.negotiationStatus === 'PENDING_QUOTE'
  );
  const activeFittings = tailorOrders.filter((o) => o.stage === 'TRIAL' || o.stage === 'CUTTING_STITCHING');

  // Form for Uploading Design / Finished Outfit
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newGarmentType, setNewGarmentType] = useState<string>('Sherwani');
  const [newGender, setNewGender] = useState<'Men' | 'Women'>('Men');
  const [newAttire, setNewAttire] = useState<'Indian' | 'Western'>('Indian');
  const [newPrice, setNewPrice] = useState<string>('9500');
  const [newFabric, setNewFabric] = useState<string>('Pure Raw Silk');
  const [newCraftDetails, setNewCraftDetails] = useState<string>('Hand-embroidered Zardozi with floating chest canvas');
  const [newImageUrl, setNewImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  );

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(newPrice, 10) || 5000;
    addPortfolioItemToTailor(currentTailor.id, {
      title: newTitle || `${newGender} Bespoke ${newGarmentType}`,
      garmentType: newGarmentType,
      gender: newGender,
      attireType: newAttire,
      imageUrl: newImageUrl,
      description: newCraftDetails,
      priceEstimate: priceNum,
      fabricUsed: newFabric,
      craftDetails: newCraftDetails
    });
    setShowUploadModal(false);
    setNewTitle('');
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Atelier Header Profile */}
        <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentTailor.avatar}
              alt={currentTailor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
            />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                Atelier Master Workspace
              </div>
              <h1 className="font-serif text-3xl font-bold text-[#FFF7E8]">
                {currentTailor.atelierName}
              </h1>
              <p className="text-xs text-[#A89885] mt-0.5">
                Master: {currentTailor.name} • {currentTailor.city} ({currentTailor.locality})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Work / Design</span>
            </button>
            <button
              onClick={() => setCurrentView('CHAT')}
              className="px-4 py-2.5 rounded bg-[#2A170F] hover:bg-[#3D2214] text-xs font-semibold text-[#FFF] border border-[#D4AF37]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>Inquiries</span>
            </button>
          </div>
        </div>

        {/* Atelier KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A0F0A] p-4 rounded-xl border border-[#3E2415]">
            <div className="text-[10px] uppercase text-[#8C7A68]">Total Requests</div>
            <div className="font-serif text-2xl font-bold text-[#FFF] mt-1">
              {tailorOrders.length}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Atelier orders queue</div>
          </div>

          <div className="bg-[#1A0F0A] p-4 rounded-xl border border-[#3E2415]">
            <div className="text-[10px] uppercase text-[#8C7A68]">Pending Negotiations</div>
            <div className="font-serif text-2xl font-bold text-[#E5C378] mt-1">
              {activeNegotiations.length}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Awaiting price agreement</div>
          </div>

          <div className="bg-[#1A0F0A] p-4 rounded-xl border border-[#3E2415]">
            <div className="text-[10px] uppercase text-[#8C7A68]">In Cutting & Trials</div>
            <div className="font-serif text-2xl font-bold text-[#FFF] mt-1">
              {activeFittings.length}
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">Fitting sessions scheduled</div>
          </div>

          <div className="bg-[#1A0F0A] p-4 rounded-xl border border-[#3E2415]">
            <div className="text-[10px] uppercase text-[#8C7A68]">Artisan Rating</div>
            <div className="font-serif text-2xl font-bold text-[#D4AF37] mt-1">
              {currentTailor.rating} ★
            </div>
            <div className="text-[10px] text-[#A6947D] mt-1">{currentTailor.reviewCount} client reviews</div>
          </div>
        </div>

        {/* Incoming Client Requests & Order Stages Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
              Active Client Orders & Negotiations
            </h2>
            <span className="text-xs text-[#A89885]">
              Update order stages (Cutting, Trial, Alterations, Delivery) directly
            </span>
          </div>

          {tailorOrders.length === 0 ? (
            <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-8 text-center text-[#A89885] text-xs">
              No orders placed with this atelier yet. You can upload designs below to be discovered by clients!
            </div>
          ) : (
            tailorOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#1A0F0A] border border-[#442817] rounded-xl p-6 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C1910]">
                  <div>
                    <span className="font-mono text-xs text-[#D4AF37]">Order #{ord.id}</span>
                    <h3 className="font-serif text-xl font-bold text-[#FFF] mt-0.5">
                      {ord.garmentTitle}
                    </h3>
                    <p className="text-xs text-[#A89885]">
                      Client: <span className="text-[#FFF] font-medium">{ord.customerName}</span> ({ord.customerCity})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#8C7A68] block">Current Quote</span>
                    <span className="font-serif text-2xl font-bold text-[#E5C378]">
                      ₹{ord.currentQuote.toLocaleString('en-IN')}
                    </span>
                    <div className="text-[10px] text-[#A6947D]">
                      Status: {ord.negotiationStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                {/* Live Negotiation Card */}
                <NegotiationCard order={ord} />

                {/* 12-Stage Visual Progress Controller */}
                <VisualOrderTimeline
                  currentStage={ord.stage}
                  canEdit={true}
                  onUpdateStage={(newStage) => updateOrderStage(ord.id, newStage)}
                />
              </div>
            ))
          )}
        </div>

        {/* Atelier Portfolio Showcase */}
        <div className="mt-12 pt-8 border-t border-[#331C10]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#FFF7E8]">
                Atelier Portfolio & Published Works
              </h2>
              <p className="text-xs text-[#A89885] mt-0.5">
                Showcase your finished garments to clients searching on STICHLY&CO.
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-[#2D180F] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] rounded border border-[#D4AF37]/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Creation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentTailor.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="h-52 relative overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-[#120B08]/80 px-2 py-0.5 rounded text-[10px] text-[#E5C378] font-bold">
                    ₹{item.priceEstimate.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] text-[#D4AF37] font-semibold uppercase mb-1">
                    {item.gender} • {item.attireType} • {item.garmentType}
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#FFF] line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A89885] line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1C100A] border border-[#52331F] rounded-xl max-w-lg w-full p-6 text-[#EADFCF] shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-[#FFF7E8] mb-1">
                Upload Bespoke Creation to Atelier
              </h3>
              <p className="text-xs text-[#A89885] mb-4">
                Publish a finished outfit, fabric swatch, or lookbook sample to attract discerning clients.
              </p>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Imperial Ivory Sherwani with Antique Resham"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Gender</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as any)}
                      className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Attire</label>
                    <select
                      value={newAttire}
                      onChange={(e) => setNewAttire(e.target.value as any)}
                      className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Western">Western</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Garment Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Bandhgala, Lehenga"
                      value={newGarmentType}
                      onChange={(e) => setNewGarmentType(e.target.value)}
                      className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Price Estimate (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 8500"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Fabric Used</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Banarasi Katan Silk"
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-[#D4AF37] block mb-1">Craft Details</label>
                  <textarea
                    rows={2}
                    placeholder="Describe construction, hand embroidery, horsehair canvas, etc."
                    value={newCraftDetails}
                    onChange={(e) => setNewCraftDetails(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-[#2D180F] text-xs text-[#A89885] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] text-[#120B08] text-xs font-bold rounded"
                  >
                    Publish to Lookbook
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
