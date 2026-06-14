export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => contactFormSchema.parse(input))
  .handler(async ({ data }) => {
    const cleanMessage = data.message?.trim() || "No message provided.";

    const payloadText = `
MYTRN Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Property: ${data.property}
Issue: ${data.issue}
Message: ${cleanMessage}
`.trim();

    // helper with timeout so NOTHING can freeze
    const safeFetch = (url: string, options: any, timeout = 5000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), timeout)
        ),
      ]);
    };

    // 1. Telegram (non-blocking, safe)
    const telegram = safeFetch(
      "https://api.telegram.org/bot8965540792:AAG7OtoruAzSe2h60ulGtZilbwDlnb0_LWA/sendMessage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "8622290052",
          text: payloadText,
        }),
      }
    ).catch((e) => console.error("Telegram failed:", e));

    // 2. Formspree (safe)
    const formspree = safeFetch(
      "https://formspree.io/f/mqeokdvo",
      {
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
      }
    ).catch((e) => console.error("Formspree failed:", e));

    // 3. Supabase (safe wrapper)
    const supabase = (async () => {
      try {
        await supabaseAdmin.from("contact_messages").insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          property: data.property,
          issue: data.issue,
          message: cleanMessage,
        });
      } catch (e) {
        console.error("Supabase failed:", e);
      }
    })();

    // WAIT WITHOUT FREEZING UI
    await Promise.allSettled([telegram, formspree, supabase]);

    return { success: true };
  });
