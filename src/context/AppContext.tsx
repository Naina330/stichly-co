import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  CustomerUser,
  TailorUser,
  AdminUser,
  OrderItem,
  ChatConversation,
  CustomerReview,
  GalleryItem,
  OrderStage,
  MeasurementProfile,
  TailorPortfolioItem,
  GenderType,
  AttireType,
  BespokeTransaction,
  PaymentMethod,
  PaymentType,
  PaymentStatus
} from '../types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_TAILORS,
  INITIAL_FOUNDERS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_ORDERS,
  INITIAL_CONVERSATIONS,
  INITIAL_TRANSACTIONS
} from '../data/mockData';

export type ActiveView =
  | 'HOME'
  | 'MEN'
  | 'WOMEN'
  | 'TAILORS'
  | 'TAILOR_PROFILE'
  | 'DESIGN_STUDIO'
  | 'DESIGN_GALLERY'
  | 'SCANNER'
  | 'ASSISTANT'
  | 'ORDERS'
  | 'TRANSACTIONS'
  | 'CHAT'
  | 'TAILOR_DASHBOARD'
  | 'ADMIN_DASHBOARD'
  | 'PROFILE'
  | 'REVIEWS';

interface AppContextType {
  // Navigation & Views
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  selectedTailorId: string | null;
  setSelectedTailorId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  activeAttireFilter: { gender?: GenderType; attireType?: AttireType; category?: string } | null;
  setActiveAttireFilter: (filter: { gender?: GenderType; attireType?: AttireType; category?: string } | null) => void;

  // City selection
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Role & Auth
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentCustomer: CustomerUser;
  setCurrentCustomer: (cust: CustomerUser) => void;
  currentTailor: TailorUser;
  setCurrentTailor: (tailor: TailorUser) => void;
  currentAdmin: AdminUser;
  setCurrentAdmin: (admin: AdminUser) => void;

  // Role switching helpers
  allCustomers: CustomerUser[];
  allTailors: TailorUser[];
  allFounders: AdminUser[];
  switchCustomerUser: (id: string) => void;
  switchTailorUser: (id: string) => void;

  // Marketplace Data
  tailors: TailorUser[];
  galleryItems: GalleryItem[];
  orders: OrderItem[];
  conversations: ChatConversation[];
  reviews: CustomerReview[];
  transactions: BespokeTransaction[];

  // Online Transactions & Escrow
  paymentModalOrder: OrderItem | null;
  setPaymentModalOrder: (order: OrderItem | null) => void;
  executeTransaction: (data: {
    orderId: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: PaymentMethod;
    paymentDetails: {
      upiId?: string;
      cardLast4?: string;
      bankName?: string;
    };
  }) => BespokeTransaction;
  releaseEscrowPayout: (transactionId: string) => void;

  // Floating AI Assist Drawer / Concierge
  isAIAssistOpen: boolean;
  setIsAIAssistOpen: (open: boolean) => void;
  aiAssistInitialPrompt: string | null;
  setAiAssistInitialPrompt: (prompt: string | null) => void;
  openAIAssistWithPrompt: (prompt: string) => void;

  // Order & Negotiation Actions
  createOrder: (orderData: Partial<OrderItem>) => OrderItem;
  updateOrderStage: (orderId: string, stage: OrderStage) => void;
  submitCounterOffer: (orderId: string, amount: number, note?: string) => void;
  acceptQuoteOffer: (orderId: string) => void;
  rejectQuoteOffer: (orderId: string, note?: string) => void;

  // Chat Actions
  sendMessage: (conversationId: string, text: string, quotePayload?: any) => void;
  startOrGetConversation: (customerId: string, tailorId: string, orderId?: string) => string;

