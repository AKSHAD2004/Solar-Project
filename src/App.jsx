import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Navigation Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import CalculatorPage from './pages/CalculatorPage';
import WhyUsPage from './pages/WhyUsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  const [calculatorPrefill, setCalculatorPrefill] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('golden_admin_auth') === 'true';
  });

  const handleApplyCalculation = (calcData) => {
    setCalculatorPrefill(calcData);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('golden_admin_auth');
    setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-solar-500 selection:text-white">
        {/* Top Contact Ribbon */}
        <TopHeader />

        {/* Main Navigation Header */}
        <Navbar />

        {/* Multi-Page Routes */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onApplyCalculation={handleApplyCalculation}
                  calculatorPrefill={calculatorPrefill}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/calculator"
              element={
                <CalculatorPage
                  onApplyCalculation={handleApplyCalculation}
                  calculatorPrefill={calculatorPrefill}
                />
              }
            />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route
              path="/contact"
              element={<ContactPage calculatorPrefill={calculatorPrefill} />}
            />
            <Route 
              path="/admin" 
              element={
                isAdminAuthenticated ? (
                  <AdminDashboardPage onLogout={handleAdminLogout} />
                ) : (
                  <AdminLoginPage onLoginSuccess={handleAdminLoginSuccess} />
                )
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
