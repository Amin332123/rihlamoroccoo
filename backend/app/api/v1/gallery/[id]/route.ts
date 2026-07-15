import { NextResponse } from "next/server";
import { GalleryController } from "@/controllers/gallery";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await GalleryController.update(request, id);
  return handleCors(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await GalleryController.delete(id);
  return handleCors(response);
}
