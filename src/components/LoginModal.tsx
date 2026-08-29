import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  LogIn,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/Button";
import { loginPatient, ApiError, AuthSession } from "../api/client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: AuthSession) => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onOpenRegister,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const session = await loginPatient({ email, password });
      onSuccess(session);
      reset();
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

  const reset = () => {
    setEmail("");
    setPassword("");
    setFormError(null);
    setFieldErrors({});
  };

  const handleClose = () => {
    reset();
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
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2.5rem] max-w-md w-full p-6 shadow-2xl z-10 text-start border border-slate-100 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 cursor-pointer end-6 p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="text-center py-2 space-y-6">
            <div className="relative inline-block">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20 rotate-6">
                <LogIn className="w-8 h-8" />
              </div>
              <div className="absolute -inset-2 bg-teal-400/20 rounded-[2rem] blur-xl -z-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {t("loginModal.title")}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                {t("loginModal.subtitle")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                {t("loginModal.email")}
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  autoComplete="email"
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
                {t("loginModal.password")}
              </label>
              <div className="relative group">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
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

            <div className="pt-2 space-y-4">
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
                  <LogIn className="w-5 h-5" />
                )}
                <span>
                  {submitting
                    ? isRtl
                      ? "جارٍ تسجيل الدخول..."
                      : "Signing in..."
                    : t("loginModal.submit")}
                </span>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span>{t("loginModal.secureNote")}</span>
            </div>

            <div className="text-center text-sm font-medium text-slate-500 pt-1">
              {t("loginModal.noAccount")}{" "}
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenRegister();
                }}
                className="font-bold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
              >
                {t("loginModal.createAccount")}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};