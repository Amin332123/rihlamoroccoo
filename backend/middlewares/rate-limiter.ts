import { NextResponse } from "next/server";
import { Logger } from "../utils/logger";

// Simple API rate limiter placeholder mapping IPs to hit counts
const hitsMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 100; // Limit per reset interval
const INTERVAL = 60 * 1000; // 1 minute in milliseconds

export async function rateLimitMiddleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();
  
  const record = hitsMap.get(ip);

  if (!record) {
    hitsMap.set(ip, { count: 1, resetTime: now + INTERVAL });
    return null;
  }

  if (now > record.resetTime) {
    hitsMap.set(ip, { count: 1, resetTime: now + INTERVAL });
    return null;
  }

  record.count += 1;

  if (record.count > LIMIT) {
    Logger.warn(`Rate limit exceeded for IP: ${ip}`, "RateLimiter");
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests",
        message: "You have exceeded the request limit. Please try again in a minute."
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((record.resetTime - now) / 1000).toString()
        }
      }
    );
  }

  return null;
}
