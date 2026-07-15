import { prisma } from "../lib/prisma";

export class ExcursionRepository {
  static async findAll(onlyPublished = true) {
    return prisma.excursion.findMany({
      where: onlyPublished ? { published: true } : {},
      orderBy: { createdAt: "desc" }
    });
  }

  static async findBySlug(slug: string) {
    return prisma.excursion.findFirst({
      where: { slug }
    });
  }

  static async findById(id: string) {
    return prisma.excursion.findUnique({
      where: { id }
    });
  }

  static async create(data: any) {
    return prisma.excursion.create({
      data
    });
  }

  static async update(id: string, data: any) {
    return prisma.excursion.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.excursion.delete({
      where: { id }
    });
  }
}
