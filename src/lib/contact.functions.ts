import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Valid email required").max(254),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  property: z.string().trim().min(1, "Select one").max(100),
  issue: z.string().trim().min(1, "Select one").max(100),
  message: z.string().trim().max(1000).optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data, context }) => {
    // ✅ Cloudflare/TanStack Start runtime env
    const env = context?.env as {
      TELEGRAM_BOT_TOKEN?: string;
      TELEGRAM_CHAT_ID?: string;
    };

    const TELEGRAM_BOT_TOKEN = env?.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env?.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram env vars:", env);
      throw new Error("Server misconfigured: missing Telegram env vars");
    }

    const cleanMessage = data.message?.trim() || "No message provided.";

    const text = [
      "🚨 MYTRN Contact Form",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Property: ${data.property}`,
      `Issue: ${data.issue}`,
      `Message: ${cleanMessage}`,
    ].join("\n");

    // 1. Telegram
    const telegramPromise = fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    ).catch((e) => console.error("Telegram error:", e));

    // 2. Formspree fallback
    const formspreePromise = fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        property: data.property,
        issue: data.issue,
        message: cleanMessage,
      }),
    }).catch((e) => console.error("Formspree error:", e));

    await Promise.allSettled([telegramPromise, formspreePromise]);

    return { success: true };
  });
