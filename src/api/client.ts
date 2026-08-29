import type { Doctor } from "../data/mockData";

export const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000/api";

export interface Booking {
  reference: string;
  doctorId: string;
  patientName: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

export interface RegisteredPatient {
  patientId: string;
  name: string;
  idNumber: string;
  email: string;
}

export interface ApiError {
  status: number;
  error: string;
  details?: { field: string; message: string }[];
}

export class ApiError extends Error {
  constructor(status: number, error: string, details?: { field: string; message: string }[]) {
    super(error);
    this.name = "ApiError";
    this.status = status;
    this.error = error;
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch {
    throw new ApiError(0, "Network error. Please check your connection and try again.");
  }

  if (!res.ok) {
    let payload: { error?: string; details?: { field: string; message: string }[] } = {};
    try {
      payload = await res.json();
    } catch {
      // ignore parse failures, fall back to the generic message
    }
    throw new ApiError(res.status, payload.error || `Request failed (${res.status})`, payload.details);
  }

  return res.json() as Promise<T>;
}

export interface HealthStatus {
  status: string;
  time: string;
}

export function getHealth(): Promise<HealthStatus> {
  return request<HealthStatus>("/health");
}

export interface GetDoctorsResult {
  doctors: Doctor[];
  total: number;
}

export function getDoctorById(id: string): Promise<{ doctor: Doctor }> {
  return request<{ doctor: Doctor }>(`/doctors/${encodeURIComponent(id)}`);
}

export function getDoctors(search = "", specialty = ""): Promise<GetDoctorsResult> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (specialty) params.set("specialty", specialty);
  const qs = params.toString();
  return request<GetDoctorsResult>(`/doctors${qs ? `?${qs}` : ""}`);
}

export function getSpecialties(): Promise<{ specialtiesEn: string[]; specialtiesAr: string[] }> {
  return request<{ specialtiesEn: string[]; specialtiesAr: string[] }>("/doctors/specialties");
}

export interface CreateBookingPayload {
  doctorId: string;
  patientName: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export function createBooking(payload: CreateBookingPayload): Promise<{ booking: Booking }> {
  return request<{ booking: Booking }>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getBooking(reference: string): Promise<{ booking: Booking }> {
  return request<{ booking: Booking }>(`/bookings/${encodeURIComponent(reference)}`);
}

export interface RegisterPayload {
  fullName: string;
  nationalId: string;
  email: string;
  password: string;
  gender?: "male" | "female";
}

export function registerPatient(payload: RegisterPayload): Promise<{ patient: RegisteredPatient }> {
  return request<{ patient: RegisteredPatient }>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function sendContact(payload: ContactPayload): Promise<{ message: string; id: number }> {
  return request<{ message: string; id: number }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface AuthSession {
  token: string;
  patient: RegisteredPatient;
}

export function loginPatient(payload: { email: string; password: string }): Promise<AuthSession> {
  return request<AuthSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMe(token: string): Promise<{ patient: RegisteredPatient }> {
  return request<{ patient: RegisteredPatient }>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

const SESSION_KEY = "lumina_health_session";

export function loadSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}