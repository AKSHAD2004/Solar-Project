import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import ServiceModal from './ServiceModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-solar-50 border border-solar-200 text-solar-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-solar-500" />
            <span>Our Service Offerings</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Solar Energy Solutions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            At Golden Electricals, we offer a comprehensive range of rooftop and ground-mounted solar solutions designed for maximum efficiency, sustainability, and long-term utility savings.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-50 hover:bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-solar-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-tr from-solar-900 to-solar-800">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/residential-rooftop.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold text-solar-700 uppercase tracking-wider">
                  Solar Rooftop
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-solar-600 transition-colors mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-solar-600 group-hover:text-solar-700">
                  <span>Explore Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
