import { z } from "zod";

export const CreateReservationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is too short"),
  whatsapp: z.string().optional(),
  excursionId: z.string().min(1, "Excursion selection is required"),
  reservationDate: z.string().transform((val) => new Date(val)),
  numberOfGuests: z.union([z.string(), z.number()]).transform((val) => {
    const parsed = parseInt(val.toString(), 10);
    return isNaN(parsed) ? 2 : parsed;
  }),
  hotel: z.string().min(2, "Hotel/lodging information is required"),
  pickupLocation: z.string().optional(),
  specialRequests: z.string().optional()
});

export type CreateReservationInput = z.infer<typeof CreateReservationSchema>;
