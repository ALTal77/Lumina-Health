import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  UserPlus,
  ShieldCheck,
  Mail,
  Lock,
  User,
  IdCard,
} from "lucide-react";
import { Button } from "./ui/Button";
import logo from "../assets/images/full.png";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [registeredCard, setRegisteredCard] = useState<{
    idNumber: string;
    patientId: string;
    name: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    const pid = "LUM-PT-" + Math.floor(1000 + Math.random() * 9000);
    setRegisteredCard({
      idNumber: nationalId || "1098475893",
      patientId: pid,
      name: fullName,
    });
  };

  const handleReset = () => {
    setRegisteredCard(null);
    setFullName("");
    setNationalId("");
    setEmail("");
    setPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window Redesign */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2.5rem] max-w-md w-full p-6 shadow-2xl z-10 text-start border border-slate-100 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-6 cursor-pointer end-6 p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          {registeredCard ? (
            /* Premium Digital Patient ID Card Result */
            <div className="text-center py-6 space-y-8">
              <div className="relative inline-block">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20 rotate-6">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <div className="absolute -inset-2 bg-teal-400/20 rounded-[2rem] blur-xl -z-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {isRtl ? "تم إنشاء الحساب بنجاح" : "Registration Complete"}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {isRtl
                    ? "ملفك الطبي الرقمي جاهز للاستخدام الآن"
                    : "Your digital medical profile is now active."}
                </p>
              </div>

              {/* Digital Card - High-Fidelity Redesign */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white rounded-[2rem] p-8 shadow-2xl text-start relative overflow-hidden my-6 border border-white/10 group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal-400/30 transition-colors duration-700" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="Lumina Health Logo" className="h-7 w-auto rounded-md bg-white p-1" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-teal-500/20 text-teal-200 px-2.5 py-1 rounded-full border border-teal-500/30">
                      PATIENT CARD
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] text-teal-400/60 uppercase font-bold tracking-widest block mb-1">
                        {isRtl ? "اسم المريض" : "Patient Name"}
                      </span>
                      <span className="font-bold text-xl tracking-tight block">
                        {registeredCard.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <span className="text-[10px] text-teal-400/60 uppercase font-bold tracking-widest block mb-1">
                          {isRtl ? "رقم ملف المريض" : "Patient ID"}
                        </span>
                        <span className="font-mono font-bold text-sm text-teal-300">
                          {registeredCard.patientId}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-teal-400/60 uppercase font-bold tracking-widest block mb-1">
                          {isRtl ? "الهوية / الإقامة" : "ID / Iqama"}
                        </span>
                        <span className="font-mono text-xs text-slate-400 font-bold">
                          {registeredCard.idNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleReset}
                className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-teal-500/10"
              >
                {isRtl ? "تم، متابعة" : "Done & Continue"}
              </Button>
            </div>
          ) : (
            /* Registration Form Redesign */
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-teal-600 uppercase tracking-[0.2em] mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>{t("nav.register")}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                {isRtl ? "إنشاء حساب مريض" : "Create Account"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {isRtl ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-6 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {isRtl ? "رقم الهوية أو الإقامة" : "National ID / Iqama"}
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder="10XXXXXXXX"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full px-6 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                    />
                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {isRtl ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="care@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {isRtl ? "كلمة المرور" : "Secure Password"}
                  </label>
                  <div className="relative group">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    type="submit"
                    className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-teal-500/10"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>{t("nav.register")}</span>
                  </Button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
