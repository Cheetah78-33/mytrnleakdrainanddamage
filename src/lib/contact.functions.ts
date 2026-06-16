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
    // ✅ Cloudflare env (THIS is the correct way in your setup)
    const env = context?.env as any;

    const TELEGRAM_BOT_TOKEN = env?.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env?.TELEGRAM_CHAT_ID;

    // 🔥 FORCE LOG (this is important for debugging in 2 min)
    console.log("ENV CHECK:", {
      hasToken: !!TELEGRAM_BOT_TOKEN,
      hasChat: !!TELEGRAM_CHAT_ID,
    });

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing Telegram env vars in Cloudflare Worker");
    }

    const cleanMessage = (data.message || "").trim() || "No message provided.";

    const text =
      `🚨 MYTRN Contact Form\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Property: ${data.property}\n` +
      `Issue: ${data.issue}\n` +
      `Message: ${cleanMessage}`;

    // 🔥 Telegram (WAIT for response so errors show)
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

    const telegramData = await telegramRes.text();
    console.log("TELEGRAM RESPONSE:", telegramData);

    // Formspree (non-blocking fail-safe)
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
