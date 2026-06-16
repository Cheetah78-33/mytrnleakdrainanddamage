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
    console.log("SERVER FN START");

    const env = context?.env as {
      TELEGRAM_BOT_TOKEN?: string;
      TELEGRAM_CHAT_ID?: string;
    };

    console.log("ENV CHECK", {
      hasToken: !!env?.TELEGRAM_BOT_TOKEN,
      chatId: env?.TELEGRAM_CHAT_ID,
    });

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

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env?.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: env?.TELEGRAM_CHAT_ID,
            text,
          }),
        }
      );

      const telegramText = await telegramResponse.text();

      console.log("TELEGRAM STATUS", telegramResponse.status);
      console.log("TELEGRAM RESPONSE", telegramText);
    } catch (err) {
      console.error("TELEGRAM ERROR", err);
    }

    try {
      const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
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

      const formspreeText = await formspreeResponse.text();

      console.log("FORMSPREE STATUS", formspreeResponse.status);
      console.log("FORMSPREE RESPONSE", formspreeText);
    } catch (err) {
      console.error("FORMSPREE ERROR", err);
    }

    return {
      success: true,
    };
  });
