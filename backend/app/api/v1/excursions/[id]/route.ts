import { NextResponse } from "next/server";
import { ExcursionController } from "@/controllers/excursion";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ExcursionController.getBySlug(id);
  return handleCors(response);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ExcursionController.update(request, id);
  return handleCors(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ExcursionController.delete(id);
  return handleCors(response);
}
