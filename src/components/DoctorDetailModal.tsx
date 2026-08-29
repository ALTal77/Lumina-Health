import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Star,
  MapPin,
  Award,
  CalendarCheck,
  Loader2,
  AlertCircle,
  Stethoscope,
} from "lucide-react";
import type { Doctor } from "../data/mockData";
import { getDoctorById, ApiError } from "../api/client";
import { Button } from "./ui/Button";

interface DoctorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string | null;
  onBook: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  onBook,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !doctorId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setDoctor(null);

    getDoctorById(doctorId)
      .then((res) => {
        if (!cancelled) setDoctor(res.doctor);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.error : "Failed to load doctor profile.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, doctorId]);

  if (!isOpen) return null;

  const name = doctor ? (isRtl ? doctor.nameAr : doctor.nameEn) : "";
  const specialty = doctor ? (isRtl ? doctor.specialtyAr : doctor.specialtyEn) : "";
  const hospital = doctor ? (isRtl ? doctor.hospitalAr : doctor.hospitalEn) : "";
  const nextSlot = doctor ? (isRtl ? doctor.nextSlotAr : doctor.nextSlotEn) : "";

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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-lg p-5 sm:p-8 shadow-2xl z-10 text-start border border-slate-100 my-4"
        >
          <button
            onClick={onClose}
            className="absolute top-3 end-3 sm:top-6 sm:end-6 cursor-pointer p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all duration-300 group z-10"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              <span className="text-sm font-bold text-slate-500">
                {isRtl ? "جارٍ تحميل الملف..." : "Loading profile..."}
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                <AlertCircle className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-600 max-w-xs">{error}</p>
              <Button variant="outline" size="sm" onClick={onClose} className="gap-1.5">
                <X className="w-4 h-4" />
                {isRtl ? "إغلاق" : "Close"}
              </Button>
            </div>
          ) : doctor ? (
            <div>
              {/* Header Photo */}
              <div className="relative h-56 sm:h-64 -mx-5 sm:-mx-8 -mt-5 sm:-mt-8 rounded-t-[2rem] sm:rounded-t-[2.5rem] overflow-hidden bg-slate-100">
                <img src={doctor.image} alt={name} className="w-full h-full object-cover" />
                <div className="absolute top-4 start-4 px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-glass">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-medium">
                    ({doctor.reviewsCount})
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.15em]">
                    {specialty}
                  </span>
                  <h3 className="font-bold text-2xl text-slate-900">{name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-slate-300" />
                    <span>{hospital}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-3">
                    <Award className="w-5 h-5 text-teal-600" />
                    <div>
                      <div className="text-lg font-bold text-slate-900">
                        {doctor.experience}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t("doctorDetail.experience")}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-3">
                    <CalendarCheck className="w-5 h-5 text-teal-600" />
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {t("doctorDetail.nextSlot")}
                      </div>
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {nextSlot}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
