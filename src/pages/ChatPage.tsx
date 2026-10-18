import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Image as ImageIcon,
  DollarSign,
  Scissors,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Lock
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const {
    conversations,
    currentRole,
    currentCustomer,
    currentTailor,
    sendMessage,
    selectedConversationId,
    setSelectedConversationId,
    orders,
    submitCounterOffer,
    acceptQuoteOffer,
    setPaymentModalOrder,
    openAIAssistWithPrompt
  } = useApp();

  const [inputText, setInputText] = useState<string>('');
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [quoteAmount, setQuoteAmount] = useState<string>('');
  const [quoteNote, setQuoteNote] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Filter conversations for active role:
  // If Customer: only conversations involving currentCustomer.id
  // If Tailor: only conversations involving currentTailor.id
  // If Admin: can view conversations for moderation
  const roleConversations = conversations.filter((c) => {
    if (currentRole === 'CUSTOMER') return c.customerId === currentCustomer.id;
    if (currentRole === 'TAILOR') return c.tailorId === currentTailor.id;
    return true; // Admin moderation
  });

  const activeConversation =
    roleConversations.find((c) => c.id === selectedConversationId) || roleConversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(quoteAmount, 10);
    if (isNaN(num) || num <= 0 || !activeConversation) return;

    if (activeConversation.orderId) {
      submitCounterOffer(activeConversation.orderId, num, quoteNote);
    } else {
      sendMessage(
        activeConversation.id,
        `Proposed Bespoke Quotation: ₹${num.toLocaleString('en-IN')}. ${quoteNote}`,
        { amount: num, note: quoteNote, status: 'PENDING' }
      );
    }

    setQuoteAmount('');
    setQuoteNote('');
    setShowQuoteModal(false);
  };

  return (
    <div className="py-8 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Private Client-Artisan Dialogue</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#FFF7E8]">
            Bespoke Atelier Chat
          </h1>
          <p className="text-xs text-[#A89885] mt-1 font-light">
            Private 1-to-1 consultation between client and master karigar. Discuss measurements, fabrics, design references, and negotiate prices in Indian Rupees (₹).
          </p>
        </div>

        {roleConversations.length === 0 ? (
          <div className="bg-[#1A0F0A] border border-[#3E2415] rounded-xl p-12 text-center max-w-md mx-auto shadow-xl">
            <MessageSquare className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#FFF7E8]">No Active Conversations</h3>
            <p className="text-xs text-[#A89885] mt-2 font-light">
              Explore Bespoke Masters and click "Chat" or "Request Custom Order" to start your first bespoke dialogue.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#1A0F0A] border border-[#442817] rounded-2xl overflow-hidden shadow-2xl h-[650px]">
            {/* Left Column: Conversations List (4 Cols) */}
            <div className="md:col-span-4 border-r border-[#2C1910] flex flex-col bg-[#160D08]">
              <div className="p-4 border-b border-[#2C1910] text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Conversations ({roleConversations.length})
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#24140D]">
                {roleConversations.map((conv) => {
                  const isSelected = activeConversation?.id === conv.id;
                  const otherPartyName = currentRole === 'TAILOR' ? conv.customerName : conv.atelierName;
                  const otherPartyAvatar = currentRole === 'TAILOR' ? conv.customerAvatar : conv.tailorAvatar;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`p-4 cursor-pointer transition-colors flex items-center gap-3 ${
                        isSelected ? 'bg-[#2E1A10]' : 'hover:bg-[#1C100A]'
                      }`}
                    >
                      <img
                        src={otherPartyAvatar}
                        alt={otherPartyName}
                        className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif text-sm font-bold text-[#FFF] truncate">
                            {otherPartyName}
                          </h4>
                          <span className="text-[10px] text-[#8C7A68]">{conv.lastTimestamp}</span>
                        </div>
                        <p className="text-xs text-[#A89885] truncate font-light">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Conversation (8 Cols) */}
            {activeConversation ? (
              <div className="md:col-span-8 flex flex-col bg-[#1A0F0A]">
                {/* Chat Header */}
                {/* Active Chat Top Bar */}
                {(() => {
                  const linkedOrder = activeConversation.orderId
                    ? orders.find((o) => o.id === activeConversation.orderId)
                    : null;

                  return (
                    <div className="p-4 bg-[#140C08] border-b border-[#2C1910] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            currentRole === 'TAILOR'
                              ? activeConversation.customerAvatar
                              : activeConversation.tailorAvatar
                          }
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                        />
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#FFF]">
                            {currentRole === 'TAILOR'
                              ? activeConversation.customerName
                              : activeConversation.atelierName}
                          </h3>
                          <p className="text-[10px] text-[#A6947D]">
                            {currentRole === 'TAILOR'
                              ? 'Client Profile'
                              : `Master Tailor: ${activeConversation.tailorName}`}
                            {linkedOrder && (
                              <span className="text-[#D4AF37] ml-1.5 font-medium">
                                • Order #{linkedOrder.id} ({linkedOrder.stage.replace(/_/g, ' ')})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2">
                        {/* AI Negotiation Advisor Button */}
                        <button
                          onClick={() =>
                            openAIAssistWithPrompt(
                              `I am in a bespoke negotiation chat with ${activeConversation.atelierName}. What is a polite way to counter-offer their quote or inquire about fabric GSM and muslin trial fittings in Indian Rupees (₹)?`
                            )
                          }
                          className="px-2.5 py-1.5 rounded bg-[#25150D] hover:bg-[#382014] text-[11px] font-semibold text-[#E5C378] border border-[#D4AF37]/30 flex items-center gap-1 cursor-pointer"
                          title="Ask AI Assist for Negotiation Advice"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="hidden sm:inline">AI Advice</span>
                        </button>

                        {/* Direct Pay Online Escrow Button if order exists and is Customer */}
                        {linkedOrder && currentRole === 'CUSTOMER' && (
                          <button
                            onClick={() => setPaymentModalOrder(linkedOrder)}
                            className="px-3 py-1.5 rounded bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer"
                            title="Pay Online via Escrow"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">
                              {linkedOrder.paymentStatus === 'ADVANCE_PAID' ? 'Pay Balance' : 'Pay Online'}
                            </span>
                            <span className="sm:hidden">Pay</span>
                          </button>
                        )}

                        {/* Negotiation Action Button */}
                        <button
                          onClick={() => setShowQuoteModal(true)}
                          className="px-3 py-1.5 rounded bg-[#2D180F] hover:bg-[#3D2214] text-xs font-semibold text-[#E5C378] border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="font-serif font-bold">₹</span>
                          <span>Quote</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Messages Stream */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {activeConversation.messages.map((msg) => {
                    const isSelf = msg.senderRole === currentRole;
                    const linkedOrder = activeConversation.orderId
                      ? orders.find((o) => o.id === activeConversation.orderId)
                      : null;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-[#8C7A68]">{msg.senderName}</span>
                          <span className="text-[9px] text-[#695747]">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            isSelf
                              ? 'bg-[#3B2213] text-[#FFF] rounded-tr-none border border-[#59341B]'
                              : 'bg-[#150D09] text-[#EADFCF] rounded-tl-none border border-[#3A2214]'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Quote Payload Card */}
                          {msg.quotePayload && (
                            <div className="mt-3 p-3 bg-[#140C08] rounded-xl border border-[#D4AF37]/50 text-xs">
                              <div className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">
                                Bespoke Quotation Offer
                              </div>
                              <div className="font-serif text-xl font-bold text-[#FFF] mb-1">
                                ₹{msg.quotePayload.amount.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[#A89885] italic text-[11px] mb-2">
                                {msg.quotePayload.note}
                              </div>

                              {!isSelf && activeConversation.orderId && (
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#29170E]">
                                  <button
                                    onClick={() => acceptQuoteOffer(activeConversation.orderId!)}
                                    className="px-3 py-1 bg-[#D4AF37] text-[#120B08] text-[11px] font-bold rounded cursor-pointer"
                                  >
                                    Accept Offer (₹)
                                  </button>
                                  {linkedOrder && (
                                    <button
                                      onClick={() => setPaymentModalOrder(linkedOrder)}
                                      className="px-3 py-1 bg-[#2C1910] hover:bg-[#3D2214] text-[#E5C378] border border-[#D4AF37]/40 text-[11px] font-bold rounded flex items-center gap-1 cursor-pointer"
                                    >
                                      <CreditCard className="w-3 h-3 text-[#D4AF37]" />
                                      <span>Pay Online (Escrow)</span>
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Bar */}
                <form onSubmit={handleSend} className="p-4 bg-[#140C08] border-t border-[#2C1910] flex gap-2">
                  <input
                    type="text"
                    placeholder="Type bespoke specifications, question about fabric, or negotiate price..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#1C100A] border border-[#3E2415] rounded-xl text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        )}

        {/* Propose Quote Modal */}
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1C100A] border border-[#52331F] rounded-xl max-w-md w-full p-6 text-[#EADFCF] shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-[#FFF7E8] mb-1">
                Propose Bespoke Quotation (₹ INR)
              </h3>
              <p className="text-xs text-[#A89885] mb-4">
                Send an official price offer or counter-offer to discuss with the client/atelier.
              </p>

              <form onSubmit={handleSendQuote} className="space-y-4">
                <div>
                  <label className="text-xs text-[#D4AF37] uppercase font-semibold block mb-1">
                    Amount (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 8000"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-sm text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#D4AF37] uppercase font-semibold block mb-1">
                    Terms & Notes (Fabrics, trials, lining)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Includes two fitting trials and pure mulmul lining"
                    value={quoteNote}
                    onChange={(e) => setQuoteNote(e.target.value)}
                    className="w-full p-2.5 bg-[#140C08] border border-[#3E2415] rounded text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="px-4 py-2 bg-[#26150D] text-xs text-[#A89885] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] text-[#120B08] text-xs font-bold rounded"
                  >
                    Send Quotation Offer
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
