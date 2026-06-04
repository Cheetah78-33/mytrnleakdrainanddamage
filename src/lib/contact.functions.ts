import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  property: z.string().trim().min(1, "Select one").max(100),
  issue: z.string().trim().min(1, "Select one").max(100),
  message: z.string().trim().max(1000).optional().default(""),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

const TWILIO_GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";
const SMS_TO = "+15108905790";
const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

async function getTwilioFromNumber(lovableApiKey: string, twilioApiKey: string) {
  const configuredFromNumber = process.env.TWILIO_FROM_NUMBER?.trim();
  if (configuredFromNumber && E164_PHONE_PATTERN.test(configuredFromNumber)) {
    return configuredFromNumber;
  }

  const numbersResponse = await fetch(`${TWILIO_GATEWAY_URL}/IncomingPhoneNumbers.json?PageSize=1`, {
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": twilioApiKey,
    },
  });

  const responseText = await numbersResponse.text();
  if (!numbersResponse.ok) {
    throw new Error(`Could not load messaging sender (${numbersResponse.status}): ${responseText}`);
  }

  const payload = JSON.parse(responseText) as {
    incoming_phone_numbers?: Array<{ phone_number?: string; phoneNumber?: string }>;
  };
  const accountNumber = payload.incoming_phone_numbers?.[0]?.phone_number ?? payload.incoming_phone_numbers?.[0]?.phoneNumber;

  if (!accountNumber || !E164_PHONE_PATTERN.test(accountNumber)) {
    throw new Error("No valid messaging sender phone number is available on the connected account.");
  }

  return accountNumber;
}

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => contactFormSchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = requireEnv("LOVABLE_API_KEY");
    const TWILIO_API_KEY = requireEnv("TWILIO_API_KEY");
    const twilioFromNumber = await getTwilioFromNumber(LOVABLE_API_KEY, TWILIO_API_KEY);

    const cleanMessage = data.message?.trim() || "No message provided.";

    const smsBody = [
      `MYTRN form submission`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Property: ${data.property}`,
      `Issue: ${data.issue}`,
      `Message: ${cleanMessage}`,
    ].join("\n");

    const smsResponse = await fetch(`${TWILIO_GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TWILIO_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: SMS_TO,
        From: twilioFromNumber,
        Body: smsBody,
      }),
    });

    if (!smsResponse.ok) {
      const errorText = await smsResponse.text();
      throw new Error(`SMS notification failed (${smsResponse.status}): ${errorText}`);
    }

    return { success: true };
  });
