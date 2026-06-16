import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(20),
  property: z.string().trim().min(1).max(100),
  issue: z.string().trim().min(1).max(100),
  message: z.string().trim().max(1000).optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data, context }) => {
    console.log("🔥 CONTACT FUNCTION HIT");

    // Cloudflare Worker env (THIS is correct for your setup)
    const env = (context as any)?.env || {};

    const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;

    console.log("ENV CHECK:", {
      hasToken: !!TELEGRAM_BOT_TOKEN,
      hasChatId: !!TELEGRAM_CHAT_ID,
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing Telegram env vars");
    }

    const text = `
🚨 NEW CONTACT FORM

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property: ${data.property}
Issue: ${data.issue}
Message: ${data.message || "No message"}
`;

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

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(console.error);

    return { success: true };
  });
