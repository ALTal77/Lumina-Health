import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './ui/Container';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Send, ArrowUpRight } from 'lucide-react';
import logo from '../assets/images/full.png';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 text-white relative pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5 text-start">
          
          {/* Column 1: Brand & Map Location */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Lumina Health Logo" className="h-10 w-auto rounded-lg bg-white p-1.5" />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {t('footer.tagline')}
            </p>

            <div className="pt-4">
              <h4 className="text-[10px] font-bold text-teal-500 uppercase tracking-[0.2em] mb-4">
                {t('footer.findUs')}
              </h4>
              {/* Google Maps Embed */}
              <a
                href="https://maps.google.com/?q=Al-Mouwasat+Damascus+Syria"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-xl overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps?q=Al-Mouwasat+Damascus+Syria&output=embed"
                  title="Lumina Health Damascus Location"
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                  loading="lazy"
                />
               
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-bold">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('nav.doctors')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: To Patients */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">
              {t('footer.forPatients')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-bold">
              <li>
                <a href="#doctors" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('footer.bookAppointment')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('footer.patientPortal')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('footer.emergencyCare')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <div className="w-1.5 h-px bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  {t('footer.medicalRecords')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4">
              {t('footer.contactHeader')}
            </h4>
            <div className="space-y-4 text-sm text-slate-400 font-bold">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{t('contact.phone')}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{t('contact.email')}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Clock className="w-4 h-4" />
                </div>
                <span>{t('contact.hours')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Rights & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-500 font-bold tracking-wide">
            {t('footer.rights')}
          </div>

          {/* Social Links Redesign */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-xl">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-xl">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-xl">
              <Send className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <a href="#" className="hover:text-teal-400 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-teal-400 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
