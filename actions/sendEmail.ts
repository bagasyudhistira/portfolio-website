"use server";

import { headers } from "next/headers";
import { getContactIp, getProtectionConfig, protectContact, validateContact } from "@/lib/contact-protection";
import { Resend } from "resend";
import { contactEmailHtml, contactEmailText } from "@/lib/email-template";

export const sendEmail = async (formData: FormData) => {
  const failure = { error: "Unable to send message. Please email directly." };
  const payload = validateContact(formData);
  const config = getProtectionConfig();
  if (!payload || !config || !process.env.RESEND_API_KEY) return failure;

  try {
    const ip = getContactIp(await headers());
    if (!ip || !await protectContact(payload.token, ip, config)) return failure;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboard@resend.dev>",
      to: "bagasyudhistirafauzi@gmail.com",
      subject: "Message from your portfolio website",
      replyTo: payload.senderEmail,
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    });

    if (error) return failure;
    return { data };
  } catch {
    return failure;
  }
};
