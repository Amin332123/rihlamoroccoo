import { ReservationRepository } from "../repositories/reservation";
import { EmailService } from "./email";
import { Logger } from "../utils/logger";
import { ReservationStatus } from "@prisma/client";

export class ReservationService {
  static async createReservation(data: {
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
    Logger.info(`Creating seat reservation for: ${data.fullName}`, "ReservationService");
    
    const reservation = await ReservationRepository.create(data);

    // Trigger asynchronous confirmation email
    EmailService.sendReservationConfirmation(reservation.email, {
      name: reservation.fullName,
      excursion: reservation.excursion.title,
      date: reservation.reservationDate.toISOString().split("T")[0],
      guests: reservation.numberOfGuests
    }).catch((err) => {
      Logger.error("Failed to trigger email confirmation in background", err, "ReservationService");
    });

    return reservation;
  }

  static async getAllReservations() {
    Logger.info("Fetching all reservations", "ReservationService");
    return ReservationRepository.findAll();
  }

  static async updateStatus(id: string, status: ReservationStatus) {
    Logger.info(`Updating status of reservation ${id} to ${status}`, "ReservationService");
    return ReservationRepository.updateStatus(id, status);
  }

  static async deleteReservation(id: string) {
    Logger.info(`Deleting reservation ${id}`, "ReservationService");
    return ReservationRepository.delete(id);
  }
}
