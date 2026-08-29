function mapDoctor(row) {
  return {
    id: row.id,
    nameEn: row.name_en,
    nameAr: row.name_ar,
    specialtyEn: row.specialty_en,
    specialtyAr: row.specialty_ar,
    hospitalEn: row.hospital_en,
    hospitalAr: row.hospital_ar,
    image: row.image,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    experience: row.experience,
    nextSlotEn: row.next_slot_en,
    nextSlotAr: row.next_slot_ar,
  };
}

function mapBooking(row) {
  return {
    reference: row.reference,
    doctorId: row.doctor_id,
    patientName: row.patient_name,
    phone: row.phone,
    date: row.date,
    timeSlot: row.time_slot,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
  };
}

module.exports = { mapDoctor, mapBooking };
