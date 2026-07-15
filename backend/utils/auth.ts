import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rihlamorocco_super_secure_secret_key_123!";

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export class JwtUtility {
  static signToken(payload: TokenPayload, expiresIn: string = "7d"): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
  }

  static verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      return null;
    }
  }

  static getPayloadFromHeaders(headers: Headers): TokenPayload | null {
    const authHeader = headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.split(" ")[1];
    return this.verifyToken(token);
  }
}
