import { EmailTemplate } from "@lib/common/components/email-template";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_a7XPPRx9_GfJcGKeDmS2RWqrdNmA5iynZ");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to or subject" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "LifeLong Club <onboarding@resend.dev>",
      to: [to],
      subject,
      react: EmailTemplate(),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
