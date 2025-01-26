import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@lib/common/components/email-template";
import { Resend } from "resend";

const resend = new Resend("re_a7XPPRx9_GfJcGKeDmS2RWqrdNmA5iynZ");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { to, subject } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: "Missing required fields: to or subject" });
    }

    const { data, error } = await resend.emails.send({
      from: "LifeLong Club <onboarding@resend.dev>",
      to: [to],
      subject,
      react: EmailTemplate(),
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
