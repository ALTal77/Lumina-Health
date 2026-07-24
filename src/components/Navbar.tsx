import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Menu, X, UserPlus, PhoneCall } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          className={`transition-all duration-500 rounded-[2rem] px-6 py-2.5 flex items-center justify-between ${
            isScrolled
              ? "glass-panel shadow-premium border-slate-200/50"
              : "bg-transparent"
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
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300 hover:text-teal-600"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              <Globe
                className={`w-3.5 h-3.5 ${isScrolled ? "text-teal-500" : "text-teal-300"}`}
              />
              <span className="">
                {i18n.language === "en" ? "العربية" : "English"}
              </span>
            </button>

            {/* CTA Button */}
            <Button
              variant={isScrolled ? "primary" : "dark"}
              size="sm"
              onClick={onOpenRegister}
              className="px-6 shadow-lg shadow-teal-500/10"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t("nav.register")}</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={handleLanguageToggle}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                isScrolled
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              {i18n.language === "en" ? "AR" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-all ${
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
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

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 sm:hidden"
            />

            {/* Menu Slide-down Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full inset-x-0 bg-white border-b border-slate-200 shadow-xl px-6 py-6 space-y-4 z-50 sm:hidden origin-top"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-base font-semibold text-slate-800 hover:text-[#3FB6B4] hover:bg-teal-50 rounded-xl transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{t("nav.register")}</span>
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t("nav.bookNow")}</span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
