"use server";

import { createClient } from "@/lib/supabase/server";
import { sendQuoteNotification } from "@/lib/email";
import { revalidatePath } from "next/cache";

export type QuoteFormState = {
  success: boolean;
  message: string;
};

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const address = (formData.get("address") as string)?.trim() || null;
  const serviceType = (formData.get("serviceType") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!fullName || !email || !phone || !serviceType || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey === "your_supabase_anon_key_here") {
    return {
      success: false,
      message:
        "Quote form is not configured yet. Please call us directly or try again later.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("quote_requests").insert({
      full_name: fullName,
      email,
      phone,
      address,
      service_type: serviceType,
      message,
    });

    if (error) {
      console.error("Quote submission error:", error.message);
      return {
        success: false,
        message: "Something went wrong. Please try again or call us directly.",
      };
    }

    await sendQuoteNotification({
      fullName,
      email,
      phone,
      address,
      serviceType,
      message,
    });

    revalidatePath("/");
    return {
      success: true,
      message:
        "Thank you! We received your request and will contact you within 1 business day.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or call us directly.",
    };
  }
}
