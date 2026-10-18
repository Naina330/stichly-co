import React, { useState } from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import { INDIAN_CITIES } from '../data/categories';
import {
  Scissors,
  Sparkles,
  MapPin,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  User,
  Menu,
  X,
  Camera,
  Layers,
  HelpCircle,
  ChevronDown,
  Heart,
  CreditCard,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentRole,
    setCurrentRole,
    currentCustomer,
    currentTailor,
    currentAdmin,
    allCustomers,
    allTailors,
    switchCustomerUser,
    switchTailorUser,
    selectedCity,
    setSelectedCity,
    orders,
    setActiveAttireFilter,
    conversations
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [menDropdownOpen, setMenDropdownOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);

  // Unread or active negotiation count isolated to current authenticated role
  const activeNegotiationsCount = orders.filter((o) => {
    if (currentRole === 'CUSTOMER' && o.customerId !== currentCustomer.id) return false;
    if (currentRole === 'TAILOR' && o.tailorId !== currentTailor.id) return false;
    return o.negotiationStatus === 'IN_NEGOTIATION' || o.negotiationStatus === 'PENDING_QUOTE';
  }).length;

  const navigateTo = (view: ActiveView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setMenDropdownOpen(false);
    setWomenDropdownOpen(false);
  };

  const handleGenderSelect = (gender: 'Men' | 'Women', attireType?: 'Indian' | 'Western') => {
    setActiveAttireFilter(attireType ? { gender, attireType } : { gender });
    navigateTo(gender === 'Men' ? 'MEN' : 'WOMEN');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#140C08]/95 backdrop-blur-md border-b border-[#3D2619]">
        {/* Top utility announcement banner */}
        <div className="bg-[#0D0705] text-[#D8C7A9] text-xs py-1.5 px-4 border-b border-[#29170E]/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-serif italic text-[#E5C378]">India's Premier Luxury Bespoke Tailoring Marketplace</span>
            <span className="hidden md:inline text-[#7D6B58]">•</span>
            <span className="hidden md:inline text-[#A89885]">Direct Artisan Communication & Live Price Negotiation (₹)</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 text-[#E0D2C0]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs text-[#E5C378] focus:outline-none cursor-pointer border-b border-transparent hover:border-[#D4AF37]/50"
              >
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#1C100A] text-[#EDE4D8]">
                    {city === 'All Cities' ? 'All India (Masters)' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Persona Switcher Quick Pill */}
            <button
              onClick={() => setRoleModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#2B180E] hover:bg-[#3D2314] text-[#E5C378] px-2.5 py-0.5 rounded border border-[#D4AF37]/30 transition-all cursor-pointer"
              title="Switch user role between Customer, Tailor, and Founder"
            >
              <User className="w-3 h-3 text-[#D4AF37]" />
              <span className="font-medium">
                Role:{' '}
                <span className="text-[#FFF5DC] underline decoration-[#D4AF37]">
                  {currentRole === 'ADMIN'
                    ? 'Founder / Admin'
                    : currentRole === 'TAILOR'
                    ? `Atelier: ${currentTailor.atelierName.slice(0, 15)}...`
                    : `Client: ${currentCustomer.name.split(' ')[0]}`}
                </span>
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              onClick={() => navigateTo('HOME')}
              className="cursor-pointer flex flex-col group transition-transform"
            >
              <span className="font-brand text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#FFF7E8] group-hover:text-[#E5C378] transition-colors flex items-center gap-2">
                STICHLY&CO.
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89B66] -mt-0.5 font-light">
                Masterfully Sewn. Precisely Yours.
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm text-[#E2D4C0]">
              <button
                onClick={() => navigateTo('HOME')}
                className={`px-3 py-2 rounded font-medium transition-colors ${
                  currentView === 'HOME' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
              >
                Home
              </button>

              {/* MEN Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setMenDropdownOpen(true)}
                onMouseLeave={() => setMenDropdownOpen(false)}
              >
                <button
                  onClick={() => handleGenderSelect('Men')}
                  className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1 ${
                    currentView === 'MEN' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                  }`}
                >
                  Men
                  <ChevronDown className="w-3.5 h-3.5 text-[#B89B66]" />
                </button>
                {menDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-[#1B100B] border border-[#442817] rounded shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 px-2">
                      Men's Bespoke
                    </div>
                    <button
                      onClick={() => handleGenderSelect('Men', 'Indian')}
                      className="w-full text-left px-2 py-1.5 rounded text-xs text-[#EADFCF] hover:bg-[#2C1910] hover:text-[#FFF] flex justify-between"
                    >
                      <span>Indian Wear</span>
                      <span className="text-[10px] text-[#A6937C]">Sherwani, Bandhgala, Kurta</span>
                    </button>
                    <button
                      onClick={() => handleGenderSelect('Men', 'Western')}
                      className="w-full text-left px-2 py-1.5 rounded text-xs text-[#EADFCF] hover:bg-[#2C1910] hover:text-[#FFF] flex justify-between"
                    >
                      <span>Western Wear</span>
                      <span className="text-[10px] text-[#A6937C]">Suits, Tuxedos, Blazers</span>
                    </button>
                    <div className="border-t border-[#3A2214] my-2" />
                    <button
                      onClick={() => handleGenderSelect('Men')}
                      className="w-full text-left px-2 py-1 text-xs text-[#D4AF37] font-medium hover:underline"
                    >
                      Explore All Men's Attire →
                    </button>
                  </div>
                )}
              </div>

              {/* WOMEN Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setWomenDropdownOpen(true)}
                onMouseLeave={() => setWomenDropdownOpen(false)}
              >
                <button
                  onClick={() => handleGenderSelect('Women')}
                  className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1 ${
                    currentView === 'WOMEN' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                  }`}
                >
                  Women
                  <ChevronDown className="w-3.5 h-3.5 text-[#B89B66]" />
                </button>
                {womenDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-[#1B100B] border border-[#442817] rounded shadow-2xl p-3 z-50 animate-in fade-in">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 px-2">
                      Women's Bespoke
                    </div>
                    <button
                      onClick={() => handleGenderSelect('Women', 'Indian')}
                      className="w-full text-left px-2 py-1.5 rounded text-xs text-[#EADFCF] hover:bg-[#2C1910] hover:text-[#FFF] flex justify-between"
                    >
                      <span>Indian Wear</span>
                      <span className="text-[10px] text-[#A6937C]">Lehenga, Blouse, Anarkali</span>
                    </button>
                    <button
                      onClick={() => handleGenderSelect('Women', 'Western')}
                      className="w-full text-left px-2 py-1.5 rounded text-xs text-[#EADFCF] hover:bg-[#2C1910] hover:text-[#FFF] flex justify-between"
                    >
                      <span>Western Wear</span>
                      <span className="text-[10px] text-[#A6937C]">Gowns, Dresses, Blazers</span>
                    </button>
                    <div className="border-t border-[#3A2214] my-2" />
                    <button
                      onClick={() => handleGenderSelect('Women')}
                      className="w-full text-left px-2 py-1 text-xs text-[#D4AF37] font-medium hover:underline"
                    >
                      Explore All Women's Attire →
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo('TAILORS')}
                className={`px-3 py-2 rounded font-medium transition-colors ${
                  currentView === 'TAILORS' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
              >
                Bespoke Masters
              </button>

              <button
                onClick={() => navigateTo('DESIGN_STUDIO')}
                className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'DESIGN_STUDIO'
                    ? 'text-[#FFF5DD] bg-[#3B2213] border border-[#D4AF37]/50'
                    : 'text-[#E5C378] hover:text-[#FFF7E8]'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Design Studio</span>
              </button>

              <button
                onClick={() => navigateTo('DESIGN_GALLERY')}
                className={`px-3 py-2 rounded font-medium transition-colors ${
                  currentView === 'DESIGN_GALLERY' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
              >
                Lookbook
              </button>

              <button
                onClick={() => navigateTo('SCANNER')}
                className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'SCANNER' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden xl:inline">AI Scanner</span>
              </button>

              <button
                onClick={() => navigateTo('ASSISTANT')}
                className={`px-3 py-1.5 rounded-full font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 ${
                  currentView === 'ASSISTANT'
                    ? 'text-[#120B08] bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 ring-2 ring-[#D4AF37]'
                    : 'text-[#E5C378] bg-[#2C1910] border border-[#D4AF37]/50 hover:bg-[#3D2314] hover:text-[#FFF] shadow'
                }`}
                title="Stichly AI Bespoke Fashion Concierge"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>AI Assist</span>
              </button>

              {/* Orders & Negotiations */}
              <button
                onClick={() => navigateTo('ORDERS')}
                className={`px-3 py-2 rounded font-medium transition-colors relative flex items-center gap-1.5 ${
                  currentView === 'ORDERS' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Orders</span>
                {activeNegotiationsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#D4AF37] text-[#120B08] text-[10px] font-bold rounded-full">
                    {activeNegotiationsCount}
                  </span>
                )}
              </button>

              {/* Online Transactions & Escrow */}
              <button
                onClick={() => navigateTo('TRANSACTIONS')}
                className={`px-3 py-2 rounded font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'TRANSACTIONS' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
                title="Online Transactions & Escrow Vault"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Transactions</span>
              </button>

              {/* Chat */}
              <button
                onClick={() => navigateTo('CHAT')}
                className={`px-2.5 py-2 rounded font-medium transition-colors relative ${
                  currentView === 'CHAT' ? 'text-[#E5C378] bg-[#2A170F]' : 'hover:text-[#FFF7E8]'
                }`}
                title="Bespoke Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* Role-Specific Portal Button */}
              {currentRole === 'TAILOR' && (
                <button
                  onClick={() => navigateTo('TAILOR_DASHBOARD')}
                  className="ml-2 px-3 py-1.5 rounded bg-[#3D2314] hover:bg-[#4E2E1B] text-[#FFF] text-xs font-semibold border border-[#D4AF37]/40 flex items-center gap-1.5"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>My Atelier</span>
                </button>
              )}

              {currentRole === 'ADMIN' && (
                <button
                  onClick={() => navigateTo('ADMIN_DASHBOARD')}
                  className="ml-2 px-3 py-1.5 rounded bg-gradient-to-r from-[#59341B] to-[#7D4721] hover:from-[#6A3F22] hover:to-[#8E5127] text-[#FFF7E8] text-xs font-bold border border-[#D4AF37]/60 shadow-lg flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFDA79]" />
                  <span>Founder Portal</span>
                </button>
              )}
            </nav>

            {/* Right CTAs (CTA to Create Design or Profile) */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => navigateTo('PROFILE')}
                className="p-2 text-[#D9C8B2] hover:text-[#FFF] hover:bg-[#2A170F] rounded-full transition-colors"
                title="My Profile & Measurements"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigateTo('DESIGN_STUDIO')}
                className="bg-gradient-to-r from-[#C29B27] via-[#D4AF37] to-[#B38A18] hover:from-[#D4AF37] hover:to-[#C29B27] text-[#140C08] px-4 py-2 rounded font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Create Your Design</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => navigateTo('ORDERS')}
                className="p-2 text-[#D9C8B2] relative"
                aria-label="Orders"
              >
                <ShoppingBag className="w-5 h-5" />
                {activeNegotiationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#D9C8B2] hover:text-[#FFF] focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#160D08] border-b border-[#3D2619] px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C1910]">
              <span className="text-xs uppercase tracking-wider text-[#A89885]">Active Persona</span>
              <button
                onClick={() => {
                  setRoleModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#E5C378] underline"
              >
                Switch Role ({currentRole})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => navigateTo('HOME')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Home
              </button>
              <button
                onClick={() => handleGenderSelect('Men')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Men's Bespoke
              </button>
              <button
                onClick={() => handleGenderSelect('Women')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Women's Bespoke
              </button>
              <button
                onClick={() => navigateTo('TAILORS')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Bespoke Masters
              </button>
              <button
                onClick={() => navigateTo('DESIGN_STUDIO')}
                className="p-2.5 rounded bg-[#3D2314] text-left text-[#E5C378] font-medium border border-[#D4AF37]/30"
              >
                Design Studio
              </button>
              <button
                onClick={() => navigateTo('DESIGN_GALLERY')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Lookbook Gallery
              </button>
              <button
                onClick={() => navigateTo('SCANNER')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Visual Scanner
              </button>
              <button
                onClick={() => navigateTo('ASSISTANT')}
                className="p-2.5 rounded bg-[#3D2314] text-left text-[#E5C378] font-bold border border-[#D4AF37]/50 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AI Assist</span>
              </button>
              <button
                onClick={() => navigateTo('TRANSACTIONS')}
                className="p-2.5 rounded bg-[#2E1A10] text-left text-[#FFF] font-medium border border-[#3E2415] flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Transactions</span>
              </button>
              <button
                onClick={() => navigateTo('ORDERS')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF] flex justify-between"
              >
                <span>My Orders</span>
                {activeNegotiationsCount > 0 && (
                  <span className="text-[#D4AF37] font-bold">({activeNegotiationsCount})</span>
                )}
              </button>
              <button
                onClick={() => navigateTo('CHAT')}
                className="p-2.5 rounded bg-[#24140D] text-left text-[#EADFCF]"
              >
                Private Chat
              </button>
            </div>

            {currentRole === 'TAILOR' && (
              <button
                onClick={() => navigateTo('TAILOR_DASHBOARD')}
                className="w-full py-2.5 px-4 rounded bg-[#3D2314] text-[#FFF] text-sm font-semibold border border-[#D4AF37]/40 flex items-center justify-center gap-2"
              >
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                <span>My Atelier Dashboard</span>
              </button>
            )}

            {currentRole === 'ADMIN' && (
              <button
                onClick={() => navigateTo('ADMIN_DASHBOARD')}
                className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#59341B] to-[#7D4721] text-[#FFF7E8] text-sm font-bold border border-[#D4AF37]/60 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFDA79]" />
                <span>Founder / Admin Portal</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('DESIGN_STUDIO')}
              className="w-full py-3 rounded bg-[#D4AF37] text-[#120B08] font-bold uppercase text-xs tracking-wider"
            >
              Start Custom Design
            </button>
          </div>
        )}
      </header>

      {/* Role Switcher & Authorization Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C100A] border border-[#52331F] rounded-lg max-w-xl w-full p-6 text-[#EADFCF] shadow-2xl relative">
            <button
              onClick={() => setRoleModalOpen(false)}
              className="absolute top-4 right-4 text-[#A89885] hover:text-[#FFF]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[11px] tracking-widest uppercase text-[#D4AF37] font-semibold">
                STICHLY&CO. Authentication & Role Switcher
              </span>
              <h3 className="font-serif text-2xl text-[#FFF7E8] mt-1">Select Active Marketplace Persona</h3>
              <p className="text-xs text-[#A89885] mt-1 max-w-md mx-auto">
                Test role-based access control. Tailors can only manage their atelier and private clients; customers see only their orders; only Founders have admin clearance.
              </p>
            </div>

            <div className="space-y-4">
              {/* CUSTOMER ROLES */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Accounts (Clients)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {allCustomers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        switchCustomerUser(c.id);
                        setRoleModalOpen(false);
                      }}
                      className={`p-3 rounded text-left border transition-all ${
                        currentRole === 'CUSTOMER' && currentCustomer.id === c.id
                          ? 'border-[#D4AF37] bg-[#2F1B10]'
                          : 'border-[#3D2619] bg-[#160D08] hover:border-[#5C3720]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-semibold text-[#FFF]">{c.name}</div>
                          <div className="text-[10px] text-[#A6937C]">{c.city}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* TAILOR ROLES */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Artisan / Tailor Ateliers (Vendors)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {allTailors.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        switchTailorUser(t.id);
                        setRoleModalOpen(false);
                      }}
                      className={`p-3 rounded text-left border transition-all ${
                        currentRole === 'TAILOR' && currentTailor.id === t.id
                          ? 'border-[#D4AF37] bg-[#2F1B10]'
                          : 'border-[#3D2619] bg-[#160D08] hover:border-[#5C3720]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <div className="text-xs font-semibold text-[#FFF] truncate">{t.atelierName}</div>
                          <div className="text-[10px] text-[#A6937C]">{t.city} • {t.name}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FOUNDER / ADMIN ROLES */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FFD700] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Founders & Executive Administrators</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCurrentRole('ADMIN');
                      setRoleModalOpen(false);
                      navigateTo('ADMIN_DASHBOARD');
                    }}
                    className={`p-3 rounded text-left border transition-all ${
                      currentRole === 'ADMIN'
                        ? 'border-[#D4AF37] bg-[#3B2213]'
                        : 'border-[#3D2619] bg-[#160D08] hover:border-[#5C3720]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#FFDA79]">Sunaina</div>
                    <div className="text-[10px] text-[#C2B099]">Founder & Creative Director</div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRole('ADMIN');
                      setRoleModalOpen(false);
                      navigateTo('ADMIN_DASHBOARD');
                    }}
                    className={`p-3 rounded text-left border transition-all ${
                      currentRole === 'ADMIN'
                        ? 'border-[#D4AF37] bg-[#3B2213]'
                        : 'border-[#3D2619] bg-[#160D08] hover:border-[#5C3720]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#FFDA79]">Simran Tyagi</div>
                    <div className="text-[10px] text-[#C2B099]">Co-Founder</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3A2214] flex justify-end">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 bg-[#2D190F] hover:bg-[#3D2314] text-xs font-medium rounded text-[#EADFCF]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
