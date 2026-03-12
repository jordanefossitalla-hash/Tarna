import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface TokenValidationResponse {
  valid: boolean;
  expired: boolean;
  decoded?: {
    sub: string;
    username: string;
    role: string;
    type: "access" | "refresh";
    iat: number;
    exp: number;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse<TokenValidationResponse>> {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ valid: false, expired: false }, { status: 400 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("[validate-token] JWT_SECRET is not defined");
      return NextResponse.json({ valid: false, expired: false }, { status: 500 });
    }

    // Verify signature while ignoring expiration, so we always get the payload
    const decoded = jwt.verify(token, secret, { ignoreExpiration: true }) as jwt.JwtPayload;

    const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;

    return NextResponse.json({
      valid: !isExpired,
      expired: isExpired,
      decoded: {
        sub: decoded.sub as string,
        username: decoded.username as string,
        role: decoded.role as string,
        type: decoded.type as "access" | "refresh",
        iat: decoded.iat as number,
        exp: decoded.exp as number,
      },
    });
  } catch {
    // Signature invalid, malformed token, etc.
    return NextResponse.json({ valid: false, expired: false });
  }
}
