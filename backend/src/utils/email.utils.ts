
import { createTransport } from "nodemailer";

const EMAIL = process.env.APP_USER;
const ADMIN_EMAIL = process.env.APP_USER;
const PASSWORD = process.env.APP_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!EMAIL) {
    throw new Error(`Cannot load APP_USER from .env file`);

}
if (!PASSWORD) {
    throw new Error(`Cannot load APP_PASS from .env file`);
}
if (!FRONTEND_URL) {
    throw new Error(`Cannot load FRONTEND_URL from .env file`);
}
if (!ADMIN_EMAIL) {
    throw new Error(`Cannot load FRONTEND_URL from .env file`);
}


const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }

})

export const testMail = async () => {
    try {
        await transporter.verify()
        console.log(`✅✅Nodemailer successfully runned✅✅`);
    } catch (error) {
        throw new Error(`❌❌Nodemailer service filed with error❌❌ \n ${error}`);
    }
}

export const sendResetPasswordEmail = async (email: string, token: string) => {

    const resetLink = `${FRONTEND_URL}/reset/${token}`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password | PenCraft</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f4fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f6f4fa; padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background-color: #ffffff; border-radius: 28px; box-shadow: 0 20px 60px rgba(91, 59, 140, 0.12); overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 36px 0 36px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="display: flex; align-items: center; gap: 12px;">
                                        <div style="background: linear-gradient(135deg, #7c5cbf, #5b3b8c); color: white; width: 48px; height: 48px; border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 8px 16px -6px rgba(91, 59, 140, 0.3);">
                                            ✍️
                                        </div>
                                        <span style="font-size: 26px; font-weight: 700; background: linear-gradient(135deg, #2b1a3a, #5b3b8c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                            Pen<span style="font-weight: 300; -webkit-text-fill-color: #5b3b8c;">Craft</span>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 36px;">
                            <hr style="border: none; border-top: 2px solid #f0ebf7; margin: 24px 0 20px 0;" />
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 0 36px 32px 36px;">
                            <h2 style="color: #1e142b; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px; display: flex; align-items: center; gap: 10px;">
                                🔐 Reset Your Password
                            </h2>
                            
                            <p style="color: #4e3e5e; font-size: 16px; line-height: 1.7; margin: 16px 0 8px 0;">
                                Hello there,
                            </p>
                            
                            <p style="color: #4e3e5e; font-size: 16px; line-height: 1.8; margin: 8px 0 20px 0;">
                                We received a request to reset the password for your 
                                <strong style="color: #5b3b8c;">PenCraft</strong> account. 
                                Click the button below to create a new password:
                            </p>

                            <!-- Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 24px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${resetLink}" 
                                           style="display: inline-block; 
                                                  background: linear-gradient(135deg, #6d4c9f, #4f337a); 
                                                  color: #ffffff; 
                                                  text-decoration: none; 
                                                  font-weight: 600; 
                                                  font-size: 17px; 
                                                  padding: 16px 44px; 
                                                  border-radius: 60px; 
                                                  box-shadow: 0 12px 24px -8px rgba(79, 51, 122, 0.35);
                                                  transition: all 0.3s ease;
                                                  border: 1px solid rgba(255, 255, 255, 0.15);">
                                            🔄 Reset Password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Info Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8f5fc; border-radius: 16px; border-left: 4px solid #7c5cbf; margin: 20px 0 24px 0;">
                                <tr>
                                    <td style="padding: 16px 20px;">
                                        <p style="color: #3e2b55; font-size: 14px; margin: 0; display: flex; align-items: center; gap: 8px;">
                                            ⏳ <span>This link will expire in <strong style="color: #5b3b8c;">1 hour</strong></span>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Note -->
                            <p style="color: #7a6890; font-size: 14px; line-height: 1.6; margin: 8px 0 4px 0; background: #faf8fd; padding: 14px 18px; border-radius: 12px;">
                                🔒 If you didn't request this, please ignore this email. 
                                No changes will be made to your account.
                            </p>

                            <p style="color: #7a6890; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                Best regards,<br />
                                <strong style="color: #5b3b8c; font-size: 16px;">The PenCraft Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #faf8fd; padding: 20px 36px; border-top: 1px solid #ede8f5;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <p style="color: #9a89ae; font-size: 13px; margin: 0 0 6px 0; line-height: 1.6;">
                                            This email was sent automatically, please do not reply.
                                        </p>
                                        <p style="color: #b09acf; font-size: 12px; margin: 0; letter-spacing: 0.3px;">
                                            &copy; ${new Date().getFullYear()} PenCraft. All rights reserved.
                                        </p>
                                        <p style="color: #c5b3db; font-size: 11px; margin: 8px 0 0 0;">
                                            <a href="#" style="color: #9a89ae; text-decoration: none; margin: 0 8px;">Email Settings</a>
                                            <span style="color: #d5c8e4;">|</span>
                                            <a href="#" style="color: #9a89ae; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`
    await transporter.sendMail({
        from: "PenCraft",
        subject: "Reset password",
        to: email, html
    })
}
export const sendContactEmail = async (name: string, email: string, subject: string, message: string) => {
    const template = `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 40px; }
    .card { background: white; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 24px; }
    .header h2 { color: #6366f1; margin: 0; }
    .header p { color: #888; margin: 4px 0 0; font-size: 14px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 16px; color: #333; }
    .message { background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 8px; line-height: 1.6; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #aaa; text-align: center; }
    .badge { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>📬 New Contact Message</h2>
      <p>Someone reached out via PenCraft</p>
    </div>

    <div class="field">
      <div class="label">From</div>
      <div class="value">{{name}}</div>
    </div>

    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:{{email}}">{{email}}</a></div>
    </div>

    <div class="field">
      <div class="label">Subject</div>
      <div class="value"><span class="badge">{{subject}}</span></div>
    </div>

    <div class="field">
      <div class="label">Message</div>
      <div class="message">{{message}}</div>
    </div>

    <div class="footer">
      Sent from PenCraft Contact Form · {{date}}
    </div>
  </div>
</body>
</html>
    `

    const html = template
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{subject}}", subject)
        .replace("{{message}}", message)
        .replace("{{date}}", new Date().toLocaleDateString());

    await transporter.sendMail({

        from: `${name} '${email}'`,
        subject,
        replyTo: email,
        to: ADMIN_EMAIL, html
    })
}