  // Tailor actions
  addPortfolioItemToTailor: (tailorId: string, item: Omit<TailorPortfolioItem, 'id' | 'likes'>) => void;
  updateTailorStatus: (tailorId: string, status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED') => void;

  // Customer actions
  toggleSaveDesign: (designId: string) => void;
  toggleFavoriteTailor: (tailorId: string) => void;
  saveMeasurementProfile: (profile: Omit<MeasurementProfile, 'id' | 'updatedAt'>) => void;
  deleteMeasurementProfile: (profileId: string) => void;
  submitReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;

  // Notification / toast feedback
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ActiveView>('HOME');
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [activeAttireFilter, setActiveAttireFilter] = useState<{
    gender?: GenderType;
    attireType?: AttireType;
    category?: string;
  } | null>(null);

  const [selectedCity, setSelectedCity] = useState<string>('All Cities');

  // Role & Users
  const [currentRole, setCurrentRole] = useState<UserRole>('CUSTOMER');
  const [allCustomers, setAllCustomers] = useState<CustomerUser[]>(() => {
    const saved = localStorage.getItem('stichly_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  const [allTailors, setAllTailors] = useState<TailorUser[]>(() => {
    const saved = localStorage.getItem('stichly_tailors');
    return saved ? JSON.parse(saved) : INITIAL_TAILORS;
  });
  const allFounders = INITIAL_FOUNDERS;

  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser>(allCustomers[0]);
  const [currentTailor, setCurrentTailor] = useState<TailorUser>(allTailors[0]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser>(allFounders[0]);

  // Marketplace items with persistence
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('stichly_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('stichly_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem('stichly_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('stichly_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [transactions, setTransactions] = useState<BespokeTransaction[]>(() => {
    const saved = localStorage.getItem('stichly_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Online Payment Checkout Modal
  const [paymentModalOrder, setPaymentModalOrder] = useState<OrderItem | null>(null);

  // Floating AI Assist Concierge Drawer
  const [isAIAssistOpen, setIsAIAssistOpen] = useState<boolean>(false);
  const [aiAssistInitialPrompt, setAiAssistInitialPrompt] = useState<string | null>(null);

  const openAIAssistWithPrompt = (prompt: string) => {
    setAiAssistInitialPrompt(prompt);
    setIsAIAssistOpen(true);
  };

  // Notification state
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('stichly_tailors', JSON.stringify(allTailors));
  }, [allTailors]);

  useEffect(() => {
    localStorage.setItem('stichly_customers', JSON.stringify(allCustomers));
  }, [allCustomers]);

  useEffect(() => {
    localStorage.setItem('stichly_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('stichly_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('stichly_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('stichly_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('stichly_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const switchCustomerUser = (id: string) => {
    const found = allCustomers.find((c) => c.id === id);
    if (found) {
      setCurrentCustomer(found);
      setCurrentRole('CUSTOMER');
      showNotification(`Switched active profile to ${found.name}`);
    }
  };

  const switchTailorUser = (id: string) => {
    const found = allTailors.find((t) => t.id === id);
    if (found) {
      setCurrentTailor(found);
      setCurrentRole('TAILOR');
      showNotification(`Switched active atelier to ${found.atelierName}`);
    }
  };

  // Order Actions
  const createOrder = (orderData: Partial<OrderItem>): OrderItem => {
    const newId = `ord-${Date.now().toString().slice(-4)}`;
    const newOrder: OrderItem = {
      id: newId,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerCity: currentCustomer.city,
      tailorId: orderData.tailorId || allTailors[0].id,
      tailorName: orderData.tailorName || allTailors[0].name,
      atelierName: orderData.atelierName || allTailors[0].atelierName,
      tailorCity: orderData.tailorCity || allTailors[0].city,
      garmentTitle: orderData.garmentTitle || 'Custom Bespoke Ensemble',
      designSpecs: orderData.designSpecs || {
        gender: 'Men',
        attireType: 'Indian',
        garmentType: 'Bandhgala',
        fabric: 'Banarasi Brocade & Katan Silk',
        color: 'Royal Champagne',
        pattern: 'Solid Tailored',
        sleeveStyle: 'Full Sleeve with French Cuffs',
        neckline: 'High Mandarin Collar',
        length: 'Standard Waist',
        fit: 'Structured Bespoke Cut'
      },
      referenceImages: orderData.referenceImages || [],
      measurementsSummary: orderData.measurementsSummary || 'Standard Atelier Profile Selected',
      stage: 'QUOTE_REQUESTED',
      currentQuote: orderData.currentQuote || 7500,
      initialQuote: orderData.currentQuote || 7500,
      negotiationStatus: 'PENDING_QUOTE',
      negotiationHistory: [
        {
          id: `neg-${Date.now()}`,
          senderRole: 'CUSTOMER',
          senderName: currentCustomer.name,
          amount: orderData.currentQuote || 7500,
          note: 'Bespoke design request submitted with measurements & inspiration.',
          timestamp: 'Just now',
          status: 'PENDING'
        }
      ],
      deliveryEstimatedDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also link or initiate conversation
    startOrGetConversation(newOrder.customerId, newOrder.tailorId, newOrder.id);
    showNotification(`Bespoke request sent to ${newOrder.atelierName}!`);
    return newOrder;
  };

  const updateOrderStage = (orderId: string, stage: OrderStage) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, stage, updatedAt: 'Just now' } : ord))
    );
    showNotification(`Order ${orderId} stage updated to ${stage.replace('_', ' ')}`);
  };

  const submitCounterOffer = (orderId: string, amount: number, note?: string) => {
    const senderRole: 'TAILOR' | 'CUSTOMER' = currentRole === 'TAILOR' ? 'TAILOR' : 'CUSTOMER';
    const senderName = currentRole === 'TAILOR' ? currentTailor.name : currentCustomer.name;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const newEntry = {
          id: `neg-${Date.now()}`,
          senderRole,
          senderName,
          amount,
          note: note || `Counter offer submitted for ₹${amount.toLocaleString('en-IN')}`,
          timestamp: 'Just now',
          status: 'PENDING' as const
        };
        return {
          ...ord,
          currentQuote: amount,
          negotiationStatus: 'IN_NEGOTIATION',
          stage: 'NEGOTIATION',
          negotiationHistory: [...ord.negotiationHistory, newEntry],
          updatedAt: 'Just now'
        };
      })
    );

    // Send quotation message into chat
    const conv = conversations.find((c) => c.orderId === orderId);
    if (conv) {
      sendMessage(conv.id, `Submitted counter offer: ₹${amount.toLocaleString('en-IN')}. ${note || ''}`, {
        amount,
        note: note || 'Counter offer',
        status: 'PENDING'
      });
    }

    showNotification(`Counter offer of ₹${amount.toLocaleString('en-IN')} submitted!`);
  };

  const acceptQuoteOffer = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const agreed = ord.currentQuote;
        const updatedHistory = ord.negotiationHistory.map((h, i) =>
          i === ord.negotiationHistory.length - 1 ? { ...h, status: 'ACCEPTED' as const } : h
        );
        return {
          ...ord,
          agreedPrice: agreed,
          negotiationStatus: 'PRICE_AGREED',
          stage: 'PRICE_AGREED',
          negotiationHistory: updatedHistory,
          updatedAt: 'Just now'
        };
      })
    );

