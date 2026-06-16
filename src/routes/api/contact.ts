export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response("Missing env vars", { status: 500 });
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

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    return Response.json({ success: true });
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}
