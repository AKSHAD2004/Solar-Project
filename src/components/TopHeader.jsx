import React from 'react';
import { Phone, Mail, MapPin, Award } from 'lucide-react';

export default function TopHeader() {
  const contentItems = (
    <div className="flex items-center gap-8 px-4 text-xs sm:text-sm font-medium">
      <a href="tel:+919850880687" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors whitespace-nowrap">
        <Phone className="w-3.5 h-3.5 text-gold-400" />
        <span>+91 98508 80687</span>
      </a>

      <a href="tel:+919117577711" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors whitespace-nowrap">
        <Phone className="w-3.5 h-3.5 text-gold-400" />
        <span>+91 91175 77711</span>
      </a>

      <a href="mailto:golden.electricals@rediffmail.com" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors whitespace-nowrap">
        <Mail className="w-3.5 h-3.5 text-gold-400" />
        <span>golden.electricals@rediffmail.com</span>
      </a>

      <div className="flex items-center gap-1.5 text-slate-200 whitespace-nowrap">
        <MapPin className="w-3.5 h-3.5 text-gold-400" />
        <span>Sangli - Miraj Rd, Sangli, MH</span>
      </div>

      <div className="flex items-center gap-2 bg-solar-700/80 px-3 py-0.5 rounded-full border border-gold-500/30 text-gold-300 text-xs font-semibold whitespace-nowrap">
        <Award className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>Official Authorized Partner of <strong>Tata Solar</strong></span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-solar-950 via-solar-900 to-solar-950 text-white py-2 shadow-sm border-b border-solar-800 overflow-hidden relative">
      {/* Moving Marquee Ticker */}
      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee flex shrink-0">
          {contentItems}
          {contentItems}
        </div>
      </div>
    </div>
  );
}
