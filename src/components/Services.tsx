import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { MOCK_SERVICES, ServiceItem } from '../data/mockData';
import { Stethoscope, UserCheck, HeartPulse, Activity, Microscope, ArrowRight, X, Check } from 'lucide-react';
import { Button } from './ui/Button';

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    const iconClass = "w-7 h-7 transition-transform duration-500 group-hover:scale-110";
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className={iconClass} />;
      case 'UserCheck': return <UserCheck className={iconClass} />;
      case 'HeartPulse': return <HeartPulse className={iconClass} />;
      case 'Activity': return <Activity className={iconClass} />;
      case 'Microscope': return <Microscope className={iconClass} />;
      default: return <Stethoscope className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50/80 rounded-full blur-[120px] -ml-64 -mb-64" />

      <Container className="relative z-10">
        <SectionHeading
          badge={t('nav.services')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        {/* Services Grid Redesign */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {MOCK_SERVICES.map((service, index) => {
            const title = t(`services.${service.keyName}.title`);
            const desc = t(`services.${service.keyName}.desc`);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Accent Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:shadow-teal-500/30 group-hover:rotate-6">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                    {desc}
                  </p>
                </div>

                {/* Interactive Footer */}
                <div className="relative pt-6 mt-2 flex items-center justify-between border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                    {t('services.learnMore')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 text-start overflow-hidden border border-slate-100"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 end-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF8F7] flex items-center justify-center shrink-0 text-[#3FB6B4]">
                  {getIcon(selectedService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#3FB6B4] uppercase tracking-wider">
                    {t('nav.services')}
                  </span>
                  <h3 className="font-bold text-xl text-[#0E3B3D]">
                    {t(`services.${selectedService.keyName}.title`)}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {t(`services.${selectedService.keyName}.desc`)}
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2 border border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{isRtl ? 'تشخيص دقيق مع كادر استشاري مؤهل' : 'Accurate diagnosis with qualified consultants'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{isRtl ? 'حجز فوري بدون انتظار في المستشفى' : 'Instant digital appointment with zero wait time'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{isRtl ? 'متابعة نتائج الفحوصات عبر الملف الطبي' : 'Digital medical record integration'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setSelectedService(null);
                    onOpenBooking();
                  }}
                >
                  {t('hero.ctaBook')}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
