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

export type ContactFormInput = z.infer<typeof contactFormSchema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

const TELEGRAM_BOT_TOKEN =
  "8965540792:AAG7OtoruAzSe2h60ulGtZilbwDlnb0_LWA";

const TELEGRAM_CHAT_ID = "8622290052";

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => contactFormSchema.parse(input))
  .handler(async ({ data }) => {
    const cleanMessage = data.message?.trim() || "No message provided.";

    const telegramText = [
      "🚨 MYTRN Contact Form Submission",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramText,
        }),
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          console.error(
            "Telegram failed:",
            res.status,
            await res.text()
          );
        }
      })
      .catch((err) => {
        console.error("Telegram error:", err);
      });

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
        _subject: `MYTRN contact request from ${data.name}`,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error(
            "Formspree failed:",
            res.status,
            await res.text()
          );
        }
      })
      .catch((err) => {
        console.error("Formspree error:", err);
      });

    await Promise.allSettled([
      telegramPromise,
      formspreePromise,
    ]);

    return {
      success: true,
    };
  });
