import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  property: z.string().trim().min(1),
  issue: z.string().trim().min(1),
  message: z.string().trim().optional().default(""),
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeokdvo";

export const submitContactRequest = createServerFn({ method: "POST" })
  .validator(contactFormSchema)
 .handler(async ({ data }) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("ENV CHECK:", {
    botToken,
    chatId,
  });

  if (!botToken || !chatId) {
    throw new Error("Missing env vars");
  }

  const text =
    `🚨 MYTRN Contact Form\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `Property: ${data.property}\n` +
    `Issue: ${data.issue}\n` +
    `Message: ${data.message || "None"}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  await fetch("https://formspree.io/f/mqeokdvo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return { success: true };
});
