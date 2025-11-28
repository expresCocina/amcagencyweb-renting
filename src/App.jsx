import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import { initAnalytics, trackPageView } from './utils/analytics';

// Pages
import HomePage from './pages/HomePage';
import SEOPage from './pages/SEOPage';
import WebDevPage from './pages/WebDevPage';
import FunnelsPage from './pages/FunnelsPage';
import AcademyPage from './pages/AcademyPage';
import CreditPage from './pages/CreditPage';
import CasesPage from './pages/CasesPage';

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <div className="App">
        <div className="bg-grid"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seo" element={<SEOPage />} />
          <Route path="/desarrollo-web" element={<WebDevPage />} />
          <Route path="/embudos" element={<FunnelsPage />} />
          <Route path="/cursos" element={<AcademyPage />} />
          <Route path="/credito" element={<CreditPage />} />
          <Route path="/casos" element={<CasesPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
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
