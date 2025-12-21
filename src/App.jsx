import { useEffect, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import AnalyticsTracker from './components/AnalyticsTracker';
import { initAnalytics, trackPageView } from './utils/analytics';
import AnnouncementBanner from './components/AnnouncementBanner';

// Contexts
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';

// Lazy Load Floating Components
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const LeadMagnetPopup = lazy(() => import('./components/LeadMagnetPopup'));

// Lazy Load Pages
const PromoLandingPage = lazy(() => import('./pages/PromoLandingPage'));
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

// Lazy Load Resource Pages
const GuiaSEOPage = lazy(() => import('./pages/recursos/GuiaSEOPage'));
const ChecklistMarketingPage = lazy(() => import('./pages/recursos/ChecklistMarketingPage'));
const TemplateOptimizacionPage = lazy(() => import('./pages/recursos/TemplateOptimizacionPage'));

function App() {
  const [isDelayedLoaded, setIsDelayedLoaded] = useState(false);

  // Check if promotional period is active - DISABLED for single-page focus
  const isPromoActive = () => {
    return false; // Always show HomePage, not PromoLandingPage
  };

  useEffect(() => {
    // Initialize analytics immediately for better tracking
    initAnalytics();

    // Defer loading of heavy non-critical components
    const timer = setTimeout(() => {
      setIsDelayedLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Router>
          <ScrollToTop />
          <AnalyticsTracker />
          <AppContent isDelayedLoaded={isDelayedLoaded} isPromoActive={isPromoActive} />
        </Router>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

// Separate component to use useLocation hook
function AppContent({ isDelayedLoaded, isPromoActive }) {
  const location = useLocation();

  // No special handling needed - all pages use navbar/footer
  const isLandingPage = false;

  return (
    <div className="App">
      <AnnouncementBanner />
      <div className="bg-grid"></div>
      {!isLandingPage && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Promotional Landing Page - Active during Dec 14, 2025 - Feb 28, 2026 */}
          <Route path="/" element={isPromoActive() ? <PromoLandingPage /> : <HomePage />} />
          <Route path="/home" element={<HomePage />} />
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

          {/* Resource Pages */}
          <Route path="/recursos/guia-seo-2024" element={<GuiaSEOPage />} />
          <Route path="/recursos/checklist-marketing" element={<ChecklistMarketingPage />} />
          <Route path="/recursos/template-optimizacion" element={<TemplateOptimizacionPage />} />

        </Routes>
      </Suspense>
      {!isLandingPage && <Footer />}

      {/* Deferred Components */}
      {isDelayedLoaded && (
        <Suspense fallback={null}>
          <WhatsAppButton />
          <LeadMagnetPopup />
        </Suspense>
      )}
    </div>
  );
}

export default App;
