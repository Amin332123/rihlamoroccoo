import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Admin dashboard data placeholder",
    stats: {
      totalReservations: 124,
      pendingReservations: 12,
      confirmedReservations: 104,
      popularExcursion: "Sahara Desert Luxury Expedition"
    }
  });
}
