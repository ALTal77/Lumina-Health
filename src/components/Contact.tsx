import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <Container>
        <SectionHeading
          badge={t("contact.title")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - High-Fidelity Info Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-teal-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-premium overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                <h3 className="text-2xl font-bold mb-8 text-white border-b border-white/5 pb-6 tracking-tight">
                  {isRtl ? "تواصل معنا" : "Get in Touch"}
                </h3>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-teal-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-teal-400/60 block font-bold uppercase tracking-widest">
                        {t("contact.callCenter")}
                      </span>
                      <a
                        href="tel:+963113334400"
                        className="font-bold text-xl hover:text-teal-400 transition-colors tracking-tight"
                      >
                        {t("contact.phone")}
                      </a>
                      <div className="flex items-center gap-2 text-xs text-amber-400/80 mt-1 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>{t("contact.emergency")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-teal-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-teal-400/60 block font-bold uppercase tracking-widest">
                        {t("contact.support")}
                      </span>
                      <a
                        href="mailto:care@luminahealth.sy"
                        className="font-bold text-lg hover:text-teal-400 transition-colors tracking-tight"
                      >
                        {t("contact.email")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-teal-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-teal-400/60 block font-bold uppercase tracking-widest">
                        {t("contact.campus")}
                      </span>
                      <span className="font-bold text-base text-slate-200 leading-snug">
                        {t("contact.address")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Decor */}
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4 opacity-50">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-medium uppercase tracking-widest">
                    {t("contact.hours")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-premium text-start relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

              <h3 className="text-2xl font-bold text-slate-900 mb-10 tracking-tight">
                {t("contact.formTitle")}
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-teal-100 rounded-3xl p-10 text-center space-y-6 shadow-glass"
                >
                  <div className="w-20 h-20 bg-teal-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20 rotate-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-2xl text-slate-900">
                      {isRtl ? "تم الإرسال بنجاح" : "Inquiry Received"}
                    </h4>
                    <p className="text-base text-slate-500 font-medium">
                      {t("contact.sentSuccess")}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="rounded-2xl px-8"
                  >
                    {isRtl ? "إرسال رسالة أخرى" : "Send Another Message"}
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        {t("contact.emailLabel")}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-medium"
                        placeholder="care@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-medium"
                      placeholder="Consultation Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("contact.message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-medium resize-none"
                      placeholder={
                        isRtl
                          ? "اكتب رسالتك هنا..."
                          : "How can we help you today?"
                      }
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="lg"
                      className="h-16 rounded-[1.25rem] text-base font-bold shadow-xl shadow-teal-500/10"
                    >
                      <Send className="w-5 h-5" />
                      <span>{t("contact.send")}</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
