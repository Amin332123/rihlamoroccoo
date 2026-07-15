import { prisma } from "../lib/prisma";

export class ContactRepository {
  static async create(data: { fullName: string; email: string; subject: string; message: string }) {
    return prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
        isRead: false
      }
    });
  }

  static async findAll() {
    return prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static async markAsRead(id: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
  }

  static async delete(id: string) {
    return prisma.contactMessage.delete({
      where: { id }
    });
  }
}
