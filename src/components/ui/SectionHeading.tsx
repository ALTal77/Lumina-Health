import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  darkBg?: boolean;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  darkBg = false,
  id,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-10 sm:mb-14 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}
    >
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-3 ${
            darkBg
              ? 'bg-teal-500/20 text-teal-200 border border-teal-400/30'
              : 'bg-teal-100 text-teal-800 border border-teal-200'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
          darkBg ? 'text-white' : 'text-[#0E3B3D]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            darkBg ? 'text-teal-100/80' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
