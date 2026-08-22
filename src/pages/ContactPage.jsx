import React from 'react';
import ContactMapSection from '../components/ContactMapSection';
import InquiryForm from '../components/InquiryForm';

export default function ContactPage({ calculatorPrefill }) {
  return (
    <div className="py-12 bg-white space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-solar-900 via-solar-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Get Free Assessment</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-1">
            Contact Us & Drop Light Bill
          </h1>
          <p className="text-solar-200 text-sm sm:text-base mt-2 max-w-2xl">
            Reach out to our Sangli regional office, call our technical team directly, or upload your light bill photo for a free customized proposal.
          </p>
        </div>
      </div>

      <InquiryForm prefillData={calculatorPrefill} />
      <ContactMapSection />
    </div>
  );
}
