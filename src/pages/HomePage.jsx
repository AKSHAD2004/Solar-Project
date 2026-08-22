import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsBanner from '../components/StatsBanner';
import ServicesSection from '../components/ServicesSection';
import TataSolarPartnership from '../components/TataSolarPartnership';
import ProductsSection from '../components/ProductsSection';
import SolarCalculator from '../components/SolarCalculator';
import WhyChooseUs from '../components/WhyChooseUs';
import HowSolarWorks from '../components/HowSolarWorks';
import InquiryForm from '../components/InquiryForm';
import BlogSection from '../components/BlogSection';
import ContactMapSection from '../components/ContactMapSection';

export default function HomePage({ onApplyCalculation, calculatorPrefill }) {
  return (
    <div>
      <HeroSection />
      <StatsBanner />
      <ServicesSection />
      <TataSolarPartnership />
      <ProductsSection />
      <SolarCalculator onApplyCalculation={onApplyCalculation} />
      <WhyChooseUs />
      <HowSolarWorks />
      <InquiryForm prefillData={calculatorPrefill} />
      <BlogSection />
      <ContactMapSection />
    </div>
  );
}
