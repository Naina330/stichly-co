import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, Scissors, User, Bot, HelpCircle, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const StichlyAssistantPage: React.FC = () => {
  const { currentRole, currentCustomer, tailors, setCurrentView, setSelectedTailorId } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Namaste and welcome to STICHLY&CO. Concierge! I am your personal bespoke styling advisor.

I can assist you with:
• Selecting the perfect attire for weddings, galas, and festive celebrations
• Deciding between Indian Heritage (Sherwani, Bandhgala, Lehenga) vs Western Bespoke (Tuxedos, Gowns)
• Understanding luxury fabrics (Banarasi Brocades, Raw Silk, 130s Italian Wool, Belgian Linen)
• Guiding you on taking precise body measurements
• Polite and effective price negotiation strategies in Indian Rupees (₹)
• Matching you with verified master tailors across Delhi, Mumbai, Jaipur, Bengaluru, and Lucknow.

How may I assist your wardrobe vision today?`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    "I need an outfit for my brother's royal wedding in December",
    "How should I negotiate price politely with a master tailor?",
    "Explain the difference between Super 120s Wool and Raw Silk Bandhgala",
    "Which tailor in Delhi specializes in Zardozi bridal lehengas?",
    "How do I measure shoulder and sleeve length accurately?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userRole: currentRole,
          context: {
            clientName: currentCustomer.name,
            clientCity: currentCustomer.city,
            availableTailorsCount: tailors.length
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Assistant server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "Delighted to guide you. For this creation, we suggest exploring our Design Studio with your preferred fabric selection.";

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Failed to get concierge response, falling back gracefully:', err);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: `Based on your request, our recommendation is to select your silhouette in the STICHLY&CO. Design Studio, specify your preferred fabric, and send a quotation request to our verified bespoke masters in ${currentCustomer.city}. Tailors will reply with custom quotes in ₹.`,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#120B08] min-h-screen text-[#F4ECE1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C1910] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Bespoke Fashion Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF7E8]">
            Stichly Assistant
          </h1>
          <p className="text-xs text-[#A89885] mt-1 font-light">
            Your personalized bespoke consultant for silhouette choices, textile wisdom, negotiation advice, and tailor matching.
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-[#1C100A] hover:bg-[#2C1910] text-[#D8C9B5] hover:text-[#E5C378] border border-[#3E2415] hover:border-[#D4AF37]/40 transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-[#1A0F0A] border border-[#442817] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[580px]">
          {/* Top Banner */}
          <div className="p-4 bg-[#140C08] border-b border-[#2C1910] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2A170F] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-serif text-sm font-bold text-[#FFF]">Stichly Concierge</div>
                <div className="text-[10px] text-[#A6947D]">Online • Powered by Gemini 3.8 Flash</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('DESIGN_STUDIO')}
              className="text-xs text-[#E5C378] hover:text-[#FFF] font-semibold flex items-center gap-1"
            >
              <span>Open Design Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#2A170F] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#3B2213] text-[#FFF7E8] rounded-tr-none border border-[#59341B]'
                        : 'bg-[#150D09] text-[#E5D7C5] rounded-tl-none border border-[#3E2415]'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[9px] text-[#8C7A68] mt-1.5 text-right font-mono">
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#2A170F] border border-[#3E2415] flex items-center justify-center text-[#D8C9B5] flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 justify-start items-center text-xs text-[#A89885]">
                <div className="w-7 h-7 rounded-full bg-[#2A170F] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#150D09] p-3 rounded-xl border border-[#3E2415] italic">
                  Atelier Concierge is contemplating your bespoke wardrobe options...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 bg-[#140C08] border-t border-[#2C1910]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about attire choices, fabric weights, tailor negotiation tips, or measurements..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#1A0F0A] border border-[#3E2415] rounded-xl text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
