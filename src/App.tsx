import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AttireCategoryPage } from './pages/AttireCategoryPage';
import { TailorMarketplacePage } from './pages/TailorMarketplacePage';
import { TailorProfilePage } from './pages/TailorProfilePage';
import { DesignStudioPage } from './pages/DesignStudioPage';
import { VisualScannerPage } from './pages/VisualScannerPage';
import { StichlyAssistantPage } from './pages/StichlyAssistantPage';
import { OrdersNegotiationsPage } from './pages/OrdersNegotiationsPage';
import { ChatPage } from './pages/ChatPage';
import { TailorDashboardPage } from './pages/TailorDashboardPage';
import { FounderAdminPage } from './pages/FounderAdminPage';
import { DesignGalleryPage } from './pages/DesignGalleryPage';
import { ProfileMeasurementsPage } from './pages/ProfileMeasurementsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { FloatingAIAssist } from './components/FloatingAIAssist';
import { OnlinePaymentModal } from './components/OnlinePaymentModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, notification, paymentModalOrder, setPaymentModalOrder } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomePage />;
      case 'MEN':
        return <AttireCategoryPage gender="Men" />;
      case 'WOMEN':
        return <AttireCategoryPage gender="Women" />;
      case 'TAILORS':
        return <TailorMarketplacePage />;
      case 'TAILOR_PROFILE':
        return <TailorProfilePage />;
      case 'DESIGN_STUDIO':
        return <DesignStudioPage />;
      case 'DESIGN_GALLERY':
        return <DesignGalleryPage />;
      case 'SCANNER':
        return <VisualScannerPage />;
      case 'ASSISTANT':
        return <StichlyAssistantPage />;
      case 'ORDERS':
        return <OrdersNegotiationsPage />;
      case 'TRANSACTIONS':
        return <TransactionsPage />;
      case 'CHAT':
        return <ChatPage />;
      case 'TAILOR_DASHBOARD':
        return <TailorDashboardPage />;
      case 'ADMIN_DASHBOARD':
        return <FounderAdminPage />;
      case 'PROFILE':
        return <ProfileMeasurementsPage />;
      case 'REVIEWS':
        return <ReviewsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#120B08] text-[#F4ECE1] relative">
      <Navbar />
      <main className="flex-1">{renderView()}</main>
      <Footer />

      {/* Floating AI Assist Concierge */}
      <FloatingAIAssist />

      {/* Online Escrow Transaction Modal */}
      {paymentModalOrder && (
        <OnlinePaymentModal
          order={paymentModalOrder}
          onClose={() => setPaymentModalOrder(null)}
        />
      )}

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F120B] border border-[#D4AF37]/60 text-[#FFF7E8] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#120B08] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
