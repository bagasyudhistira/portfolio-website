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

export const contactEmailHtml = ({ message, senderEmail }: ContactEmailInput) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New portfolio inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;color:#111827;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">A new message from your portfolio contact form. Reply directly to get in touch.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f4f6;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;">
            <tr>
              <td style="padding:28px 24px;background:#111827;color:#ffffff;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d1d5db;">Portfolio contact</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;">New inquiry</h1>
                <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#d1d5db;">Bagas Yudhistira Fauzi</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#4b5563;">Visitor email</p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(senderEmail)}</p>
                <h2 style="margin:0 0 12px;font-size:16px;line-height:1.5;">Message</h2>
                <div style="padding:20px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;font-size:15px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word;">${escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />")}</div>
                <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">Use Reply to respond directly to the visitor. Their address is set as the Reply-To for this email.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">Sent automatically by your portfolio contact form. The visitor's message and email address are supplied by the visitor.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const contactEmailText = ({ message, senderEmail }: ContactEmailInput) =>
  `NEW PORTFOLIO INQUIRY\nBagas Yudhistira Fauzi\n\nVisitor email: ${senderEmail}\n\nMESSAGE\n${message}\n\n---\nUse Reply to respond directly to the visitor. Their address is set as the Reply-To for this email.\n\nSent automatically by your portfolio contact form. The visitor's message and email address are supplied by the visitor.\n`;
