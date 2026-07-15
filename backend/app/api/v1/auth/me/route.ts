import { NextResponse } from "next/server";
import { JwtUtility } from "@/utils/auth";
import { handleCors, handlePreflight } from "@/middlewares/cors";

export async function OPTIONS() {
  return handlePreflight();
}

export async function GET(request: Request) {
  const payload = JwtUtility.getPayloadFromHeaders(request.headers);
  
  if (!payload) {
    return handleCors(
      NextResponse.json(
        { success: false, error: "Unauthorized session" },
        { status: 401 }
      )
    );
  }

  const response = NextResponse.json({
    success: true,
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    }
  });

  return handleCors(response);
}
