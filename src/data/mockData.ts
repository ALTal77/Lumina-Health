export interface Doctor {
  id: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  titleEn: string;
  titleAr: string;
  hospitalEn: string;
  hospitalAr: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  image: string;
  availableDays: string[];
  nextSlotEn: string;
  nextSlotAr: string;
  consultationFee: number;
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

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    nameEn: 'Dr. Sarah Al-Khatib',
    nameAr: 'د. سارة الخطيب',
    specialtyEn: 'Cardiology Consultant',
    specialtyAr: 'استشاري أمراض القلب والأوعية',
    titleEn: 'Senior Cardiology Specialist',
    titleAr: 'كبير أخصائيي القلب والقسطرة',
    hospitalEn: 'Al-Mouwasat University Hospital',
    hospitalAr: 'مشفى المواساة الجامعي',
    experience: 12,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Sun', 'Tue', 'Thu'],
    nextSlotEn: 'Today, 4:30 PM',
    nextSlotAr: 'اليوم، ٤:٣٠ مساءً',
    consultationFee: 35,
  },
  {
    id: 'doc-2',
    nameEn: 'Dr. Omar Al-Hajji',
    nameAr: 'د. عمر الحجي',
    specialtyEn: 'Pediatrics Specialist',
    specialtyAr: 'أخصائي طب الأطفال وحديثي الولادة',
    titleEn: 'Head of Pediatric Care',
    titleAr: 'رئيس قسم رعاية الأطفال',
    hospitalEn: 'Damascus Children\'s Hospital',
    hospitalAr: 'مشفى دمشق للأطفال',
    experience: 10,
    rating: 4.8,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Mon', 'Wed', 'Sat'],
    nextSlotEn: 'Tomorrow, 10:00 AM',
    nextSlotAr: 'غداً، ١٠:٠٠ صباحاً',
    consultationFee: 25,
  },
  {
    id: 'doc-3',
    nameEn: 'Dr. Lina Kamal',
    nameAr: 'د. لينا كمال',
    specialtyEn: 'Neurology Specialist',
    specialtyAr: 'استشاري أمراض المخ والأعصاب',
    titleEn: 'Brain & Spine Specialist',
    titleAr: 'أخصائي جراحة الأعصاب والمخ',
    hospitalEn: 'Ibn Al-Nafees Hospital',
    hospitalAr: 'مشفى ابن النفيس',
    experience: 14,
    rating: 4.95,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Sun', 'Mon', 'Wed'],
    nextSlotEn: 'Today, 6:00 PM',
    nextSlotAr: 'اليوم، ٦:٠٠ مساءً',
    consultationFee: 45,
  },
  {
    id: 'doc-4',
    nameEn: 'Dr. Tariq Sherif',
    nameAr: 'د. طارق شريف',
    specialtyEn: 'Orthopedic Surgeon',
    specialtyAr: 'استشاري جراحة العظام والمفاصل',
    titleEn: 'Joint Replacement Expert',
    titleAr: 'خبير تبديل المفاصل والإصابات الرياضية',
    hospitalEn: 'Al-Sham Medical Complex',
    hospitalAr: 'مجمع الشام الطبي',
    experience: 15,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Sun', 'Tue', 'Thu'],
    nextSlotEn: 'Tomorrow, 2:15 PM',
    nextSlotAr: 'غداً، ٢:١٥ مساءً',
    consultationFee: 40,
  },
  {
    id: 'doc-5',
    nameEn: 'Dr. Layla Al-Husri',
    nameAr: 'د. ليلى الحصري',
    specialtyEn: 'Dermatology Specialist',
    specialtyAr: 'أخصائي الأمراض الجلدية والتجميل',
    titleEn: 'Laser & Aesthetic Consultant',
    titleAr: 'استشاري الليزر والعناية بالبشرة',
    hospitalEn: 'Al-Mazzah Medical Center',
    hospitalAr: 'مركز المزة الطبي',
    experience: 8,
    rating: 4.85,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Mon', 'Thu', 'Sat'],
    nextSlotEn: 'Today, 5:00 PM',
    nextSlotAr: 'اليوم، ٥:٠٠ مساءً',
    consultationFee: 30,
  },
  {
    id: 'doc-6',
    nameEn: 'Dr. Yusuf Al-Azmah',
    nameAr: 'د. يوسف العظمة',
    specialtyEn: 'Ophthalmologist',
    specialtyAr: 'استشاري طب وجراحة العيون',
    titleEn: 'LASIK & Vision Correction Expert',
    titleAr: 'خبير تصحيح النظر والليزك',
    hospitalEn: 'Al-Assad University Hospital',
    hospitalAr: 'مستشفى الأسد الجامعي',
    experience: 11,
    rating: 4.88,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    availableDays: ['Sun', 'Wed', 'Thu'],
    nextSlotEn: 'Tomorrow, 11:30 AM',
    nextSlotAr: 'غداً، ١١:٣٠ صباحاً',
    consultationFee: 35,
  },
];

export const MOCK_FAQS: FAQItem[] = [
  { id: 'faq-1', qKey: 'q1', aKey: 'a1' },
  { id: 'faq-2', qKey: 'q2', aKey: 'a2' },
  { id: 'faq-3', qKey: 'q3', aKey: 'a3' },
  { id: 'faq-4', qKey: 'q4', aKey: 'a4' },
  { id: 'faq-5', qKey: 'q5', aKey: 'a5' },
];
