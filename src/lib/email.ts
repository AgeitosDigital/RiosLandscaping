import { Resend } from "resend";
import { SITE } from "@/lib/constants";

type QuoteEmailPayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string | null;
  serviceType: string;
  message: string;
};

export async function sendQuoteNotification(
  data: QuoteEmailPayload
): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — quote saved but email not sent.");
    return { sent: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Rios Landscaping <onboarding@resend.dev>",
    to: SITE.email,
    replyTo: data.email,
    subject: `New Quote Request — ${data.fullName}`,
    html: `
      <h2>New quote request from ${SITE.name}</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      <p><strong>Address:</strong> ${data.address ?? "Not provided"}</p>
      <p><strong>Service:</strong> ${data.serviceType}</p>
      <p><strong>Details:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Quote email error:", error.message);
    return { sent: false };
  }

  return { sent: true };
}
