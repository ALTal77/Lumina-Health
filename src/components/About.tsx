import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Users, Award, Clock, Activity, Sparkles } from "lucide-react";

export const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const stats = [
    { icon: Users, value: t("about.stat1"), label: t("about.stat1Label") },
    { icon: Award, value: t("about.stat2"), label: t("about.stat2Label") },
    { icon: Sparkles, value: t("about.stat3"), label: t("about.stat3Label") },
    { icon: Clock, value: t("about.stat4"), label: t("about.stat4Label") },
  ];

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Narrative Content */}
          <div className="space-y-8 relative z-10">
            <SectionHeading
              badge={t("about.title")}
              title={t("about.heading")}
              subtitle={t("about.paragraph")}
              centered={false}
            />

            {/* Premium Stats Grid - Integrated into flow */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group flex flex-col gap-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-premium hover:border-teal-100 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-900 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Premium Visual Component */}
          <div className="relative">
            {/* Visual Mosaic Redesign */}
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
                  alt="Medical Professional"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="space-y-4 pt-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600"
                    alt="Medical Facility"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
};
