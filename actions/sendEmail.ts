"use server";

import { headers } from "next/headers";
import { getContactIp, getProtectionConfig, logContactFailure, protectContact, validateContact } from "@/lib/contact-protection";
import { getMailjetConfig, sendMailjetEmail } from "@/lib/mailjet";
import { contactEmailHtml, contactEmailText } from "@/lib/email-template";

export const sendEmail = async (formData: FormData) => {
  const failure = { error: "Unable to send message. Please email directly." };
  const payload = validateContact(formData);
  const config = getProtectionConfig();
  const mailjetConfig = getMailjetConfig();
  if (!payload) {
    logContactFailure("input");
    return failure;
  }
  if (!config || !mailjetConfig) {
    logContactFailure("configuration");
    return failure;
  }

  let stage: Parameters<typeof logContactFailure>[0] = "request_headers";
  try {
    const ip = getContactIp(await headers());
    if (!ip) {
      logContactFailure("client_ip");
      return failure;
    }
    stage = "protection";
    if (!await protectContact(payload.token, ip, config)) return failure;
    stage = "mailjet";
    const data = await sendMailjetEmail({
      senderEmail: payload.senderEmail,
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    }, mailjetConfig);
    return { data };
  } catch {
    logContactFailure(stage);
    return failure;
  }
};
