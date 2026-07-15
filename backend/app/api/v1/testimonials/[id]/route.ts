import { NextResponse } from "next/server";
import { TestimonialController } from "@/controllers/testimonial";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await TestimonialController.update(request, id);
  return handleCors(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await TestimonialController.delete(id);
  return handleCors(response);
}
