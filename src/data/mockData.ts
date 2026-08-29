// Matches the backend's GET /api/doctors response shape (src/utils/mappers.js).
export interface Doctor {
  id: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  hospitalEn: string;
  hospitalAr: string;
  image: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  nextSlotEn: string;
  nextSlotAr: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  keyName: string;
  color: string;
}

export interface FAQItem {
  id: string;
  qKey: string;
  aKey: string;
}

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'special-consultation',
    iconName: 'Stethoscope',
    keyName: 'specialConsultation',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'general-consultation',
    iconName: 'UserCheck',
    keyName: 'generalConsultation',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'specialist-care',
    iconName: 'HeartPulse',
    keyName: 'specialistCare',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'diagnostics',
    iconName: 'Activity',
    keyName: 'diagnostics',
    color: 'from-teal-600 to-emerald-700',
  },
  {
    id: 'analysis',
    iconName: 'Microscope',
    keyName: 'analysis',
    color: 'from-blue-600 to-teal-600',
  },
];

export const MOCK_FAQS: FAQItem[] = [
  { id: 'faq-1', qKey: 'q1', aKey: 'a1' },
  { id: 'faq-2', qKey: 'q2', aKey: 'a2' },
  { id: 'faq-3', qKey: 'q3', aKey: 'a3' },
  { id: 'faq-4', qKey: 'q4', aKey: 'a4' },
  { id: 'faq-5', qKey: 'q5', aKey: 'a5' },
];
