import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2, Search, Calendar, Stethoscope, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface HeroProps {
  onOpenBooking: () => void;
  onSearchDoctors?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSearchDoctors }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const checklist: string[] = t('hero.checklist', { returnObjects: true }) as string[];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchDoctors) {
      onSearchDoctors(searchQuery);
    }
    const doctorsElem = document.getElementById('doctors');
    if (doctorsElem) {
      doctorsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background with Deep Medical Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920"
          alt="Lumina Health Hospital"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/95 to-teal-900/40" />
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8 text-start">
            
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-teal-300 text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              >
                {t('hero.title')}
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
                  {t('hero.subtitle')}
                </span>
              </motion.h1>
            </div>

            {/* Premium Checklist Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
            >
              {Array.isArray(checklist) &&
                checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-500/30">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
            </motion.div>

            {/* Primary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5 pt-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-teal-500/20"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('hero.ctaBook')}</span>
              </Button>

              <a href="#services">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="px-8 py-4 rounded-2xl text-white hover:bg-white/5 gap-2 border border-white/10"
                >
                  <span>{t('hero.ctaExplore')}</span>
                  <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
                </Button>
              </a>
            </motion.div>

            {/* Quick Stats Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-teal-500/5 border border-teal-500/10 w-fit"
            >
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-medium text-teal-100/60">{t('hero.quickStats')}</span>
            </motion.div>
          </div>

          {/* Search Card - Redesigned for High-Fidelity */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="glass-panel p-8 sm:p-10 rounded-[2.5rem] border-white/20 shadow-premium relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="relative z-10 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 shadow-inner">
                  <Stethoscope className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {isRtl ? 'ابحث عن طبيبك واستشر الآن' : 'Find Your Doctor'}
                </h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  {isRtl ? 'أكثر من ٥٠٠ استشاري متاحون لرعايتك' : 'Over 500+ specialists ready to help'}
                </p>
              </div>

              {/* Form Redesign */}
              <form onSubmit={handleSearchSubmit} className="relative z-10 space-y-5">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    {isRtl ? 'اسم الطبيب أو التخصص' : 'Search Criteria'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('hero.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none placeholder:text-slate-400 font-medium"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    className="h-14 rounded-2xl text-base shadow-xl shadow-teal-500/10"
                  >
                    {isRtl ? 'ابدأ البحث' : 'Search Now'}
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {isRtl ? 'بوابة طبية آمنة بنسبة ١٠٠٪' : '100% Secure Medical Portal'}
                  </span>
                </div>
              </form>

              {/* Card Decoration */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
