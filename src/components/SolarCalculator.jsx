import React, { useState, useMemo } from 'react';
import { Calculator, Sun, DollarSign, Trees, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

import { submitInquiry } from '../firebase/enquiryService';

export default function SolarCalculator({ onApplyCalculation }) {
  const [systemType, setSystemType] = useState('Residential');
  const [monthlyUnits, setMonthlyUnits] = useState(400);

  // Dynamic calculations
  const results = useMemo(() => {
    const units = Math.max(1, Number(monthlyUnits) || 0);
    
    // System kW Sizing
    let kwSize = Math.ceil(units / 120);
    if (kwSize < 1) kwSize = 1;

    // Roof Area in sq ft (80 sq ft per kW)
    const areaSqFt = kwSize * 80;

    // Monthly Generation
    const monthlyGenUnits = kwSize * 120;

    // Financial estimates (approx ₹8.5 average tariff per unit)
    const monthlySavingsRs = Math.round(monthlyGenUnits * 8.5);
    const annualSavingsRs = monthlySavingsRs * 12;

    // Carbon offset: ~0.82 kg CO2 per kWh
    const annualCo2Tons = ((monthlyGenUnits * 12 * 0.82) / 1000).toFixed(1);

    // Subsidy breakdown for Residential
    let subsidyText = '';
    let subsidyAmount = 0;
    let hasSubsidy = false;

    if (systemType === 'Residential') {
      hasSubsidy = true;
      if (kwSize === 1) {
        subsidyAmount = 30000;
        subsidyText = '₹30,000 (Central Govt PM Surya Ghar Scheme)';
      } else if (kwSize === 2) {
        subsidyAmount = 60000;
        subsidyText = '₹60,000 (Central Govt PM Surya Ghar Scheme)';
      } else if (kwSize >= 3) {
        subsidyAmount = 78000;
        subsidyText = '₹78,000 (Maximum Central Subsidy Cap)';
      }
    } else {
      subsidyText = 'Commercial & Industrial qualify for 40% Accelerated Tax Depreciation';
    }

    return {
      kwSize,
      areaSqFt,
      monthlyGenUnits,
      monthlySavingsRs,
      annualSavingsRs,
      annualCo2Tons,
      hasSubsidy,
      subsidyAmount,
      subsidyText
    };
  }, [systemType, monthlyUnits]);

  const handlePresetClick = (val) => {
    setMonthlyUnits(val);
  };

  const handleClaimQuote = async () => {
    const payload = {
      fullName: 'Solar Calculator Lead',
      phone: 'Pending Form Fill',
      city: 'Sangli',
      systemInterest: `${systemType} Solar Rooftop (${results.kwSize} kW) - Monthly Consumption: ${monthlyUnits} units`,
      message: `Solar Calculator Estimate generated. Recommended Capacity: ${results.kwSize} kW. Est. Monthly Savings: ₹${results.monthlySavingsRs.toLocaleString('en-IN')}. Est. Annual Savings: ₹${results.annualSavingsRs.toLocaleString('en-IN')}. ${results.subsidyText}`,
      status: 'Pending'
    };
    
    await submitInquiry(payload);

    if (onApplyCalculation) {
      onApplyCalculation({
        systemType,
        monthlyUnits,
        systemSize: results.kwSize
      });
    }
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-8 lg:py-24 bg-gradient-to-b from-white via-solar-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8 lg:mb-12 space-y-1.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solar System & Savings Calculator
          </h2>
          <p className="text-slate-600 text-xs sm:text-base hidden sm:block">
            Calculate your required system capacity in kW, rooftop space, energy generation, financial savings, and central government subsidy in real-time.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-8 items-start">

          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 bg-white p-3 sm:p-5 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg lg:shadow-xl space-y-2.5 sm:space-y-4 lg:space-y-6">
            <h3 className="font-heading text-sm sm:text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-solar-500" />
              <span>Input Your Requirements</span>
            </h3>

            {/* Input 1: System Type */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Connection Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {['Residential', 'Commercial', 'Industrial'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSystemType(type)}
                    className={`py-1.5 px-1.5 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                      systemType === type
                        ? 'bg-solar-500 text-white shadow-md shadow-solar-500/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Monthly Units Input */}
            <div className="space-y-1.5 sm:space-y-2.5 pt-0.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Monthly Electricity Consumption
                </label>
                <span className="text-[11px] sm:text-sm font-extrabold text-solar-600 bg-solar-50 px-2 py-0.5 rounded-md border border-solar-200">
                  {monthlyUnits} kWh
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={monthlyUnits}
                onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-500"
              />

              {/* Number Input & Presets Row */}
              <div className="flex items-center justify-between gap-1.5 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-xs text-slate-500">Units:</span>
                  <input
                    type="number"
                    min="1"
                    value={monthlyUnits}
                    onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                    className="w-16 sm:w-24 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-solar-500"
                    placeholder="500"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto">
                  {[250, 450, 800, 1500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-colors ${
                        monthlyUnits === preset
                          ? 'bg-amber-500 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset}u
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="hidden sm:flex p-2 bg-solar-50 rounded-xl border border-solar-100 text-[11px] text-solar-800 items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-solar-600 shrink-0 mt-0.5" />
              <span>Tailored for Maharashtra MSEDCL solar net-metering norms.</span>
            </div>
          </div>

          {/* Right Column: Output Results */}
          <div className="lg:col-span-7 bg-gradient-to-br from-solar-900 via-solar-800 to-slate-900 text-white p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl space-y-2.5 sm:space-y-4 lg:space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3">
              <div>
                <span className="text-[9px] sm:text-[11px] font-bold text-gold-400 uppercase tracking-widest block">Recommended System</span>
                <h3 className="font-heading text-sm sm:text-xl lg:text-2xl font-bold">Estimated Solar Capacity</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-4xl font-black text-gold-400">{results.kwSize}</span>
                <span className="text-xs sm:text-lg font-bold text-white ml-1">kW</span>
              </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 text-center sm:text-left">
                <span className="text-[9px] sm:text-[11px] font-semibold text-solar-200 uppercase tracking-wider block mb-0.5">Rooftop Area</span>
                <span className="text-sm sm:text-xl font-bold text-white">{results.areaSqFt}</span>
                <span className="text-[9px] sm:text-xs text-solar-300 ml-0.5">sq ft</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 text-center sm:text-left">
                <span className="text-[9px] sm:text-[11px] font-semibold text-solar-200 uppercase tracking-wider block mb-0.5">Monthly Output</span>
                <span className="text-sm sm:text-xl font-bold text-white">{results.monthlyGenUnits}</span>
                <span className="text-[9px] sm:text-xs text-solar-300 ml-0.5">units</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 text-center sm:text-left">
                <span className="text-[9px] sm:text-[11px] font-semibold text-solar-200 uppercase tracking-wider block mb-0.5">CO₂ Offset</span>
                <span className="text-sm sm:text-xl font-bold text-emerald-400">{results.annualCo2Tons}</span>
                <span className="text-[9px] sm:text-xs text-emerald-200 ml-0.5">Tons/yr</span>
              </div>
            </div>

            {/* Financial Savings Highlights */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-emerald-900/60 p-2.5 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-500/30 space-y-0.5 sm:space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-wider">Est. Annual Savings</span>
                <span className="text-base sm:text-2xl font-black text-emerald-400">₹{results.annualSavingsRs.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-200/90">
                Saves approx <strong>₹{results.monthlySavingsRs.toLocaleString('en-IN')}</strong> every month.
              </p>
            </div>

            {/* Subsidy Highlight */}
            <div className="bg-amber-500/15 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-gold-500/30 flex items-center gap-2 sm:gap-3">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 shrink-0" />
              <div className="text-[10px] sm:text-xs space-y-0.5">
                <span className="font-bold text-gold-300 block uppercase tracking-wider">Government Subsidy</span>
                <p className="text-slate-200 font-medium text-[10px] sm:text-xs truncate">{results.subsidyText}</p>
              </div>
            </div>

            {/* Direct Action Trigger */}
            <button
              onClick={handleClaimQuote}
              className="w-full py-2.5 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Apply {results.kwSize} kW Quote & Pre-fill Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
