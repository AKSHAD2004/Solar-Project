import React from 'react';
import ProductsSection from '../components/ProductsSection';
import InquiryForm from '../components/InquiryForm';

export default function ProductsPage() {
  return (
    <div className="py-12 bg-white space-y-12">

      <ProductsSection />
      <InquiryForm />
    </div>
  );
}
