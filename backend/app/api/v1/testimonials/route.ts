import { NextResponse } from "next/server";
import { TestimonialController } from "@/controllers/testimonial";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(request: Request) {
  const response = await TestimonialController.getAll(request);
  return handleCors(response);
}

export async function POST(request: Request) {
  const response = await TestimonialController.create(request);
  return handleCors(response);
}
