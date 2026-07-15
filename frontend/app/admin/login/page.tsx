"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { ApiClient } from "@/lib/api";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    // Zod validation fallback client side
    if (!email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    const res = await ApiClient.post("/auth", { email, password });

    setIsSubmitting(false);
    if (res.success && res.data) {
      const token = res.data.token;
      
      // Set session cookie (expires in 7 days by default, or session-only if not remembered)
      const cookieOptions = rememberMe ? { expires: 7 } : {};
      Cookies.set("rihla_admin_session", token, cookieOptions);

      // Save user details in cookies or local storage for display
      Cookies.set("rihla_admin_user", JSON.stringify(res.data.user), cookieOptions);

      // Force page refresh to admin home
      window.location.href = "/admin";
    } else {
      setErrorMsg(res.error || "Authentication failed. Please verify credentials.");
    }
  };

  return (
    <div className="w-full max-w-md mx-6">
      
      {/* Visual Identity Logo */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex p-1 bg-white border border-sand/20 rounded-2xl shadow-md">
          <img 
            src="/logo.png" 
            alt="Rihla Morocco Logo" 
            className="object-contain" 
            style={{ width: "120px", height: "120px", minWidth: "120px", minHeight: "120px" }}
          />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-wide text-primary-green">
            RIHLA MOROCCO
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-light-txt font-bold">
            Administrative Access Portal
          </p>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-sand/20 rounded-[24px] p-8 shadow-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h3 className="font-serif text-lg font-bold text-primary-green">
            Marhaban Aulad
          </h3>
          <p className="text-xs text-light-txt font-light">
            Enter admin credentials to manage private excursions and reservations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@rihlamorocco.com"
                suppressHydrationWarning
                className="w-full pl-11 pr-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-txt" />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                Password
              </label>
              <button
                type="button"
                className="text-[9px] uppercase tracking-widest text-desert-brown font-bold hover:underline focus:outline-none"
                onClick={() => alert("Contact system administrator to reset password.")}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                suppressHydrationWarning
                className="w-full pl-11 pr-11 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-txt" />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-light-txt hover:text-dark-txt focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-sand/30 accent-primary-green cursor-pointer"
            />
            <label htmlFor="remember" className="text-[10px] uppercase font-bold tracking-wider text-light-txt cursor-pointer">
              Remember my session
            </label>
          </div>

          {errorMsg && (
            <div className="flex gap-2 items-center p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-primary-green outline-none disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? "Authenticating..." : "Login Portal"}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
