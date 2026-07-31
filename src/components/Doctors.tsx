import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { MOCK_DOCTORS, Doctor } from "../data/mockData";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Calendar,
  Award,
  SearchX,
} from "lucide-react";
import { Button } from "./ui/Button";

interface DoctorsProps {
  onSelectDoctorToBook: (doctor: Doctor) => void;
  searchFilter?: string;
  specialtyFilter?: string;
}

export const Doctors: React.FC<DoctorsProps> = ({
  onSelectDoctorToBook,
  searchFilter = "",
  specialtyFilter = "",
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const filteredDoctors = MOCK_DOCTORS.filter((doc) => {
    const q = searchFilter.toLowerCase();
    const name = (isRtl ? doc.nameAr : doc.nameEn).toLowerCase();
    const spec = (isRtl ? doc.specialtyAr : doc.specialtyEn).toLowerCase();
    const matchesQuery = !searchFilter || name.includes(q) || spec.includes(q);
    const matchesSpecialty =
      !specialtyFilter ||
      doc.specialtyEn.toLowerCase() === specialtyFilter.toLowerCase() ||
      doc.specialtyAr.toLowerCase() === specialtyFilter.toLowerCase();
    return matchesQuery && matchesSpecialty;
  });

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const index = Math.min(
        pageCount - 1,
        Math.round(Math.abs(scrollLeft) / clientWidth),
      );
      setActiveIndex(Math.max(0, index));
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [filteredDoctors.length, pageCount]);

  // Compute how many dot pages fit based on the carousel width.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const computePageCount = () => {
      setPageCount(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    };
    computePageCount();
    window.addEventListener("resize", computePageCount);
    return () => window.removeEventListener("resize", computePageCount);
  }, [filteredDoctors.length, isRtl]);

  // Reset the active dot whenever the search or filter criteria change.
  useEffect(() => {
    setActiveIndex(0);
  }, [searchFilter, specialtyFilter]);

  const scrollPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: isRtl ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: isRtl ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="doctors"
      className="py-32 bg-slate-50 relative overflow-hidden"
    >
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-[140px] -ml-96 pointer-events-none" />

      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <SectionHeading
            badge={t("doctors.title")}
            title={t("doctors.title")}
            subtitle={t("doctors.subtitle")}
            centered={false}
          />

          {/* Carousel Arrows - Premium Style */}
          <div className="flex items-center gap-4 mb-2 lg:mb-14">
            <button
              onClick={scrollPrev}
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center transition-all shadow-premium hover:shadow-xl hover:border-teal-300 hover:text-teal-600 cursor-pointer group active:scale-95"
              aria-label="Previous Doctor"
            >
              <ChevronLeft
                className={`w-6 h-6 transition-transform group-hover:-translate-x-0.5 ${isRtl ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={scrollNext}
              className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center transition-all shadow-premium hover:shadow-xl hover:border-teal-300 hover:text-teal-600 cursor-pointer group active:scale-95"
              aria-label="Next Doctor"
            >
              <ChevronRight
                className={`w-6 h-6 transition-transform group-hover:translate-x-0.5 ${isRtl ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-premium mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">
              {isRtl ? "لا توجد نتائج مطابقة" : "No doctors found"}
            </h4>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {isRtl
                ? "جرّب كلمة بحث مختلفة أو اختر تخصصاً آخر"
                : "Try a different keyword or choose another specialty"}
            </p>
          </div>
        ) : (
          <>
            {/* Carousel Container Redesign */}
            <div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-proximity py-8 -mx-4 px-4 sm:-mx-0 sm:px-0"
            >
              {filteredDoctors.map((doc, idx) => {
                const name = isRtl ? doc.nameAr : doc.nameEn;
                const specialty = isRtl ? doc.specialtyAr : doc.specialtyEn;
                const hospital = isRtl ? doc.hospitalAr : doc.hospitalEn;

                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="snap-start shrink-0 w-[300px] sm:w-[350px] bg-white rounded-[2.5rem] p-6 shadow-premium hover:shadow-2xl transition-all duration-500 border border-slate-100 group relative"
                  >
                    {/* Photo & High-Fidelity Badges */}
                    <div className="relative mb-6 overflow-hidden rounded-[2rem] h-64 bg-slate-100 shadow-inner">
                      <img
                        src={doc.image}
                        alt={name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Rating Glass Badge */}
                      <div className="absolute top-4 start-4 px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-glass">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-medium">
                          ({doc.reviewsCount})
                        </span>
                      </div>

                      {/* Experience Badge */}
                      <div className="absolute bottom-4 end-4 px-4 py-2 rounded-2xl bg-teal-600/90 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-2 shadow-glass">
                        <Award className="w-4 h-4 text-teal-200" />
                        <span>
                          {doc.experience} {t("doctors.experience")}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info Redesign */}
                    <div className="text-start space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.15em]">
                          {specialty}
                        </span>
                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-teal-700 transition-colors">
                          {name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-300" />
                          <span>{hospital}</span>
                        </div>
                      </div>

                      {/* Availability Row */}
                      <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <Clock className="w-4 h-4 text-teal-500" />
                          <span>{isRtl ? "الموعد القادم" : "Next Available"}</span>
                        </div>
                        <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                          {isRtl ? doc.nextSlotAr : doc.nextSlotEn}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => onSelectDoctorToBook(doc)}
                        className="h-12 rounded-2xl text-sm font-bold shadow-lg shadow-teal-500/10 group-hover:bg-teal-700"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t("doctors.bookBtn")}</span>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: pageCount }, (_, i) => i).map((i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (carouselRef.current) {
                      const { scrollWidth, clientWidth } = carouselRef.current;
                      const maxScroll = Math.max(0, scrollWidth - clientWidth);
                      const target =
                        i === pageCount - 1 ? maxScroll : i * clientWidth;
                      carouselRef.current.scrollTo({
                        left: (isRtl ? -1 : 1) * target,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-[#3FB6B4]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to page ${i + 1} of ${pageCount}`}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
