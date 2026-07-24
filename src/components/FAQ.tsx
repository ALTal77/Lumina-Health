import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { MOCK_FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-32 bg-white relative">
      <Container className="max-w-4xl">
        <SectionHeading
          badge={t('faq.title')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
        />

        <div className="space-y-4">
          {MOCK_FAQS.map((item, idx) => {
            const isOpen = openId === item.id;
            const question = t(`faq.${item.qKey}`);
            const answer = t(`faq.${item.aKey}`);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-50 border-teal-200/60 shadow-glass' 
                    : 'bg-white border-slate-100 hover:border-teal-100'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-start transition-colors outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5 pe-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isOpen ? 'bg-teal-600 text-white rotate-6' : 'bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${
                      isOpen ? 'text-teal-900' : 'text-slate-700'
                    }`}>
                      {question}
                    </span>
                  </div>

                  {/* Rotating Indicator */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isOpen ? 'bg-teal-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Animated Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 ml-14 sm:ml-15 border-t border-teal-100/30 pt-4">
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                          {answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
