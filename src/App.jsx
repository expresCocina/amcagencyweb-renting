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
import { NotificationProvider } from './context/NotificationContext';
import { Toaster } from 'react-hot-toast';

// Lazy Load Floating Components
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const LeadMagnetPopup = lazy(() => import('./components/LeadMagnetPopup'));

// Import HomePage normally (not lazy) - it's the main page
import HomePage from './pages/HomePage';
import SEOPage from './pages/SEOPage';
import WebDevPage from './pages/WebDevPage';
import FunnelsPage from './pages/FunnelsPage';
import CasesPage from './pages/CasesPage';
import AboutPage from './pages/AboutPage';
import ResourcesPage from './pages/ResourcesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import AddClientPage from './pages/AddClientPage';
import PendingPaymentsPage from './pages/PendingPaymentsPage';
import SettingsPage from './pages/SettingsPage';
import RegistroPage from './pages/RegistroPage';
import SitioBloqueadoPage from './pages/SitioBloqueadoPage';
import FreeWebsiteLanding from './pages/FreeWebsiteLanding';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Import Demo Pages normally for fast loading
import EcoTiendaDemo from './pages/demos/EcoTiendaDemo';
import InmobiliariaDemo from './pages/demos/InmobiliariaDemo';
import ClinicaDentalDemo from './pages/demos/ClinicaDentalDemo';
import TechStartDemo from './pages/demos/TechStartDemo';
import RestauranteDemo from './pages/demos/RestauranteDemo';
import AcademiaDemo from './pages/demos/AcademiaDemo';
import BoutiqueDemo from './pages/demos/BoutiqueDemo';
import ConsultoraDemo from './pages/demos/ConsultoraDemo';

// CRM Pages
import CRMLayout from './pages/crm/CRMLayout';
import CRMDashboard from './pages/crm/CRMDashboard';
import LeadsPage from './pages/crm/LeadsPage';
import PipelinePage from './pages/crm/PipelinePage';
import CRMClientsPage from './pages/crm/CRMClientsPage';
import ProjectsPage from './pages/crm/ProjectsPage';
import TasksPage from './pages/crm/TasksPage';
import ReportsPage from './pages/crm/ReportsPage';


function App() {
  const [isDelayedLoaded, setIsDelayedLoaded] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Check if promotional period is active - DISABLED for single-page focus
  const isPromoActive = () => {
    return false; // Always show HomePage, not PromoLandingPage
  };

  useEffect(() => {
    // Initialize analytics immediately
    initAnalytics();

    // Load heavy components immediately instead of delayed
    setComponentsLoaded(true);
  }, []);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <NotificationProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
          <Router>
            <ScrollToTop />
            <AnalyticsTracker />
            <AppContent isDelayedLoaded={isDelayedLoaded} isPromoActive={isPromoActive} />
          </Router>
        </NotificationProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

// Separate component to use useLocation hook
function AppContent({ isDelayedLoaded, isPromoActive }) {
  const location = useLocation();

  // Hide navbar/footer on admin, registration, login, client dashboard, and free website landing pages
  const isAdminPage = location.pathname.startsWith('/admin');
  const isRegistroPage = location.pathname === '/registro';
  const isLoginPage = location.pathname === '/login';
  const isClientDashboard = location.pathname === '/dashboard';
  const isFreeWebsiteLanding = location.pathname === '/gratis';
  const isCRMPage = location.pathname.startsWith('/crm');
  const hideNavigation = isAdminPage || isRegistroPage || isLoginPage || isClientDashboard || isFreeWebsiteLanding || isCRMPage;

  return (
    <div className="App">
      {!hideNavigation && <AnnouncementBanner />}
      {!hideNavigation && <div className="bg-grid"></div>}
      {!hideNavigation && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Promotional Landing Page - Active during Dec 14, 2025 - Feb 28, 2026 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/seo" element={<SEOPage />} />
          <Route path="/desarrollo-web" element={<WebDevPage />} />
          <Route path="/embudos" element={<FunnelsPage />} />
          <Route path="/casos" element={<CasesPage />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />

          <Route path="/privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/agendar" element={<BookingPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/gratis" element={<FreeWebsiteLanding />} />

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

          {/* Admin Routes - Protected with Supabase Auth */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/clientes/nuevo" element={
            <ProtectedRoute>
              <AddClientPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/pagos" element={
            <ProtectedRoute>
              <PendingPaymentsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/config" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />

          {/* CRM Routes - Protected */}
          <Route path="/crm" element={
            <ProtectedRoute>
              <CRMLayout />
            </ProtectedRoute>
          }>
            <Route index element={<CRMDashboard />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="clients" element={<CRMClientsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>


        </Routes>
      </Suspense>
      {!hideNavigation && <Footer />}

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
