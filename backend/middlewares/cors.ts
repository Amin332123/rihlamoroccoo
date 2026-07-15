import { NextResponse } from "next/server";
import { config } from "../config";

export function handleCors(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", config.cors.origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight response for 1 day
  return response;
}

export function handlePreflight(): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return handleCors(response);
}
