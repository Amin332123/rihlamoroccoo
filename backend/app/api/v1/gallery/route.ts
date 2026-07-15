import { NextResponse } from "next/server";
import { GalleryController } from "@/controllers/gallery";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET() {
  const response = await GalleryController.getAll();
  return handleCors(response);
}

export async function POST(request: Request) {
  const response = await GalleryController.create(request);
  return handleCors(response);
}
