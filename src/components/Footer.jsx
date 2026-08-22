import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Award, Facebook, Instagram, ChevronRight, Sun } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-solar-950 text-slate-300 pt-16 pb-8 border-t border-solar-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-solar-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-md">
              <img
                src="/logo.png"
                alt="Golden Electricals Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Golden Electricals specializes in designing, installing, and maintaining high-quality solar energy systems for residential, commercial, and industrial clients in Sangli. Partnered with Tata Solar to deliver cutting-edge technology and 25-year performance peace of mind.
            </p>


          </div>

          {/* Nav Links Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-bold text-white">Navigation Pages</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Tata Partnership', path: '/about' },
                { label: 'Rooftop Solar Services', path: '/services' },
                { label: 'Product Catalog', path: '/products' },
                { label: 'Why Choose Us', path: '/why-us' },
                { label: 'Blog & Energy Guides', path: '/blog' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-solar-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Col */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading text-lg font-bold text-white">Contact & Region</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-solar-400 shrink-0 mt-1" />
                <span className="text-slate-300">Sangli - Miraj Rd, Chougule Marg, V T, Sangli, Maharashtra 416414.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-solar-400 shrink-0" />
                <span className="text-slate-300">+91 98508 80687 / +91 91175 77711</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-solar-400 shrink-0" />
                <span className="text-slate-300">golden.electricals@rediffmail.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/golden.electricalsangli"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-solar-900 border border-solar-700/60 hover:bg-solar-500 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/goldenelectricals_/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-solar-900 border border-solar-700/60 hover:bg-solar-500 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Golden Electricals. All Rights Reserved.</p>
          <p>
            Developed by{' '}
            <a
              href="https://www.infoyashonand.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-gold-400 font-medium transition-colors cursor-pointer"
            >
              INFOYASHONAND TECHNOLOGY PVT. LTD.
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
