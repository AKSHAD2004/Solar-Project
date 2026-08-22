import React, { useState } from 'react';
import { productsData } from '../data/productsData';
import { Check, ArrowUpRight, Zap } from 'lucide-react';

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Grid Tied', 'Battery Storage', 'Urban Innovation', 'Infrastructure'];

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-solar-100 border border-solar-200 text-solar-700 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-solar-600" />
              <span>Advanced Equipment</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Solar Product Portfolio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Engineered for longevity, maximum solar irradiance absorption, and total energy reliability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-solar-500 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-gradient-to-tr from-solar-900 to-solar-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-solar-500 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    {product.badge}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      {product.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-solar-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <a
                  href="#enquiry"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white hover:bg-solar-500 text-slate-800 hover:text-white border border-slate-200 hover:border-solar-500 font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>Request Product Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
