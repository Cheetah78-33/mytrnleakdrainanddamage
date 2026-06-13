import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  property: z.string().min(1),
  issue: z.string().min(1),
  message: z.string().optional().default(""),
});

// ⚠️ REPLACE THESE AFTER YOU REVOKE TOKEN
const TELEGRAM_BOT_TOKEN = "8965540792:AAG7OtoruAzSe2h60ulGtZilbwDlnb0_LWA";
const TELEGRAM_CHAT_ID = "8622290052";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator((data) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("🔥 CONTACT FORM HIT");

    const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property: ${data.property}
Issue: ${data.issue}
Message: ${data.message || "N/A"}
`;

    // Fire-and-forget Telegram (never breaks form)
    void fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    ).catch(() => {});

    // Fire-and-forget Formspree
    void fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).catch(() => {});

    return { success: true };
  });
