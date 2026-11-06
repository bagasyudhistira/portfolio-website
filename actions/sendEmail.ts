"use server";

import { validateString, getErrorMessage } from "@/lib/utils";
import { Resend } from "resend";
import { contactEmailHtml, contactEmailText } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  const payload = {
    message: message as string,
    senderEmail: senderEmail as string,
  };

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboard@resend.dev>",
      to: "bagasyudhistirafauzi@gmail.com",
      subject: "Message from your portfolio website",
      replyTo: payload.senderEmail,
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    });

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
