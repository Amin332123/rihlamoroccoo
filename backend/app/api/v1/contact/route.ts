import { NextResponse } from "next/server";
import { ContactController } from "@/controllers/contact";
import { handleCors, handlePreflight } from "@/middlewares/cors";
import { rateLimitMiddleware } from "@/middlewares/rate-limiter";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET() {
  const response = await ContactController.getAll();
  return handleCors(response);
}

export async function POST(request: Request) {
  // Rate limiting check
  const rateLimitResponse = await rateLimitMiddleware(request);
  if (rateLimitResponse) return rateLimitResponse;

  const response = await ContactController.submit(request);
  return handleCors(response);
}
