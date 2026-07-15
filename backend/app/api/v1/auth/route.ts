import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/validation/auth";
import { JwtUtility } from "@/utils/auth";
import { handleCors, handlePreflight } from "@/middlewares/cors";
import { handleRouteError } from "@/middlewares/error";
import { rateLimitMiddleware } from "@/middlewares/rate-limiter";

export async function OPTIONS() {
  return handlePreflight();
}

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const rateLimitResponse = await rateLimitMiddleware(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const validatedInput = LoginSchema.parse(body);

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: validatedInput.email }
    });

    if (!admin) {
      return handleCors(
        NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        )
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(validatedInput.password, admin.password);
    if (!isPasswordValid) {
      return handleCors(
        NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        )
      );
    }

    // Sign JWT token
    const token = JwtUtility.signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      data: {
        token,
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });

    return handleCors(response);
  } catch (error) {
    return handleCors(handleRouteError(error));
  }
}
