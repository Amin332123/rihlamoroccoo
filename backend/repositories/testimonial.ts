import { prisma } from "../lib/prisma";

export class TestimonialRepository {
  static async findAll(onlyFeatured = false) {
    return prisma.testimonial.findMany({
      where: onlyFeatured ? { featured: true } : {},
      orderBy: { createdAt: "desc" }
    });
  }

  static async create(data: {
    fullName: string;
    country: string;
    rating: number;
    comment: string;
    avatar?: string;
    featured?: boolean;
  }) {
    return prisma.testimonial.create({
      data
    });
  }

  static async update(id: string, data: {
    fullName?: string;
    country?: string;
    rating?: number;
    comment?: string;
    avatar?: string;
    featured?: boolean;
  }) {
    return prisma.testimonial.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.testimonial.delete({
      where: { id }
    });
  }
}
