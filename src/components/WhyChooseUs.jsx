import React from 'react';
import { Handshake, Star, ShieldCheck, Puzzle, Recycle, Smile } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Handshake,
      title: 'Trusted Partnership',
      description: 'As an official Tata Solar partner, we bring the reliability, warranty backing, and engineering standards of Tata Solar directly to your installation.'
    },
    {
      icon: Star,
      title: '16+ Years Expertise',
      description: 'Our team of certified solar technicians and electrical engineers have successfully delivered 1000+ commercial, industrial, and residential projects.'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assurance',
      description: 'We use tier-1 solar panels, high-efficiency grid inverters, UV-rated cabling, and certified earthing systems built to endure harsh weather.'
    },
    {
      icon: Puzzle,
      title: 'Customized Solutions',
      description: 'Every roof and load demand is unique. We perform on-site shading analysis to design the optimal kW system for your exact requirements.'
    },
    {
      icon: Recycle,
      title: 'Sustainability Commitment',
      description: 'Empowering homeowners and business operators to shrink their carbon footprint while enjoying predictable energy costs for 25+ years.'
    },
    {
      icon: Smile,
      title: '100% Customer Satisfaction',
      description: 'Our commitment to prompt maintenance, net-metering paperwork assistance, and clear communication is reflected in our high referral rate.'
    }
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-solar-600 bg-solar-50 px-3 py-1 rounded-full border border-solar-100">
            Why Golden Electricals
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Golden Electricals?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Choose Golden Electricals for innovative, reliable, and customer-centric solar solutions that deliver long-term energy savings.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-solar-300 shadow-sm hover:shadow-lg transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-solar-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-solar-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
