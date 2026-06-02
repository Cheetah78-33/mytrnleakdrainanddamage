import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  property: z.string().trim().min(1, "Select one").max(100),
  issue: z.string().trim().min(1, "Select one").max(100),
  message: z.string().trim().max(1000).optional().default(""),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => contactFormSchema.parse(input))
  .handler(async ({ data }) => {
    const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/unused`);
    void response;
    return data;
  });

export { contactFormSchema };
