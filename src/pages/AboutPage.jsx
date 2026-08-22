import React from 'react';
import TataSolarPartnership from '../components/TataSolarPartnership';
import StatsBanner from '../components/StatsBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import { Award, ShieldCheck, Sun, UserCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 bg-white space-y-16">

      {/* About Founder Section - The Solar Man Of Sangli */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg space-y-8">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-solar-100 text-solar-800 text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-solar-600" />
              <span>About Founder</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-solar-600 tracking-tight">
              The Solar Man Of Sangli
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-solar-500 to-amber-400 rounded-3xl transform rotate-2 scale-105 opacity-20 blur-md" />
                <img
                  src="/founder-abhijeet-bhosale.png"
                  alt="Abhijeet Bhosale - The Solar Man of Sangli"
                  className="relative w-64 sm:w-72 lg:w-80 h-auto max-h-96 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Founder Content */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-heading text-2xl font-bold text-slate-900">
                Abhijeet Bhosale – The Solar Man of Sangli
              </h3>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Abhijeet Bhosale, widely recognized as the “Solar Man of Sangli,” stands at the forefront of renewable energy in the region, with a strong partnership with Tata Solar. Driven by a vision to make solar power accessible and affordable, Abhijeet has transformed the solar landscape in Sangli and beyond. His dedication to sustainable energy has not only empowered countless households and businesses to transition to solar but has also set new benchmarks in the industry. With Tata Solar’s cutting-edge technology and Abhijeet’s commitment to excellence, he has consistently delivered reliable, eco-friendly energy solutions that pave the way for a greener, cleaner future.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Stats */}
      <StatsBanner />

      {/* Tata Partnership Spotlight */}
      <TataSolarPartnership />

      {/* Detailed Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="font-heading text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To make clean, renewable rooftop solar energy accessible, reliable, and highly profitable for every residential homeowner, business, and industrial facility across Western Maharashtra.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="font-heading text-2xl font-bold text-slate-900">Our Quality Promise</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every installation uses certified Tier-1 Tata Solar modules, high-grade string/central inverters, and heavy-duty earthing systems backed by a 25-year performance warranty.
            </p>
          </div>
        </div>
      </div>

      {/* Differentiators */}
      <WhyChooseUs />
    </div>
  );
}
