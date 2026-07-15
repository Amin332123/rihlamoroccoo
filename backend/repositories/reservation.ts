import { prisma } from "../lib/prisma";
import { ReservationStatus } from "@prisma/client";

export class ReservationRepository {
  static async create(data: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    excursionId: string;
    reservationDate: Date;
    numberOfGuests: number;
    hotel: string;
    pickupLocation?: string;
    specialRequests?: string;
  }) {
    return prisma.reservation.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        excursionId: data.excursionId,
        reservationDate: data.reservationDate,
        numberOfGuests: data.numberOfGuests,
        hotel: data.hotel,
        pickupLocation: data.pickupLocation,
        specialRequests: data.specialRequests,
        status: "PENDING"
      },
      include: {
        excursion: true
      }
    });
  }

  static async findAll() {
    return prisma.reservation.findMany({
      include: {
        excursion: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async findById(id: string) {
    return prisma.reservation.findUnique({
      where: { id },
      include: {
        excursion: true
      }
    });
  }

  static async updateStatus(id: string, status: ReservationStatus) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
      include: {
        excursion: true
      }
    });
  }

  static async delete(id: string) {
    return prisma.reservation.delete({
      where: { id }
    });
  }
}
