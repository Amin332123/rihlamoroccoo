import { NextResponse } from "next/server";
import { ContactController } from "@/controllers/contact";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ContactController.markRead(id);
  return handleCors(response);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const response = await ContactController.delete(id);
  return handleCors(response);
}
