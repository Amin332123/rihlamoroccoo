import { NextResponse } from "next/server";
import { ReservationController } from "@/controllers/reservation";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ReservationController.updateStatus(request, id);
  return handleCors(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ReservationController.delete(id);
  return handleCors(response);
}
