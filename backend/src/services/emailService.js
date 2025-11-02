// backend/src/services/emailService.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  // Helper: Simulate email sending in sandbox
  async simulateEmailSend(type, to, subject) {
    console.log(`📨 [SANDBOX MODE] Pretending to send "${type}" email`);
    console.log(`To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  // Send feedback request email to user
  async sendFeedbackRequest(userEmail, token) {
    const feedbackUrl = `${process.env.FRONTEND_URL}/feedback/${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 Feedback Request</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We would love to hear your feedback! Your insights help us improve our services.</p>
            <p>Please click the button below to share your thoughts:</p>
            <div style="text-align: center;">
              <a href="${feedbackUrl}" class="button">Give Feedback</a>
            </div>
            <p style="color: #666; font-size: 14px;">Or copy this link: <br/><a href="${feedbackUrl}">${feedbackUrl}</a></p>
            <p>This link will expire in 7 days.</p>
            <p>Thank you for your time!</p>
          </div>
          <div class="footer">
            <p>If you didn't expect this email, please ignore it.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      // ✅ Skip real email in development (Resend sandbox workaround)
      if (process.env.NODE_ENV !== "production") {
        return await this.simulateEmailSend("Feedback Request", userEmail, "📝 We would love your feedback!");
      }

      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: [userEmail],
        subject: "📝 We would love your feedback!",
        html,
      });

      if (error) throw new Error(error.message);
      return { success: true, data };
    } catch (error) {
      console.error("Email sending error:", error);
      throw error;
    }
  }

  // Send confirmation email to HR
  async sendHRConfirmation(hrEmail, userEmail, feedbackData) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>✅ New Feedback Received</h1></div>
          <div class="content">
            <p>Hello HR Team,</p>
            <p>A user has successfully submitted feedback.</p>
            <div class="info-box">
              <p><strong>User Email:</strong> ${userEmail}</p>
              <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Rating:</strong> ${feedbackData.rating || "N/A"}/5</p>
              <p><strong>Feedback:</strong></p>
              <p>${feedbackData.message || "No message provided"}</p>
            </div>
            <p>You can view all feedback in your dashboard.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      if (process.env.NODE_ENV !== "production") {
        return await this.simulateEmailSend("HR Confirmation", hrEmail, "✅ New Feedback Received");
      }

      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: [hrEmail],
        subject: "✅ New Feedback Received",
        html,
      });

      if (error) throw new Error(error.message);
      return { success: true, data };
    } catch (error) {
      console.error("HR email sending error:", error);
      throw error;
    }
  }

  // Send thank you email to user
  async sendThankYouEmail(userEmail) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
          .emoji { font-size: 48px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Thank You! 🎉</h1></div>
          <div class="content">
            <div class="emoji">🙏</div>
            <h2>We appreciate your feedback!</h2>
            <p>Your insights are valuable to us and will help us improve our services.</p>
            <p>Thank you for taking the time to share your thoughts.</p>
            <p style="margin-top: 30px;">Have a great day!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      if (process.env.NODE_ENV !== "production") {
        return await this.simulateEmailSend("Thank You", userEmail, "🙏 Thank you for your feedback!");
      }

      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: [userEmail],
        subject: "🙏 Thank you for your feedback!",
        html,
      });

      if (error) throw new Error(error.message);
      return { success: true, data };
    } catch (error) {
      console.error("Thank you email sending error:", error);
      throw error;
    }
  }
}

module.exports = new EmailService();
