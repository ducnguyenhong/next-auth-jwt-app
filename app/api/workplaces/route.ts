import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentToken = cookies().get("token")?.value;

  const body = await req.json();
  const { partner_id } = body;

  if (!partner_id) {
    return NextResponse.json(
      { error: "partner_id is required" },
      { status: 400 }
    );
  }

  const resp = await fetch(`${process.env.NEXT_API_DOMAIN}/auth/working`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
    body: JSON.stringify({ partner_id }),
  });

  if (!resp.ok) {
    return NextResponse.json(
      { error: await resp.text() },
      { status: resp.status }
    );
  }

  const respData = await resp.json();

  console.log(25, respData);
  const { token, user } = respData;

  const response = NextResponse.json({ token, user }, { status: 200 });

  // Then set a cookie
  response.cookies.set({
    name: "token",
    value: token.jwt,
    httpOnly: true,
    expires: new Date(token.exp),
  });

  return response;
}
