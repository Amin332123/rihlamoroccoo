export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ReservationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  excursionId: string;
  date: string;
  guestsCount: number;
  lodging: string;
  pickupLocation?: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface ExcursionItem {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  availableDays: string[];
}
