import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Valid email required").max(254),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  property: z.string().trim().min(1, "Select one").max(100),
  issue: z.string().trim().min(1, "Select one").max(100),
  message: z.string().trim().optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data, context }) => {
    // 🔥 DEBUG: show everything we receive from Cloudflare
    const env = (context as any)?.env;

    console.log("RAW ENV OBJECT:", env);

    const TELEGRAM_BOT_TOKEN = env?.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env?.TELEGRAM_CHAT_ID;

    console.log("TOKEN EXISTS:", !!TELEGRAM_BOT_TOKEN);
    console.log("CHAT EXISTS:", !!TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("MISSING ENV VARS");
      throw new Error("Missing Telegram environment variables");
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
    `;

    // Send to Telegram
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

    console.log("TELEGRAM RESPONSE:", telegramData);

    // Send to Formspree (non-blocking)
    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(console.error);

    return { success: true };
  });
