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

function buildQuoteEmailHtml(data: QuoteEmailPayload, intendedRecipient: string) {
  return `
    <h2>New quote request from ${SITE.name}</h2>
    ${intendedRecipient !== SITE.email ? `<p><em>Intended recipient: ${intendedRecipient}</em></p>` : ""}
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
    <p><strong>Address:</strong> ${data.address ?? "Not provided"}</p>
    <p><strong>Service:</strong> ${data.serviceType}</p>
    <p><strong>Details:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export async function sendQuoteNotification(
  data: QuoteEmailPayload
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — quote saved but email not sent.");
    return { sent: false, error: "RESEND_API_KEY not set" };
  }

  const intendedRecipient =
    process.env.QUOTE_NOTIFICATION_EMAIL ?? SITE.email;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Rios Landscaping <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const subject = `New Quote Request — ${data.fullName}`;

  const { data: result, error } = await resend.emails.send({
    from,
    to: [intendedRecipient],
    replyTo: data.email,
    subject,
    html: buildQuoteEmailHtml(data, intendedRecipient),
  });

  if (!error && result?.id) {
    return { sent: true };
  }

  const errorMessage = error?.message ?? "Unknown Resend error";
  console.error("Quote email error:", errorMessage);

  // Resend test sender only delivers to the account owner's email until a domain is verified.
  const fallbackTo = process.env.RESEND_FALLBACK_EMAIL;
  const needsDomain =
    errorMessage.includes("verify a domain") ||
    errorMessage.includes("your own email address");

  if (fallbackTo && needsDomain && fallbackTo !== intendedRecipient) {
    const { data: fallbackResult, error: fallbackError } = await resend.emails.send({
      from,
      to: [fallbackTo],
      replyTo: data.email,
      subject: `[Quote for ${intendedRecipient}] ${subject}`,
      html: buildQuoteEmailHtml(data, intendedRecipient),
    });

    if (!fallbackError && fallbackResult?.id) {
      console.warn(
        `Quote email sent to fallback ${fallbackTo}. Verify a domain in Resend to email ${intendedRecipient} directly.`
      );
      return { sent: true };
    }

    console.error("Quote fallback email error:", fallbackError?.message);
  }

  return { sent: false, error: errorMessage };
}
