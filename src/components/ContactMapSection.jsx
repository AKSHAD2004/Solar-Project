import React from 'react';
import { MapPin, Mail, Phone, Clock, MessageSquare } from 'lucide-react';

export default function ContactMapSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-solar-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Get In Touch</span>
                <h2 className="font-heading text-3xl font-bold mt-1 text-white">Visit Our Sangli Office</h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  Have questions about your rooftop feasibility or Tata Solar panel availability? Stop by our showroom or call our regional office directly.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Office Address</h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Sangli - Miraj Rd, Chougule Marg, V T, Sangli, Maharashtra 416414.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Phone Support</h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5">+91 98508 80687 / +91 91175 77711</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-solar-500 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Email Inquiry</h4>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5">golden.electricals@rediffmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919850880687?text=Hi%20Golden%20Electricals,%20I%20want%20to%20inquire%20about%20Solar%20Installation"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:+919850880687"
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Iframe */}
          <div className="lg:col-span-7 min-h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative">
            <iframe
              title="Golden Electricals Location Map"
              src="https://maps.google.com/maps?q=golden%20electricals%20sangli&t=m&z=14&output=embed&iwloc=near"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
}
