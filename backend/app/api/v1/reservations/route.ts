import { NextResponse } from "next/server";
import { ReservationController } from "@/controllers/reservation";
import { handleCors, handlePreflight } from "@/middlewares/cors";
import { rateLimitMiddleware } from "@/middlewares/rate-limiter";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET() {
  const response = await ReservationController.getAll();
  return handleCors(response);
}

export async function POST(request: Request) {
  // Rate limiting check
  const rateLimitResponse = await rateLimitMiddleware(request);
  if (rateLimitResponse) return rateLimitResponse;

  const response = await ReservationController.create(request);
  return handleCors(response);
}
