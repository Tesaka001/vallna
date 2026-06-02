import "server-only";

import { Resend } from "resend";

let resend: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!resend) {
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function sendReportEmail(params: {
  to: string;
  subject: string;
  preview: string;
  reportUrl: string;
  displayName?: string | null;
}): Promise<void> {
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Vallna <onboarding@resend.dev>";
  const greeting = params.displayName?.trim() || "there";

  const text = [
    `Hello ${greeting},`,
    "",
    "Your report is ready.",
    "",
    params.preview,
    "",
    `Read the full report: ${params.reportUrl}`,
    "",
    "— Vallna",
  ].join("\n");

  const client = getResendClient();
  const { error } = await client.emails.send({
    from,
    to: params.to,
    subject: params.subject,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
