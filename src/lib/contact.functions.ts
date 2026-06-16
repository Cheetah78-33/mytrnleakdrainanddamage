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
  .handler(async ({ data }) => {
    // ✅ Cloudflare Pages env (THIS is the fix)
    const TELEGRAM_BOT_TOKEN = globalThis.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = globalThis.TELEGRAM_CHAT_ID;

    console.log("ENV CHECK:", {
      token: !!TELEGRAM_BOT_TOKEN,
      chat: !!TELEGRAM_CHAT_ID,
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing Telegram env vars");
    }

    const cleanMessage = data.message?.trim() || "No message provided.";

    const text = `
🚨 NEW CONTACT FORM

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property: ${data.property}
Issue: ${data.issue}
Message: ${cleanMessage}
`.trim();

    // 🔥 Telegram send
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    const telegramData = await telegramRes.json();
    console.log("Telegram response:", telegramData);

    // 🔥 Formspree (non-blocking)
    fetch(FORMSPREE_ENDPOINT, {
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
    }).catch(console.error);

    return { success: true };
  });
