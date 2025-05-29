import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SolutionsSection from './components/SolutionsSection';
import EnterpriseSection from './components/EnterpriseSection';
import CustomerSection from './components/CustomerSection';
import DemoSection from './components/DemoSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import KYCPage from './pages/KYCPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';
import LendingPage from './pages/LendingPage';
import TokenizationPage from './pages/TokenizationPage';
import TradeFinancePage from './pages/TradeFinancePage';
import InterbankPage from './pages/InterbankPage';
import { useAuth } from './contexts/AuthContext';

import './styles/animations.css';

// Scroll restoration component
function ScrollRestoration() {
  const location = useLocation();
  
  useEffect(() => {
    // Store scroll position before route change
    const storeScrollPosition = () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };
    
    // Restore scroll position after route change
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    };
    
    // Store current position before leaving
    window.addEventListener('beforeunload', storeScrollPosition);
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(restoreScrollPosition, 100);
    
    return () => {
      window.removeEventListener('beforeunload', storeScrollPosition);
      clearTimeout(timeoutId);
      // Store position when component unmounts (route change)
      storeScrollPosition();
    };
  }, [location.pathname]);

  return null;
}

// Placeholder components for missing pages

/*const LendingPage = () => (
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-4xl font-bold text-center mb-8">Smart Lending</h1>
    <p className="text-center text-gray-600">Lending page coming soon...</p>
  </div>
);*/

const CompliancePage = () => (
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-4xl font-bold text-center mb-8">Compliance</h1>
    <p className="text-center text-gray-600">Compliance page coming soon...</p>
  </div>
);

const AnalyticsPage = () => (
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-4xl font-bold text-center mb-8">Analytics</h1>
    <p className="text-center text-gray-600">Analytics page coming soon...</p>
  </div>
);

const WalletPage = () => (
  <div className="container mx-auto px-4 py-24">
    <h1 className="text-4xl font-bold text-center mb-8">Digital Wallet</h1>
    <p className="text-center text-gray-600">Wallet page coming soon...</p>
  </div>
);

// Home page component
function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Hero />
      <SolutionsSection />
      
      {user && (
        <section className="py-24 bg-green-200">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Your Banking Dashboard</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* KYC Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Identity Verification</h3>
                  <p className="text-gray-600 mb-4">Complete your KYC process with blockchain-secured identity management.</p>
                  <button 
                    onClick={() => window.location.href = '/kyc'}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start KYC Process
                  </button>
                </div>
              </div>

              {/* Payments Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-Border Payments</h3>
                  <p className="text-gray-600 mb-4">Send instant, secure payments globally with minimal fees.</p>
                  <button 
                    onClick={() => window.location.href = '/payments'}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Make Payment
                  </button>
                </div>
              </div>

              {/* Lending Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Lending</h3>
                  <p className="text-gray-600 mb-4">Access automated loans with smart contract-based approval.</p>
                  <button 
                    onClick={() => window.location.href = '/lending'}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Apply for Loan
                  </button>
                </div>
              </div>

              {/* Trade Finance Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trade Finance</h3>
                  <p className="text-gray-600 mb-4">Digital letters of credit and supply chain financing.</p>
                  <button 
                    onClick={() => window.location.href = '/trade-finance'}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Start Trading
                  </button>
                </div>
              </div>

              {/* Tokenization Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Asset Tokenization</h3>
                  <p className="text-gray-600 mb-4">Convert real-world assets into blockchain tokens.</p>
                  <button 
                    onClick={() => window.location.href = '/tokenization'}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Tokenize Assets
                  </button>
                </div>
              </div>

              {/* Interbank Card */}
              <div className="group hover:scale-105 transition-transform duration-300">
                <div className="p-6 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interbank Network</h3>
                  <p className="text-gray-600 mb-4">Connect with global banking network for settlements.</p>
                  <button 
                    onClick={() => window.location.href = '/interbank'}
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Access Network
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600">$2.4M</div>
                <div className="text-gray-600">Total Volume</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-green-600">1,247</div>
                <div className="text-gray-600">Transactions</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600">45</div>
                <div className="text-gray-600">Partner Banks</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-orange-600">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <EnterpriseSection />
      <CustomerSection />
      <DemoSection />
    </>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />
      <ScrollRestoration />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/kyc" element={<KYCPage />} />
        <Route path="/payments" element={<PaymentPage />} />
        <Route path="/lending" element={<LendingPage />} />
        <Route path="/trade-finance" element={<TradeFinancePage />} />
        <Route path="/tokenization" element={<TokenizationPage />} />
        <Route path="/interbank" element={<InterbankPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
      </Routes>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default App;