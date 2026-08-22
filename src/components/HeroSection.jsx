import React from 'react';
import { Sun, ShieldCheck, Zap, ArrowRight, Award, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-b from-solar-50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gold-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-solar-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">


            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Switch to Solar. <br />
              <span className="bg-gradient-to-r from-solar-600 via-solar-500 to-amber-500 bg-clip-text text-transparent">
                Slash Your Power Bills
              </span> Up to 90%.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Golden Electricals provides premier Residential, Commercial & Industrial Solar PV installations in Sangli. Backed by 16+ years of proven expertise and government subsidies under PM Surya Ghar.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0 pt-2 text-left">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">Govt Subsidy up to ₹78,000</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800">25-Year Panel Output Warranty</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-semibold text-base shadow-xl shadow-solar-500/25 transition-all hover:-translate-y-0.5"
              >
                <span>Calculate Solar Savings</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-base shadow-sm transition-all hover:border-solar-300"
              >
                <span>Drop Enquiry & Upload Bill</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-solar-500 to-amber-400 rounded-3xl transform rotate-2 scale-105 opacity-20 blur-lg" />
              
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 overflow-hidden">
                <img
                  src="/ratan-tata-quote.png"
                  alt="Sir Ratan Tata Quote - Tata Solar Partner"
                  className="w-full h-auto max-h-80 sm:max-h-96 object-contain rounded-2xl shadow-inner bg-slate-900"
                />


                {/* Satisfaction Badge Footer */}
                <div className="mt-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">100% Guaranteed</p>
                      <p className="text-[11px] text-slate-600">Customer Satisfaction</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-solar-100 text-solar-800 border border-solar-200">
                    Tata Solar Partner
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
