import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Logger } from "../utils/logger";

export function handleRouteError(error: any) {
  Logger.error("Backend API Error", error, "RouteErrorHandler");

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message
        }))
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    },
    { status: 500 }
  );
}
