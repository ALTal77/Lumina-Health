import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Doctor, MOCK_DOCTORS } from "../data/mockData";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  User,
  Phone,
  FileText,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor?: Doctor | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDoctor,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [doctorId, setDoctorId] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [notes, setNotes] = useState("");
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDoctor) {
      setDoctorId(selectedDoctor.id);
    } else if (MOCK_DOCTORS.length > 0) {
      setDoctorId(MOCK_DOCTORS[0].id);
    }
  }, [selectedDoctor]);

  const activeDoc =
    MOCK_DOCTORS.find((d) => d.id === doctorId) ||
    selectedDoctor ||
    MOCK_DOCTORS[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !date) return;
    const refCode = "LUM-" + Math.floor(100000 + Math.random() * 900000);
    setConfirmedRef(refCode);
  };

  const handleReset = () => {
    setConfirmedRef(null);
    setPatientName("");
    setPhone("");
    setNotes("");
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

        {/* Modal Container Redesign */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-[calc(100%-1rem)] sm:max-w-md lg:max-w-lg p-5 sm:p-8 lg:p-10 shadow-2xl z-10 text-start border border-slate-100 my-4 sm:my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-3 end-3 sm:top-6 sm:end-6 cursor-pointer p-2 rounded-xl sm:p-2.5 sm:rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all duration-300 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          {confirmedRef ? (
            /* Premium Success Screen */
            <div className="text-center py-5 space-y-4">
              <div className="relative inline-block">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 text-white rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-teal-500/20 rotate-6">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                </div>
                <div className="absolute -inset-2 bg-teal-400/20 rounded-[2rem] blur-xl -z-10 animate-pulse" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {t("bookingModal.successTitle")}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium max-w-sm mx-auto">
                  {t("bookingModal.successMsg")}
                </p>
              </div>

              {/* Confirmation Card */}
              <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 text-start relative overflow-hidden shadow-inner group">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-teal-500/5 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div>
                    <div className="text-[10px] text-teal-600 uppercase font-bold tracking-[0.2em] mb-1">
                      {t("bookingModal.refNumber")}
                    </div>
                    <div className="font-mono font-bold text-2xl sm:text-3xl text-slate-900 tracking-wider break-all">
                      {confirmedRef}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-slate-200/60">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block truncate">
                        {isRtl ? "الطبيب" : "Doctor"}
                      </span>
                      <span className="text-sm font-bold text-slate-700 truncate block">
                        {isRtl ? activeDoc?.nameAr : activeDoc?.nameEn}
                      </span>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block truncate">
                        {isRtl ? "الموعد" : "Schedule"}
                      </span>
                      <span className="text-sm font-bold text-slate-700 truncate block">
                        {date} • {timeSlot}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleReset}
                className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-base sm:text-lg font-bold"
              >
                {isRtl ? "تم، العودة للرئيسية" : "Return Home"}
              </Button>
            </div>
          ) : (
            /* Form Redesign */
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-teal-600 uppercase tracking-[0.2em] mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>{t("bookingModal.title")}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 lg:mb-10 tracking-tight leading-tight">
                {t("bookingModal.subtitle")}{" "}
                <span className="text-teal-600 whitespace-nowrap">
                  {isRtl ? activeDoc?.nameAr : activeDoc?.nameEn}
                </span>
              </h3>

              <form onSubmit={handleConfirm} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {isRtl ? "اختيار الطبيب" : "Specialist Selection"}
                  </label>
                  <div className="relative group">
                    <select
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none text-slate-800 font-bold appearance-none cursor-pointer group-hover:border-teal-300"
                    >
                      {MOCK_DOCTORS.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {isRtl ? doc.nameAr : doc.nameEn} —{" "}
                          {isRtl ? doc.specialtyAr : doc.specialtyEn}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none group-hover:text-teal-600 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("bookingModal.patientName")}
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 pl-10 sm:pl-11 lg:pl-12 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                      />
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("bookingModal.phone")}
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        placeholder="+963 9XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 pl-10 sm:pl-11 lg:pl-12 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                      />
                      <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("bookingModal.date")}
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 pl-10 sm:pl-11 lg:pl-12 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold group-hover:border-teal-300"
                      />
                      <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t("bookingModal.time")}
                    </label>
                    <div className="relative group">
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 pl-10 sm:pl-11 lg:pl-12 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all outline-none font-bold appearance-none cursor-pointer group-hover:border-teal-300"
                      >
                        <option>09:00 AM</option>
                        <option>10:30 AM</option>
                        <option>01:00 PM</option>
                        <option>04:30 PM</option>
                        <option>06:00 PM</option>
                      </select>
                      <Clock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                      <ChevronDown className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none group-hover:text-teal-600 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-5 lg:pt-6">
                  <Button
                    variant="primary"
                    fullWidth
                    size="lg"
                    type="submit"
                    className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-base sm:text-lg font-bold shadow-xl shadow-teal-500/10"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t("bookingModal.confirm")}</span>
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
