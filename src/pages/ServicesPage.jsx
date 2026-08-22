import React from 'react';
import ServicesSection from '../components/ServicesSection';
import HowSolarWorks from '../components/HowSolarWorks';
import InquiryForm from '../components/InquiryForm';
import { Sun } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="py-12 bg-white space-y-12">

      <ServicesSection />
      <HowSolarWorks />
      <InquiryForm />
    </div>
  );
}
