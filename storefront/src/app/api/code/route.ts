import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); // Parse the JSON body
  const { code } = body; // Extract the code from the request
  const validCode = "A89F67"; // Replace this with your actual secret code

  if (code === validCode) {
    // Set a cookie to indicate access is granted
    const response = NextResponse.json({ message: "Code valid" });
    response.cookies.set("_medusa_invitation_code", "true", {
      path: "/",
      httpOnly: true,
      maxAge: 86400, // 1 day in seconds
    });
    return response;
  } else {
    return NextResponse.json({ message: "Invalid code" }, { status: 400 });
  }
}
