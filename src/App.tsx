import React, { useState } from 'react';
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
import { Doctor } from './data/mockData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');

  const handleOpenBooking = (doc?: Doctor) => {
    setSelectedDoctorForBooking(doc || null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans overflow-x-hidden">
      {/* Navigation */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onSearchDoctors={(q) => setDoctorSearchQuery(q)}
        />

        {/* About Us Section */}
        <About />

        {/* Our Services Section */}
        <Services onOpenBooking={() => handleOpenBooking()} />

        {/* FAQ Section */}
        <FAQ />

        {/* Our Doctors Section */}
        <Doctors
          onSelectDoctorToBook={(doc) => handleOpenBooking(doc)}
          searchFilter={doctorSearchQuery}
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
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