    const conv = conversations.find((c) => c.orderId === orderId);
    if (conv) {
      sendMessage(
        conv.id,
        `✓ Price of ₹${orders.find((o) => o.id === orderId)?.currentQuote.toLocaleString('en-IN')} is agreed and locked! Proceeding to trial fittings & cutting.`
      );
    }
    showNotification('Offer accepted! Bespoke price locked.');
  };

  const rejectQuoteOffer = (orderId: string, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          negotiationStatus: 'DECLINED',
          updatedAt: 'Just now'
        };
      })
    );
    showNotification('Offer declined.');
  };

  // Online Transactions & Escrow Settlement
  const executeTransaction = (data: {
    orderId: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: PaymentMethod;
    paymentDetails: {
      upiId?: string;
      cardLast4?: string;
      bankName?: string;
    };
  }): BespokeTransaction => {
    const targetOrder = orders.find((o) => o.id === data.orderId);
    const txnId = `TXN-STICH-${Math.floor(10000 + Math.random() * 90000)}`;
    const gstAmount = Math.round(data.amount * 0.05); // 5% GST on tailoring
    const platformCommission = Math.round(data.amount * 0.1); // 10% platform share
    const artisanPayoutAmount = data.amount - platformCommission;

    const newTxn: BespokeTransaction = {
      id: txnId,
      orderId: data.orderId,
      garmentTitle: targetOrder?.garmentTitle || 'Bespoke Creation',
      customerId: targetOrder?.customerId || currentCustomer.id,
      customerName: targetOrder?.customerName || currentCustomer.name,
      tailorId: targetOrder?.tailorId || allTailors[0].id,
      tailorName: targetOrder?.tailorName || allTailors[0].name,
      atelierName: targetOrder?.atelierName || allTailors[0].atelierName,
      amount: data.amount,
      paymentType: data.paymentType,
      paymentMethod: data.paymentMethod,
      paymentDetails: data.paymentDetails,
      gstAmount,
      platformCommission,
      artisanPayoutAmount,
      status: 'HELD_IN_ESCROW',
      escrowReleaseConditions: `Secured in STICHLY&CO. Escrow Vault. Payout will be released to ${targetOrder?.atelierName} upon client approval of the first trial fitting.`,
      timestamp: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Update transactions list
    setTransactions((prev) => [newTxn, ...prev]);

    // Update the associated order
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== data.orderId) return ord;
        const currentPaid = (ord.paidAmount || 0) + data.amount;
        const totalCost = ord.agreedPrice || ord.currentQuote;
        const isFullyPaid = currentPaid >= totalCost || data.paymentType === 'FULL_PAYMENT';

        return {
          ...ord,
          paymentStatus: isFullyPaid ? 'FULLY_PAID' : 'ADVANCE_PAID',
          paidAmount: currentPaid,
          stage: ord.stage === 'NEGOTIATION' || ord.stage === 'PRICE_AGREED' || ord.stage === 'DESIGN_REQUEST'
            ? 'ORDER_CONFIRMED'
            : ord.stage,
          transactions: ord.transactions ? [newTxn, ...ord.transactions] : [newTxn],
          updatedAt: 'Just now'
        };
      })
    );

    // Send payment receipt notification into private chat
    const conv = conversations.find((c) => c.orderId === data.orderId);
    if (conv) {
      sendMessage(
        conv.id,
        `✓ Online Payment Confirmed: ₹${data.amount.toLocaleString('en-IN')} paid via ${data.paymentMethod}. Secured in STICHLY&CO. Escrow Vault (Ref #${txnId}). Atelier may proceed with cutting and pattern drafting!`
      );
    }

    showNotification(`Payment of ₹${data.amount.toLocaleString('en-IN')} successfully secured in Escrow Vault!`);
    return newTxn;
  };

  const releaseEscrowPayout = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((txn) => {
        if (txn.id !== transactionId) return txn;
        return {
          ...txn,
          status: 'RELEASED_TO_TAILOR',
          escrowReleaseConditions: 'Fitting trial approved by client. Payout released to master artisan bank account.'
        };
      })
    );
    showNotification(`Escrow funds for ${transactionId} released to Atelier account!`);
  };

  // Chat Actions
  const sendMessage = (conversationId: string, text: string, quotePayload?: any) => {
    const senderRole = currentRole;
    const senderId = currentRole === 'TAILOR' ? currentTailor.id : currentCustomer.id;
    const senderName = currentRole === 'TAILOR' ? currentTailor.atelierName : currentCustomer.name;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId,
      senderRole,
      senderName,
      text,
      timestamp: 'Just now',
      quotePayload
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;
        return {
          ...conv,
          lastMessage: text,
          lastTimestamp: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      })
    );
  };

  const startOrGetConversation = (customerId: string, tailorId: string, orderId?: string): string => {
    const existing = conversations.find(
      (c) => c.customerId === customerId && c.tailorId === tailorId && (!orderId || c.orderId === orderId)
    );
    if (existing) {
      return existing.id;
    }

    const customer = allCustomers.find((c) => c.id === customerId) || currentCustomer;
    const tailor = allTailors.find((t) => t.id === tailorId) || currentTailor;

    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      orderId,
      customerId,
      customerName: customer.name,
      customerAvatar: customer.avatar,
      tailorId,
      tailorName: tailor.name,
      atelierName: tailor.atelierName,
      tailorAvatar: tailor.avatar,
      lastMessage: 'Conversation opened for bespoke tailoring inquiry.',
      lastTimestamp: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          orderId,
          senderId: customerId,
          senderRole: 'CUSTOMER',
          senderName: customer.name,
          text: `Namaste! Inquiry initiated with ${tailor.atelierName}.`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConv.id;
  };

  // Tailor actions
  const addPortfolioItemToTailor = (tailorId: string, item: Omit<TailorPortfolioItem, 'id' | 'likes'>) => {
    const newItem: TailorPortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
      likes: 1
    };

    setAllTailors((prev) =>
      prev.map((t) => (t.id === tailorId ? { ...t, portfolio: [newItem, ...t.portfolio] } : t))
    );

    // Also add to marketplace gallery
    const newGalleryItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newItem.title,
      tailorId,
      tailorName: currentTailor.name,
      atelierName: currentTailor.atelierName,
      city: currentTailor.city,
      gender: newItem.gender,
      attireType: newItem.attireType,
      garmentType: newItem.garmentType,
      startingPrice: newItem.priceEstimate,
      imageUrl: newItem.imageUrl,
      likesCount: 1,
      fabric: newItem.fabricUsed,
      turnaroundDays: '7-12 days',
      tags: [newItem.garmentType, newItem.attireType, 'New Bespoke']
    };

    setGalleryItems((prev) => [newGalleryItem, ...prev]);
    showNotification('New bespoke creation published to atelier portfolio & gallery!');
  };

  const updateTailorStatus = (tailorId: string, status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SUSPENDED') => {
    setAllTailors((prev) => prev.map((t) => (t.id === tailorId ? { ...t, status } : t)));
    showNotification(`Tailor verification status updated to ${status}`);
  };

  // Customer Favorites & Saves
  const toggleSaveDesign = (designId: string) => {
    const exists = currentCustomer.savedDesignIds.includes(designId);
    const updatedIds = exists
      ? currentCustomer.savedDesignIds.filter((id) => id !== designId)
      : [...currentCustomer.savedDesignIds, designId];

    const updatedCustomer = { ...currentCustomer, savedDesignIds: updatedIds };
    setCurrentCustomer(updatedCustomer);
    setAllCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    showNotification(exists ? 'Removed from My Inspirations' : 'Saved to My Inspirations');
  };

  const toggleFavoriteTailor = (tailorId: string) => {
    const exists = currentCustomer.favoriteTailorIds.includes(tailorId);
    const updatedIds = exists
      ? currentCustomer.favoriteTailorIds.filter((id) => id !== tailorId)
      : [...currentCustomer.favoriteTailorIds, tailorId];

    const updatedCustomer = { ...currentCustomer, favoriteTailorIds: updatedIds };
    setCurrentCustomer(updatedCustomer);
    setAllCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    showNotification(exists ? 'Removed tailor from Favorites' : 'Added tailor to Favorites');
  };

  const saveMeasurementProfile = (profile: Omit<MeasurementProfile, 'id' | 'updatedAt'>) => {
    const newProfile: MeasurementProfile = {
      ...profile,
      id: `meas-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    const updatedProfiles = [...currentCustomer.measurementProfiles, newProfile];
    const updatedCustomer = { ...currentCustomer, measurementProfiles: updatedProfiles };
    setCurrentCustomer(updatedCustomer);
    setAllCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    showNotification(`Saved "${newProfile.name}" measurement profile!`);
  };

  const deleteMeasurementProfile = (profileId: string) => {
    const updatedProfiles = currentCustomer.measurementProfiles.filter((p) => p.id !== profileId);
    const updatedCustomer = { ...currentCustomer, measurementProfiles: updatedProfiles };
    setCurrentCustomer(updatedCustomer);
    setAllCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    showNotification('Measurement profile deleted.');
  };

  const submitReview = (review: Omit<CustomerReview, 'id' | 'date'>) => {
    const newRev: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setReviews((prev) => [newRev, ...prev]);
    showNotification('Thank you! Review published in the Client Book of Records.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedTailorId,
        setSelectedTailorId,
        selectedOrderId,
        setSelectedOrderId,
        selectedConversationId,
        setSelectedConversationId,
        activeAttireFilter,
        setActiveAttireFilter,
        selectedCity,
        setSelectedCity,
        currentRole,
        setCurrentRole,
        currentCustomer,
        setCurrentCustomer,
        currentTailor,
        setCurrentTailor,
        currentAdmin,
        setCurrentAdmin,
        allCustomers,
        allTailors,
        allFounders,
        switchCustomerUser,
        switchTailorUser,
        tailors: allTailors,
        galleryItems,
        orders,
        conversations,
        reviews,
        transactions,
        paymentModalOrder,
        setPaymentModalOrder,
        executeTransaction,
        releaseEscrowPayout,
        isAIAssistOpen,
        setIsAIAssistOpen,
        aiAssistInitialPrompt,
        setAiAssistInitialPrompt,
        openAIAssistWithPrompt,
        createOrder,
        updateOrderStage,
        submitCounterOffer,
        acceptQuoteOffer,
        rejectQuoteOffer,
        sendMessage,
        startOrGetConversation,
        addPortfolioItemToTailor,
        updateTailorStatus,
        toggleSaveDesign,
        toggleFavoriteTailor,
        saveMeasurementProfile,
        deleteMeasurementProfile,
        submitReview,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
