import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  property: z.string().min(1).max(100),
  issue: z.string().min(1).max(100),
  message: z.string().max(1000).optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
  .handler(async ({ data, context }) => {
    console.log("🔥 SERVER FN HIT");

    const env = (context as any)?.env;

    console.log("ENV RAW:", env);

    const token = env?.TELEGRAM_BOT_TOKEN;
    const chatId = env?.TELEGRAM_CHAT_ID;

    console.log("ENV PARSED:", {
      token: token ? "YES" : "NO",
      chatId: chatId ? "YES" : "NO",
    });

    if (!token || !chatId) {
      throw new Error("Missing TELEGRAM env vars in Cloudflare");
    }

    const text = `
🚨 MYTRN Contact Form

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property: ${data.property}
Issue: ${data.issue}
Message: ${data.message || "No message"}
`;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    const telegramJson = await telegramRes.json();

    console.log("TELEGRAM RESULT:", telegramJson);

    return { success: true };
  });
