import { NextResponse } from "next/server";
import { handleCors, handlePreflight } from "@/middlewares/cors";
import { prisma } from "@/lib/prisma";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET() {
  let dbStatus = "UP";
  try {
    // Basic Prisma query check
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = "DOWN";
  }

  const response = NextResponse.json({
    success: true,
    message: "Server is healthy",
    data: {
      status: "UP",
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });

  return handleCors(response);
}
