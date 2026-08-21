import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { FAQ } from './components/FAQ';
import { Doctors } from './components/Doctors';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { RegisterModal } from './components/RegisterModal';
import { LoginModal } from './components/LoginModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { TrackBookingModal } from './components/TrackBookingModal';
import { Doctor } from './data/mockData';
import {
  getDoctors,
  getSpecialties,
  getHealth,
  getMe,
  ApiError,
  AuthSession,
  loadSession,
  saveSession,
  clearSession,
} from './api/client';

export default function App() {
  const { t } = useTranslation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isDoctorDetailOpen, setIsDoctorDetailOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedDoctorIdForDetail, setSelectedDoctorIdForDetail] = useState<string | null>(null);
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [serverOnline, setServerOnline] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState('');

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorsError, setDoctorsError] = useState<string | null>(null);
  const [specialtiesEn, setSpecialtiesEn] = useState<string[]>([]);
  const [specialtiesAr, setSpecialtiesAr] = useState<string[]>([]);

  const loadDoctors = useCallback(async (search: string, specialty: string) => {
    setDoctorsLoading(true);
    setDoctorsError(null);
    try {
      const data = await getDoctors(search, specialty);
      setDoctors(data.doctors);
    } catch (err) {
      setDoctorsError(err instanceof ApiError ? err.error : 'Failed to load doctors.');
    } finally {
      setDoctorsLoading(false);
    }
  }, []);

  // Debounce the live search input so we don't hit the API on every keystroke.
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(doctorSearchQuery), 300);
    return () => clearTimeout(timer);
  }, [doctorSearchQuery]);

  useEffect(() => {
    loadDoctors(debouncedQuery, doctorSpecialtyFilter);
  }, [debouncedQuery, doctorSpecialtyFilter, loadDoctors]);

  useEffect(() => {
    getSpecialties()
      .then((s) => {
        setSpecialtiesEn(s.specialtiesEn);
        setSpecialtiesAr(s.specialtiesAr);
      })
      .catch(() => {
        // The hero dropdown is non-critical; leave it empty on failure.
      });
  }, []);

  // Lightweight connectivity probe so the UI can surface a banner when the
  // backend is unreachable (instead of silently failing like before).
  useEffect(() => {
    getHealth()
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));
  }, []);

  // Validate any stored session on mount: an expired/invalid JWT is cleared
  // quietly so the UI doesn't show a stale signed-in state.
  useEffect(() => {
    const existing = loadSession();
    if (!existing) return;
    getMe(existing.token)
      .then(() => setSession(existing))
      .catch(() => {
        clearSession();
        setSession(null);
      });
  }, []);

  const handleOpenBooking = (doc?: Doctor) => {
    setSelectedDoctorForBooking(doc || null);
    setIsBookingOpen(true);
  };

  const handleOpenDoctorDetail = (doc: Doctor) => {
    setSelectedDoctorIdForDetail(doc.id);
    setIsDoctorDetailOpen(true);
  };

  const handleBookFromDetail = (doc: Doctor) => {
    setIsDoctorDetailOpen(false);
    setSelectedDoctorIdForDetail(null);
    handleOpenBooking(doc);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans overflow-x-hidden">
      {/* Connection banner: shown when the backend is unreachable */}
      {!serverOnline && !bannerDismissed && (
        <div className="fixed bottom-4 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 max-w-md w-full bg-rose-600 text-white text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="flex-1 leading-snug">{t("banner.offline")}</span>
            <button
              onClick={() => setBannerDismissed(true)}
              className="shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              aria-label={t("banner.dismiss")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenTrack={() => setIsTrackOpen(true)}
        onLogout={() => {
          clearSession();
          setSession(null);
        }}
        sessionPatientName={session?.patient.name ?? null}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          specialtiesEn={specialtiesEn}
          specialtiesAr={specialtiesAr}
          onSearchDoctors={(q, spec) => {
            setDoctorSearchQuery(q);
            setDoctorSpecialtyFilter(spec);
          }}
        />

        {/* About Us Section */}
        <About />

        {/* Our Services Section */}
        <Services onOpenBooking={() => handleOpenBooking()} />

        {/* FAQ Section */}
        <FAQ />

        {/* Our Doctors Section */}
        <Doctors
          doctors={doctors}
          loading={doctorsLoading}
          error={doctorsError}
          onRetry={() => loadDoctors(debouncedQuery, doctorSpecialtyFilter)}
          onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
          onSelectDoctorToView={(doc) => handleOpenDoctorDetail(doc)}
          searchFilter={doctorSearchQuery}
          specialtyFilter={doctorSpecialtyFilter}
        />

        {/* Contact Us Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedDoctor={selectedDoctorForBooking}
        doctors={doctors}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        onSuccess={(newSession) => {
          saveSession(newSession);
          setSession(newSession);
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(newSession) => {
          saveSession(newSession);
          setSession(newSession);
          setIsLoginOpen(false);
        }}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <DoctorDetailModal
        isOpen={isDoctorDetailOpen}
        onClose={() => {
          setIsDoctorDetailOpen(false);
          setSelectedDoctorIdForDetail(null);
        }}
        doctorId={selectedDoctorIdForDetail}
        onBook={(doc) => handleBookFromDetail(doc)}
      />

      <TrackBookingModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />
    </div>
  );
}