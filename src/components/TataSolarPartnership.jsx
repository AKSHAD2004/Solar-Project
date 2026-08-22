import React from 'react';
import { ShieldCheck, Award, Cpu, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function TataSolarPartnership() {
  const whyTata = [
    {
      icon: Award,
      title: 'India’s Solar Pioneer',
      desc: 'Tata Solar is a pioneer with over 30 years of manufacturing excellence and a unmatched reputation for reliability.'
    },
    {
      icon: Cpu,
      title: 'Cutting-Edge Solar Cells',
      desc: 'High-efficiency mono-PERC and TOPCon cell architecture engineered to perform in high temperatures.'
    },
    {
      icon: ShieldCheck,
      title: '25-Year Performance Warranty',
      desc: 'Backing your investment with long-term output guarantees and comprehensive national support.'
    },
    {
      icon: HeartHandshake,
      title: 'Certified Technical Support',
      desc: 'Golden Electricals engineers are directly trained by Tata Solar for flawless quality installations.'
    }
  ];

  const whatItMeans = [
    'Tested & certified genuine Tata Solar modules & solar inverters',
    'Local installation team with direct factory support in Sangli & Western Maharashtra',
    'Hassle-free DISCOM net-metering approvals & government subsidy paperwork',
    'Long-term property appreciation and decades of predictable green energy output'
  ];

  return (
    <section id="tata-partnership" className="py-16 lg:py-24 bg-gradient-to-br from-solar-900 via-solar-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-solar-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-semibold">
            <Award className="w-4 h-4 text-gold-400" />
            <span>Official Authorized Partnership</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Partnership with <span className="text-gold-400">Tata Solar</span>
          </h2>
          <p className="text-solar-100 text-base sm:text-lg leading-relaxed">
            As a proud partner of Tata Solar, Golden Electricals brings world-class innovation, tier-1 module reliability, and strict engineering standards directly to your doorstep.
          </p>
        </div>

        {/* 2 Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Why Tata Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyTata.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold-400/50 p-5 rounded-2xl transition-all hover:bg-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-solar-200 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: What This Means For You */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Customer Guarantee</span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">What This Partnership Means For You</h3>
            </div>

            <ul className="space-y-3.5">
              {whatItMeans.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-white/10 flex justify-center">
              <a
                href="#enquiry"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Inquire Tata Systems
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
