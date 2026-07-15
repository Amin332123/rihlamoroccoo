import { NextResponse } from "next/server";
import { CreateReservationSchema } from "../validation/reservation";
import { ReservationService } from "../services/reservation";
import { handleRouteError } from "../middlewares/error";
import { ReservationStatus } from "@prisma/client";

export class ReservationController {
  static async create(request: Request) {
    try {
      const body = await request.json();
      const validatedInput = CreateReservationSchema.parse(body);

      const reservation = await ReservationService.createReservation(validatedInput);

      return NextResponse.json(
        {
          success: true,
          message: "Reservation request received successfully",
          data: reservation
        },
        { status: 201 }
      );
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async getAll() {
    try {
      const reservations = await ReservationService.getAllReservations();
      return NextResponse.json({
        success: true,
        data: reservations
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async updateStatus(request: Request, id: string) {
    try {
      const body = await request.json();
      const status = body.status as ReservationStatus;
      
      if (!["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status value" },
          { status: 400 }
        );
      }

      const reservation = await ReservationService.updateStatus(id, status);
      return NextResponse.json({
        success: true,
        message: `Reservation status updated to ${status}`,
        data: reservation
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async delete(id: string) {
    try {
      await ReservationService.deleteReservation(id);
      return NextResponse.json({
        success: true,
        message: "Reservation deleted successfully"
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }
}
