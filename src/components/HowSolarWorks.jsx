import React, { useState } from 'react';
import { faqsData } from '../data/faqsData';
import { HelpCircle, ChevronDown, Sun, Zap, RefreshCw } from 'lucide-react';

export default function HowSolarWorks() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: How Solar PV Works Visual Explainer */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-solar-50 text-solar-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sun className="w-3.5 h-3.5 text-solar-500" />
                <span>Technology Simplified</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">How Solar PV Systems Function</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-solar-50/60 border border-solar-100">
                <div className="w-7 h-7 rounded-lg bg-solar-500 text-white font-bold text-xs flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sunlight Absorbed</h4>
                  <p className="text-xs text-slate-600">Silicon solar cells absorb sunlight photons, generating Direct Current (DC) electricity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-solar-50/60 border border-solar-100">
                <div className="w-7 h-7 rounded-lg bg-solar-500 text-white font-bold text-xs flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Inversion to AC</h4>
                  <p className="text-xs text-slate-600">The high-efficiency grid inverter converts DC power into 230V Alternating Current (AC) for household appliances.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-solar-50/60 border border-solar-100">
                <div className="w-7 h-7 rounded-lg bg-solar-500 text-white font-bold text-xs flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Net-Metering Export</h4>
                  <p className="text-xs text-slate-600">Unused surplus electricity is exported back to DISCOM grid, crediting your bill automatically.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Bi-directional meter tracking</span>
              <RefreshCw className="w-4 h-4 text-solar-500 animate-spin-slow" />
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-solar-600">Got Questions?</span>
              <h2 className="font-heading text-3xl font-extrabold text-slate-900 mt-1">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqsData.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading text-base font-bold text-slate-900 hover:text-solar-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openIdx === idx ? 'rotate-180 text-solar-500' : ''
                    }`} />
                  </button>

                  {openIdx === idx && (
                    <div className="px-5 pb-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
