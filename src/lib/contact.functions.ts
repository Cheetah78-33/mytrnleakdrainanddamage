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
    // ✅ Cloudflare Workers env (correct way for your setup)
    const env = (context as any)?.env ?? {};

    console.log("🔥 CONTACT FUNCTION HIT");

    console.log("ENV CHECK:", {
      hasToken: !!env.TELEGRAM_BOT_TOKEN,
      hasChatId: !!env.TELEGRAM_CHAT_ID,
    });

    const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("❌ Missing env vars");
      return {
        success: false,
        error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID",
      };
    }

    const cleanMessage = data.message?.trim() || "No message provided.";

    const text =
      `🚨 NEW CONTACT FORM\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Property: ${data.property}\n` +
      `Issue: ${data.issue}\n` +
      `Message: ${cleanMessage}`;

    // 🚀 TELEGRAM REQUEST (now fully visible + debuggable)
    let telegramResponseJson: any = null;
    let telegramStatus: number | null = null;

    try {
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

      telegramStatus = telegramRes.status;
      telegramResponseJson = await telegramRes.json();

      console.log("📨 TELEGRAM STATUS:", telegramStatus);
      console.log("📨 TELEGRAM RESPONSE:", telegramResponseJson);
    } catch (err) {
      console.error("❌ TELEGRAM FETCH FAILED:", err);
    }

    // 📩 FORMPSREE (non-blocking)
    try {
      await fetch(FORMSPREE_ENDPOINT, {
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
    } catch (err) {
      console.error("❌ FORMSPREE ERROR:", err);
    }

    return {
      success: true,
      telegramStatus,
      telegramResponse: telegramResponseJson,
    };
  });
