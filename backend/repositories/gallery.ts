import { prisma } from "../lib/prisma";

export class GalleryRepository {
  static async findAll() {
    return prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static async create(data: { title: string; category: string; image: string; featured?: boolean }) {
    return prisma.galleryImage.create({
      data
    });
  }

  static async update(id: string, data: { title?: string; category?: string; image?: string; featured?: boolean }) {
    return prisma.galleryImage.update({
      where: { id },
      data
    });
  }

  static async delete(id: string) {
    return prisma.galleryImage.delete({
      where: { id }
    });
  }
}
