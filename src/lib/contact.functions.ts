import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Schema
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  property: z.string().min(1),
  issue: z.string().min(1),
  message: z.string().optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

/**
 * Server Function
 */
export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async (data) => {
    // ENV VARS MUST BE INSIDE HANDLER (Cloudflare-safe)
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing Telegram environment variables");
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
    );

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
    });

    const results = await Promise.allSettled([
      telegramPromise,
      formspreePromise,
    ]);

    console.log("Contact form results:", results);

    return { success: true };
  });
