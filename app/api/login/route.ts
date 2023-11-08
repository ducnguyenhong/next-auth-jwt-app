import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const resp = await fetch(`${process.env.NEXT_API_DOMAIN}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (resp.status < 200 || resp.status >= 400) {
      const txt = await resp.text().catch((e) => "Unauthorized");
      throw new Error(txt);
    }

    const respBody = await resp.json();
    const { token, user } = respBody;

    const response = NextResponse.json({ token, user }, { status: 200 });

    // Then set a cookie
    response.cookies.set({
      name: "token",
      value: token.jwt,
      httpOnly: true,
      expires: new Date(token.exp),
    });

    return response;
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
