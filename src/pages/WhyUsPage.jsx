import React from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsBanner from '../components/StatsBanner';
import TataSolarPartnership from '../components/TataSolarPartnership';

export default function WhyUsPage() {
  return (
    <div className="py-12 bg-white space-y-16">

      <StatsBanner />
      <WhyChooseUs />
      <TataSolarPartnership />
    </div>
  );
}
