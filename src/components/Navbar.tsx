import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Menu,
  X,
  UserPlus,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { updateHtmlDir } from "../i18n/i18n";
import { Button } from "./ui/Button";
import logo from "../assets/images/full.png";

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenBooking,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const handleLanguageToggle = () => {
    const nextLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLang);
    updateHtmlDir(nextLang);
  };

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.doctors"), href: "#doctors" },
    { name: t("nav.faq"), href: "#faq" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-500 rounded-2xl px-6 py-2.5 flex items-center justify-between backdrop-blur-md bg-white/70 ${
            !isScrolled ? "md:bg-transparent md:backdrop-blur-none" : ""
          }`}
        >
          {/* Logo */}
          <a href="#home" className="shrink-0">
            <img
              src={logo}
              alt="Lumina Health Logo"
              className="h-12 sm:h-15 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? "text-slate-600 hover:text-teal-600 hover:bg-teal-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageToggle}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                isScrolled ? "" : ""
              }`}
            >
              <Globe
                className={`w-5 h-5 ${isScrolled ? "text-teal-600" : "text-teal-300"}`}
              />
            </button>

            {/* CTA Button */}
            <button
              onClick={onOpenRegister}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                isScrolled ? "" : ""
              }`}
            >
              <UserPlus
                className={`w-5 h-5 ${isScrolled ? "text-teal-600" : "text-teal-300"}`}
              />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleLanguageToggle}
              className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                isScrolled
                  ? ""
                  : ""
              }`}
            >
              <Globe
                className={`w-5 h-5 ${isScrolled ? "text-teal-600" : "text-teal-600"}`}
              />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-all ${
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : ""
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 md:hidden"
            />

            {/* Fullscreen Panel */}
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 md:hidden bg-white/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
            >
              {/* Decorative glows */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="pointer-events-none absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

              <div className="relative flex min-h-full flex-col">
                {/* Top bar: logo + close */}
                <div className="flex items-center justify-between px-6 py-4">
                  <img
                    src={logo}
                    alt="Lumina Health Logo"
                    className="h-10 w-auto object-contain"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:rotate-90 hover:bg-teal-50 hover:text-teal-600"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 space-y-1 px-6 py-4">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.06, duration: 0.3 }}
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-base font-bold text-slate-800 transition-colors hover:bg-teal-50 hover:text-teal-600"
                    >
                      <span>{link.name}</span>
                      <ChevronRight
                        className={`h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-teal-500 ${
                          isRtl ? "rotate-180 group-hover:-translate-x-0.5" : ""
                        }`}
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Footer: CTAs + language */}
                <div className="space-y-3 border-t border-slate-100 px-6 py-6">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenRegister();
                    }}
                    className="gap-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>{t("nav.register")}</span>
                  </Button>

                  <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="gap-2"
                  >
                    <PhoneCall className="h-5 w-5" />
                    <span>{t("nav.bookNow")}</span>
                  </Button>

                  <button
                    onClick={() => {
                      handleLanguageToggle();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-600"
                  >
                    <Globe className="h-4 w-4 text-teal-500" />
                    <span>{i18n.language === "en" ? "العربية" : "English"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
