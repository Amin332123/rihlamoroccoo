import dotenv from "dotenv";

dotenv.config();



if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required for application startup! . ");
}

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001", 10),
  appName: "Rihla Morocco API",
  apiVersion: "v1",
  db: {
    url: process.env.DATABASE_URL
  },
  email: {
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: parseInt(process.env.SMTP_PORT || "2525", 10),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "no-reply@rihlamorocco.com",
    enabled: process.env.SMTP_ENABLED === "true"
  },
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL || "https://api.whatsapp.com/send",
    agentPhone: process.env.WHATSAPP_AGENT_PHONE || "+212679675893"
  },
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000"
  }
};
