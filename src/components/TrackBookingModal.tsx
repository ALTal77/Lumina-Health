import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  Stethoscope,
} from "lucide-react";
import { getBooking, getDoctorById, ApiError, type Booking } from "../api/client";
import { Button } from "./ui/Button";

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function statusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-teal-50 border-teal-200 text-teal-700";
    case "cancelled":
    case "canceled":
      return "bg-rose-50 border-rose-200 text-rose-700";
    default:
      return "bg-amber-50 border-amber-200 text-amber-700";
  }
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  const reset = () => {
    setReference("");
    setLoading(false);
    setError(null);
    setBooking(null);
    setDoctorName(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    setLoading(true);
    setError(null);
    setBooking(null);
    setDoctorName(null);

    try {
      const { booking } = await getBooking(reference.trim());
      setBooking(booking);
      // Best-effort: resolve the doctor's display name for the result card.
      try {
        const res = await getDoctorById(booking.doctorId);
        setDoctorName(isRtl ? res.doctor.nameAr : res.doctor.nameEn);
      } catch {
        // If the doctor lookup fails, the reference and other fields still show.
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError(t("trackBooking.notFound"));
      } else if (err instanceof ApiError) {
        setError(err.error);
      } else {
        setError(t("trackBooking.networkError"));
      }
    } finally {
      setLoading(false);
    }
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-md p-5 sm:p-8 shadow-2xl z-10 text-start border border-slate-100 my-4"
        >
          <button
            onClick={handleClose}
            className="absolute top-3 end-3 sm:top-6 sm:end-6 cursor-pointer p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="flex items-center gap-3 text-xs font-bold text-teal-600 uppercase tracking-[0.2em] mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>{t("trackBooking.title")}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
            {t("trackBooking.subtitle")}
          </h3>

          {booking ? (
            <div className="space-y-5">
              {/* Reference Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 end-0 w-20 h-20 bg-teal-500/5 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-3">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                      {t("trackBooking.referenceLabel")}
                    </div>
                    <div className="font-mono font-bold text-xl text-slate-900 tracking-wider break-all">
                      {booking.reference}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200/60">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusBadgeClass(
                        booking.status,
                      )}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 me-1.5" />
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctorName && (
                  <DetailRow icon={<Stethoscope className="w-4 h-4" />} label={t("trackBooking.doctorLabel")}>
                    {doctorName}
                  </DetailRow>
                )}
                <DetailRow icon={<User className="w-4 h-4" />} label={t("trackBooking.patientLabel")}>
                  {booking.patientName}
                </DetailRow>
                <DetailRow icon={<Phone className="w-4 h-4" />} label={t("trackBooking.phoneLabel")}>
                  {booking.phone}
                </DetailRow>
                <DetailRow icon={<Calendar className="w-4 h-4" />} label={t("trackBooking.dateLabel")}>
                  {booking.date}
                </DetailRow>
                <DetailRow icon={<Clock className="w-4 h-4" />} label={t("trackBooking.timeLabel")}>
                  {booking.timeSlot}
                </DetailRow>
                {booking.notes && (
                  <div className="sm:col-span-2">
                    <DetailRow icon={<FileText className="w-4 h-4" />} label={t("trackBooking.notesLabel")}>
                      {booking.notes}
                    </DetailRow>
                  </div>
                )}
              </div>

              <Button variant="primary" fullWidth size="lg" onClick={handleClose} className="h-14 rounded-2xl text-base font-bold">
                {t("trackBooking.close")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLookup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  {t("trackBooking.referenceLabel")}
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder={t("trackBooking.placeholder")}
                    className="w-full px-4 py-3.5 pl-10 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                variant="primary"
                fullWidth
                size="lg"
                type="submit"
                disabled={loading}
                className="h-14 rounded-2xl text-base font-bold shadow-xl shadow-teal-500/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>
                  {loading
                    ? isRtl
                      ? "جارٍ البحث..."
                      : "Searching..."
                    : t("trackBooking.lookup")}
                </span>
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
        <span className="text-teal-500">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-bold text-slate-800 break-words">{children}</div>
    </div>
  );
}
