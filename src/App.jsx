import { useEffect, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import { initAnalytics, trackPageView } from './utils/analytics';

// Contexts
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Lazy Load Non-Critical Components
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));

// Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SEOPage = lazy(() => import('./pages/SEOPage'));
const WebDevPage = lazy(() => import('./pages/WebDevPage'));
const FunnelsPage = lazy(() => import('./pages/FunnelsPage'));
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const CreditPage = lazy(() => import('./pages/CreditPage'));
const CasesPage = lazy(() => import('./pages/CasesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const BudgetCalculatorPage = lazy(() => import('./pages/BudgetCalculatorPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));

// Lazy Load Demo Pages
const EcoTiendaDemo = lazy(() => import('./pages/demos/EcoTiendaDemo'));
const InmobiliariaDemo = lazy(() => import('./pages/demos/InmobiliariaDemo'));
const ClinicaDentalDemo = lazy(() => import('./pages/demos/ClinicaDentalDemo'));
const TechStartDemo = lazy(() => import('./pages/demos/TechStartDemo'));
const RestauranteDemo = lazy(() => import('./pages/demos/RestauranteDemo'));
const AcademiaDemo = lazy(() => import('./pages/demos/AcademiaDemo'));
const BoutiqueDemo = lazy(() => import('./pages/demos/BoutiqueDemo'));
const ConsultoraDemo = lazy(() => import('./pages/demos/ConsultoraDemo'));
const DemoGeneratorPage = lazy(() => import('./pages/DemoGeneratorPage'));

function App() {
  const [isDelayedLoaded, setIsDelayedLoaded] = useState(false);

  useEffect(() => {
    initAnalytics();

    // Defer loading of heavy non-critical components
    const timer = setTimeout(() => {
      setIsDelayedLoaded(true);
    }, 4000); // Load chat/whatsapp after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Router>
          <ScrollToTop />
          <AnalyticsTracker />
          <div className="App">
            <div className="bg-grid"></div>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/seo" element={<SEOPage />} />
                <Route path="/desarrollo-web" element={<WebDevPage />} />
                <Route path="/embudos" element={<FunnelsPage />} />
                <Route path="/cursos" element={<AcademyPage />} />
                <Route path="/credito" element={<CreditPage />} />
                <Route path="/casos" element={<CasesPage />} />
                <Route path="/sobre-nosotros" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/recursos" element={<ResourcesPage />} />
                <Route path="/calculadora" element={<BudgetCalculatorPage />} />
                <Route path="/generador-demos" element={<DemoGeneratorPage />} />
                <Route path="/privacidad" element={<PrivacyPolicyPage />} />
                <Route path="/terminos" element={<TermsPage />} />
                <Route path="/agendar" element={<BookingPage />} />

                {/* Demo Pages */}
                <Route path="/demo/ecotienda" element={<EcoTiendaDemo />} />
                <Route path="/demo/inmobiliaria" element={<InmobiliariaDemo />} />
                <Route path="/demo/clinica-dental" element={<ClinicaDentalDemo />} />
                <Route path="/demo/techstart" element={<TechStartDemo />} />
                <Route path="/demo/restaurante" element={<RestauranteDemo />} />
                <Route path="/demo/academia" element={<AcademiaDemo />} />
                <Route path="/demo/boutique" element={<BoutiqueDemo />} />
                <Route path="/demo/consultora" element={<ConsultoraDemo />} />

                {/* Portal Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<ClientDashboard />} />

              </Routes>
            </Suspense>
            <Footer />

            {/* Deferred Components */}
            {isDelayedLoaded && (
              <Suspense fallback={null}>
                <WhatsAppButton />
                <ChatWidget />
              </Suspense>
            )}
          </div>
        </Router>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

// Helper component to track page views on route change
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location]);
  return null;
};

export default App;
