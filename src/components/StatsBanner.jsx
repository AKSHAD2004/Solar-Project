import React from 'react';
import { Award, Users, CheckCircle2, Zap } from 'lucide-react';

export default function StatsBanner() {
  const stats = [
    {
      icon: Award,
      value: '16+',
      label: 'Years of Solar Experience',
      subtext: 'Pioneering Clean Energy in Sangli'
    },
    {
      icon: CheckCircle2,
      value: '1000+',
      label: 'Successful Solar Installations',
      subtext: 'Residential, Commercial & Industrial'
    },
    {
      icon: Users,
      value: '100%',
      label: 'Customer Satisfaction',
      subtext: 'High Referral & Trust Rate'
    },
    {
      icon: Zap,
      value: '5 MW+',
      label: 'Clean Power Installed',
      subtext: 'Cutting Tons of Carbon Output'
    }
  ];

  return (
    <section className="bg-solar-500 text-white py-12 relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-solar-400/40">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className={`flex flex-col items-center text-center p-4 ${index > 0 ? 'pt-6 lg:pt-4' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6 text-gold-300" />
                </div>
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gold-200 mb-0.5">
                  {stat.label}
                </span>
                <span className="text-xs text-solar-100/80">
                  {stat.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
