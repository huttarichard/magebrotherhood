import { NextMiddleware, NextRequest, NextResponse } from "next/server";

const auth: NextMiddleware = (req: NextRequest) => {
  if (req.url.includes("/api/tokens") || req.url.includes("/models")) {
    return NextResponse.next();
  }
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, pwd] = Buffer.from(auth, "base64").toString().split(":");

    if (user === "admin" && pwd === "hello") {
      return NextResponse.next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
};

export default auth;
