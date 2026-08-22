import React from 'react';
import { X, CheckCircle, PhoneCall } from 'lucide-react';

export default function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Image banner */}
        <div className="relative h-48 sm:h-56">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-solar-500 text-white mb-2 inline-block">
              Solar Service Offering
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">{service.title}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">Key Solution Advantages</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-solar-50/50 p-2.5 rounded-xl border border-solar-100">
                  <CheckCircle className="w-4 h-4 text-solar-600 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/60">
            <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Target Application</h5>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">{service.idealFor}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <a
            href="#enquiry"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Request Proposal</span>
          </a>
        </div>
      </div>
    </div>
  );
}
