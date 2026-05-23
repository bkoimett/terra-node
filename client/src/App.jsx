import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Landing from './pages/Landing.jsx';
import Calculator from './pages/Calculator.jsx';
import Corporate from './pages/Corporate.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <main key={location.pathname} className="flex-1">
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
