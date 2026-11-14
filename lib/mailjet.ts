type MailjetConfig = {
  apiKey: string;
  secretKey: string;
  senderEmail: string;
};

export function getMailjetConfig(): MailjetConfig | null {
  const apiKey = process.env.MAILJET_API_KEY?.trim();
  const secretKey = process.env.MAILJET_SECRET_KEY?.trim();
  const senderEmail = process.env.MAILJET_FROM_EMAIL?.trim();
  if (!apiKey || !secretKey || !senderEmail || senderEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) return null;
  return { apiKey, secretKey, senderEmail };
}

export async function sendMailjetEmail(
  payload: { senderEmail: string; html: string; text: string },
  config: MailjetConfig,
  request: typeof fetch = fetch,
): Promise<{ id: string }> {
  const response = await request("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.apiKey}:${config.secretKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Messages: [{
        From: { Email: config.senderEmail, Name: "Bagas Yudhistira | Portfolio" },
        To: [{ Email: "bagasyudhistirafauzi@gmail.com" }],
        ReplyTo: { Email: payload.senderEmail },
        Subject: "New portfolio inquiry | Bagas Yudhistira",
        TextPart: payload.text,
        HTMLPart: payload.html,
      }],
    }),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Email delivery unavailable");
  const result = await response.json();
  const message = result?.Messages?.[0];
  const id = message?.To?.[0]?.MessageUUID;
  if (result?.Messages?.length !== 1 || message?.Status !== "success" ||
      typeof id !== "string" || !id) {
    throw new Error("Email delivery not accepted");
  }
  return { id };
}
