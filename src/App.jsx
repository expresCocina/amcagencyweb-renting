import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import SEOPage from './pages/SEOPage';
import WebDevPage from './pages/WebDevPage';
import FunnelsPage from './pages/FunnelsPage';
import AcademyPage from './pages/AcademyPage';
import CreditPage from './pages/CreditPage';
import CasesPage from './pages/CasesPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
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

export default App;
