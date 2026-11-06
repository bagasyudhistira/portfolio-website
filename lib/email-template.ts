const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type ContactEmailInput = {
  message: string;
  senderEmail: string;
};

/**
 * Plain HTML email body for the contact form.
 * Replaces the deprecated @react-email stack; inputs are escaped so a
 * visitor cannot inject markup into the email that reaches the owner.
 */
export const contactEmailHtml = ({ message, senderEmail }: ContactEmailInput) => `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f3f4f6;color:#111827;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:32px 40px;">
      <h1 style="margin:0 0 16px;font-size:20px;line-height:1.4;">You received a message from the contact form</h1>
      <p style="margin:0 0 16px;white-space:pre-wrap;font-size:15px;line-height:1.6;">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
      <p style="margin:0;font-size:14px;color:#4b5563;">The sender's email is: ${escapeHtml(senderEmail)}</p>
    </div>
  </body>
</html>
`;

export const contactEmailText = ({ message, senderEmail }: ContactEmailInput) =>
  `You received a message from the contact form\n\n${message}\n\n---\nThe sender's email is: ${senderEmail}\n`;
