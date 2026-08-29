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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  registerPatient,
  loginPatient,
  ApiError,
  AuthSession,
} from "../api/client";
import logo from "../assets/images/full.png";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onSuccess: (session: AuthSession) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  onSuccess,
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
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nationalId || !email || !password) return;
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const { patient } = await registerPatient({
        fullName,
        nationalId,
        email,
        password,
        gender: gender as "male" | "female",
      });
      setRegisteredCard({
        idNumber: patient.idNumber,
        patientId: patient.patientId,
        name: patient.name,
      });

      // Registration alone doesn't issue a token, so sign the patient in
      // immediately with the same credentials. This keeps the navbar from
      // snapping back to the guest state (which feels like a page reload) and
      // surfaces the username chip without any extra steps.
      try {
        const session = await loginPatient({ email, password });
        onSuccess(session);
      } catch {
        // Silent fallback: the ID card still shows and the "Sign in" link
        // remains available if auto-login is rate-limited or otherwise fails.
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.error);
        if (err.details?.length) {
          const byField: Record<string, string> = {};
          for (const d of err.details) byField[d.field] = d.message;
          setFieldErrors(byField);
        }
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setRegisteredCard(null);
    setFullName("");
    setNationalId("");
    setEmail("");
    setPassword("");
    setFormError(null);
    setFieldErrors({});
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
                      <img
                        src={logo}
                        alt="Lumina Health Logo"
                        className="h-7 w-auto rounded-md bg-white p-1"
                      />
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
                {isRtl ? "تم" : "Done"}
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
                  {fieldErrors.fullName && (
                    <span className="block text-xs font-bold text-rose-500 mt-1">
                      {fieldErrors.fullName}
                    </span>
                  )}
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
                  {fieldErrors.nationalId && (
                    <span className="block text-xs font-bold text-rose-500 mt-1">
                      {fieldErrors.nationalId}
                    </span>
                  )}
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
                  {fieldErrors.email && (
                    <span className="block text-xs font-bold text-rose-500 mt-1">
                      {fieldErrors.email}
                    </span>
                  )}
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
                  {fieldErrors.password && (
                    <span className="block text-xs font-bold text-rose-500 mt-1">
                      {fieldErrors.password}
                    </span>
                  )}
                </div>

                <div className="pt-4 space-y-4">
                  {formError && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    type="submit"
                    disabled={submitting}
                    className="h-16 rounded-2xl text-lg font-bold shadow-xl shadow-teal-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    <span>
                      {submitting
                        ? isRtl
                          ? "جارٍ الإنشاء..."
                          : "Creating account..."
                        : t("nav.register")}
                    </span>
                  </Button>

                  <div className="text-center text-sm font-medium text-slate-500 pt-1">
                    {t("registerModal.haveAccount")}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenLogin();
                      }}
                      className="font-bold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                    >
                      {t("registerModal.signIn")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
