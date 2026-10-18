import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Scissors,
  ArrowRight,
  Maximize2,
  Minimize2,
  Bot,
  User,
  ShieldCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const FloatingAIAssist: React.FC = () => {
  const {
    isAIAssistOpen,
    setIsAIAssistOpen,
    aiAssistInitialPrompt,
    setAiAssistInitialPrompt,
    currentRole,
    currentCustomer,
    tailors,
    setCurrentView
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'concierge-welcome',
      sender: 'assistant',
      text: `Namaste! I am your STICHLY&CO. Bespoke AI Advisor.

Ask me anything about:
• Handcrafted Indian & Western silhouettes
• Luxury textiles (Pure Raw Silk, Banarasi Brocade, Italian Wool, Chikankari)
• Negotiation tips with master karigars in ₹
• Measurement guidance and fitting trial schedules.`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (aiAssistInitialPrompt) {
      handleSend(aiAssistInitialPrompt);
      setAiAssistInitialPrompt(null);
    }
  }, [aiAssistInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickChips = [
    'How to negotiate politely in ₹?',
    'What fabric is best for winter Sherwani?',
    'Banarasi Silk vs Italian Wool drape',
    'How do fitting trials work?'
  ];

  const handleSend = async (customText?: string) => {
    const text = customText || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
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
            tailorsCount: tailors.length
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Concierge server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Atelier concierge: For custom bespoke tailoring, we suggest specifying your preferred silhouette in the Design Studio.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: 'Atelier advice: For your bespoke request, we recommend browsing verified ateliers in Delhi, Mumbai, or Jaipur, sending an initial quote request, and negotiating terms politely in Indian Rupees (₹).',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isAIAssistOpen && (
        <button
          onClick={() => setIsAIAssistOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#B8911C] via-[#D4AF37] to-[#A88118] hover:brightness-110 text-[#120B08] px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer ring-4 ring-[#D4AF37]/20"
          title="Open AI Bespoke Fashion Concierge"
        >
          <Sparkles className="w-4 h-4 text-[#120B08] animate-pulse" />
          <span className="hidden sm:inline">Stichly AI Assist</span>
          <span className="sm:hidden">AI Assist</span>
        </button>
      )}

      {/* Floating Drawer / Chat Panel */}
      {isAIAssistOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[94vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] bg-[#1A0F0A] border border-[#52331F] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Top Bar */}
          <div className="p-4 bg-[#140C08] border-b border-[#2C1910] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2C1910] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-[#FFF7E8]">
                  Stichly AI Concierge
                </h3>
                <span className="text-[10px] text-[#A6947D]">
                  Luxury Bespoke Stylist • Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setCurrentView('ASSISTANT');
                  setIsAIAssistOpen(false);
                }}
                className="p-1.5 text-[#A89885] hover:text-[#FFF] rounded"
                title="Open Fullscreen Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsAIAssistOpen(false)}
                className="p-1.5 text-[#A89885] hover:text-[#FFF] rounded hover:bg-[#2C1910]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Guidance Chips */}
          <div className="p-2.5 bg-[#170D08] border-b border-[#2C1910] flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#24130A] hover:bg-[#341C10] text-[#D8C9B5] hover:text-[#E5C378] border border-[#3E2415] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#2C1910] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#3B2213] text-[#FFF] rounded-tr-none border border-[#59341B]'
                        : 'bg-[#140C08] text-[#E5D7C5] rounded-tl-none border border-[#351E12]'
                    }`}
                  >
                    {m.text}
                    <div className="text-[9px] text-[#8C7A68] mt-1 text-right font-mono">
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#A89885]">
                <div className="w-6 h-6 rounded-full bg-[#2C1910] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <div className="bg-[#140C08] p-2 rounded-lg border border-[#351E12] italic text-[11px]">
                  Bespoke concierge drafting styling advice...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input */}
          <div className="p-3 bg-[#140C08] border-t border-[#2C1910]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about attire, fabric, negotiation..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#1A0F0A] border border-[#3E2415] rounded-lg text-xs text-[#FFF] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="p-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C378] text-[#120B08] disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
