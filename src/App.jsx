import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Realizations from './pages/Realizations';
import Inspiration from './pages/Inspiration';
import Contact from './pages/Contact';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import './App.css';

console.log('=== APP MODULE LOADING ===');

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary componentDidCatch:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff6b2a', fontFamily: 'system-ui' }}>
          <h2>Something went wrong</h2>
          <pre style={{ textAlign: 'left', background: '#1a1a1a', color: '#ff6b2a', padding: '20px', overflow: 'auto' }}>
            {this.state.error?.toString()}
            {this.state.errorInfo?.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('=== APP COMPONENT DEFINED ===');

function App() {
  console.log('=== APP RENDER START ===', Date.now());

  const [activeTab, setActiveTab] = useState('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingVariant, setBookingVariant] = useState('diagnostic');

  const openBookingModal = (variant = 'diagnostic') => {
    setBookingVariant(variant);
    setBookingModalOpen(true);
  };
  const closeBookingModal = () => setBookingModalOpen(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home openBookingModal={openBookingModal} setActiveTab={setActiveTab} />;
      case 'realizations':
        return <Realizations openBookingModal={openBookingModal} />;
      case 'inspiration':
        return <Inspiration openBookingModal={openBookingModal} setActiveTab={setActiveTab} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home openBookingModal={openBookingModal} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ErrorBoundary>
      <>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openBookingModal={openBookingModal}
        />
        <main style={{ minHeight: '80vh', paddingTop: '76px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer setActiveTab={setActiveTab} />
        <BookingModal isOpen={bookingModalOpen} onClose={closeBookingModal} variant={bookingVariant} />
      </>
    </ErrorBoundary>
  );
}

console.log('=== APP COMPONENT END ===', Date.now());

export default App;