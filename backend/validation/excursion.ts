import { z } from "zod";

export const CreateExcursionSchema = z.object({
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  shortDescription: z.string().min(10, "Short description is too short"),
  description: z.string().min(20, "Detailed description is too short"),
  location: z.string().min(2, "Location is required"),
  duration: z.string().min(2, "Duration is required"),
  price: z.string().min(2, "Price is required"),
  featuredImage: z.string().min(1, "Featured image path is required"),
  galleryImages: z.array(z.string()).optional().default([]),
  included: z.array(z.string()).optional().default([]),
  excluded: z.array(z.string()).optional().default([]),
  itinerary: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ).optional().default([]),
  meetingPoint: z.string().min(5, "Meeting point detail is required"),
  availableDays: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false)
});

export type CreateExcursionInput = z.infer<typeof CreateExcursionSchema>;
