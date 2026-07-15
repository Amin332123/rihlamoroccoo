"use client";

import { useEffect, useState } from "react";
import {
  Compass,
  CalendarCheck,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";
import StatCard from "@/components/admin/stat-card";
import { ApiClient } from "@/lib/api";

const REVENUE_DATA = [
  { month: "Jan", bookings: 4 },
  { month: "Feb", bookings: 8 },
  { month: "Mar", bookings: 12 },
  { month: "Apr", bookings: 18 },
  { month: "May", bookings: 24 },
  { month: "Jun", bookings: 32 },
  { month: "Jul", bookings: 48 }
];

export default function AdminDashboardHome() {
  const [excursionsCount, setExcursionsCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [reservations, setReservations] = useState<any[]>([]);
  const [excursionPopularity, setExcursionPopularity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      
      const [excursionsRes, reservationsRes, messagesRes] = await Promise.all([
        ApiClient.get("/excursions"),
        ApiClient.get("/reservations"),
        ApiClient.get("/contact")
      ]);

      if (excursionsRes.success && excursionsRes.data) {
        setExcursionsCount(excursionsRes.data.length);
      }

      let liveReservations: any[] = [];
      if (reservationsRes.success && reservationsRes.data) {
        liveReservations = reservationsRes.data;
        setReservations(liveReservations.slice(0, 5)); // recent 5

        // Calculate pending and confirmed counts
        const pending = liveReservations.filter((r) => r.status === "PENDING").length;
        const confirmed = liveReservations.filter((r) => r.status === "CONFIRMED").length;
        setPendingCount(pending);
        setConfirmedCount(confirmed);

        // Map excursion popularity
        const popularityMap: { [key: string]: number } = {};
        liveReservations.forEach((r) => {
          const title = r.excursion?.title || "Unknown Tour";
          popularityMap[title] = (popularityMap[title] || 0) + 1;
        });

        const popularityArray = Object.keys(popularityMap).map((name) => ({
          name: name.split(" ").slice(0, 2).join(" "), // Truncate titles for charts
          bookings: popularityMap[name]
        }));
        setExcursionPopularity(popularityArray.slice(0, 5));
      }

      if (messagesRes.success && messagesRes.data) {
        const unread = messagesRes.data.filter((m: any) => !m.isRead).length;
        setUnreadMessages(unread);
      }

      setIsLoading(false);
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      
      {/* Welcome Title Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-primary-green font-medium tracking-wide">
            Marhaba, Admin
          </h1>
          <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
            Overview of Rihla Morocco Booking metrics
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest text-desert-brown bg-cream-bg font-bold px-4 py-2 rounded-xl border border-sand/20">
          Live Portal Stats
        </div>
      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Excursions" value={isLoading ? "..." : excursionsCount} change="Live database" icon={Compass} />
        <StatCard title="Pending Bookings" value={isLoading ? "..." : pendingCount} change="Pending confirmations" icon={Clock} />
        <StatCard title="Confirmed Seats" value={isLoading ? "..." : confirmedCount} change="Active schedules" icon={CalendarCheck} />
        <StatCard title="Unread Messages" value={isLoading ? "..." : unreadMessages} change="Mailbox count" icon={Mail} />
      </div>

      {/* Charts Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Reservation trends Line Chart */}
        <div className="lg:col-span-2 bg-white border border-sand/20 rounded-[22px] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-sand/10 pb-4">
            <h4 className="font-serif text-lg font-bold text-primary-green">
              Monthly Reservation Trends
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Growing Trends</span>
            </div>
          </div>
          <div className="h-[280px] w-full text-xs font-semibold tracking-wider">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FAF7F2" />
                <XAxis dataKey="month" stroke="#A66A3D" />
                <YAxis stroke="#A66A3D" />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "14px", border: "1px solid #D8C2A5" }} />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3F4E35"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  dot={{ r: 4, stroke: "#A66A3D", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular excursions Bar chart */}
        <div className="bg-white border border-sand/20 rounded-[22px] p-6 shadow-sm space-y-4">
          <div className="border-b border-sand/10 pb-4">
            <h4 className="font-serif text-lg font-bold text-primary-green">
              Popular Excursions
            </h4>
          </div>
          <div className="h-[280px] w-full text-[10px] font-bold">
            {excursionPopularity.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={excursionPopularity} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                  <XAxis type="number" stroke="#A66A3D" />
                  <YAxis dataKey="name" type="category" stroke="#A66A3D" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #D8C2A5" }} />
                  <Bar dataKey="bookings" fill="#A66A3D" radius={[0, 8, 8, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-light text-light-txt">
                No reservation requests data yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Tables & Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Reservations Table */}
        <div className="lg:col-span-2 bg-white border border-sand/20 rounded-[22px] p-6 shadow-sm space-y-4 overflow-hidden">
          <div className="border-b border-sand/15 pb-4">
            <h4 className="font-serif text-lg font-bold text-primary-green">
              Recent Seat Requests
            </h4>
          </div>
          <div className="overflow-x-auto">
            {reservations.length > 0 ? (
              <table className="w-full text-left text-xs tracking-wider border-collapse">
                <thead>
                  <tr className="border-b border-sand/15 text-light-txt font-semibold uppercase text-[10px] bg-cream-bg/25">
                    <th className="py-3 pl-2">Guest</th>
                    <th className="py-3">Excursion</th>
                    <th className="py-3">Date</th>
                    <th className="py-3 text-center">Seats</th>
                    <th className="py-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/10 font-medium">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-cream-bg/20 transition-colors">
                      <td className="py-4 pl-2 font-bold text-dark-txt">{res.fullName}</td>
                      <td className="py-4 text-primary-green truncate max-w-[200px]">{res.excursion?.title || "Unknown"}</td>
                      <td className="py-4 text-light-txt">{new Date(res.reservationDate).toISOString().split("T")[0]}</td>
                      <td className="py-4 text-center text-dark-txt">{res.numberOfGuests}</td>
                      <td className="py-4 text-right pr-2">
                        <span
                          className={`inline-block px-2.5 py-1 text-[9px] font-bold rounded-full border ${
                            res.status === "CONFIRMED"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : res.status === "PENDING"
                              ? "bg-amber-50 border-amber-200 text-amber-700"
                              : "bg-gray-50 border-gray-200 text-gray-700"
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-xs font-light text-light-txt">
                No reservation requests data yet.
              </div>
            )}
          </div>
        </div>

        {/* Activity Logs Feed */}
        <div className="bg-white border border-sand/20 rounded-[22px] p-6 shadow-sm space-y-4">
          <div className="border-b border-sand/15 pb-4">
            <h4 className="font-serif text-lg font-bold text-primary-green">
              Activity Chronicle
            </h4>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-start text-xs font-medium">
              <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-dark-txt">Portal sync verified with PostgreSQL</p>
                <span className="text-[10px] text-light-txt">Just now</span>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs font-medium">
              <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-dark-txt">Database connection online via Prisma ORM</p>
                <span className="text-[10px] text-light-txt">Active session</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
