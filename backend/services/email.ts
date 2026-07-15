import nodemailer from "nodemailer";
import { config } from "../config";
import { Logger } from "../utils/logger";

export class EmailService {
  private static getTransporter() {
    return nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });
  }

  static async sendReservationConfirmation(to: string, reservationDetails: {
    name: string;
    excursion: string;
    date: string;
    guests: number;
  }): Promise<boolean> {
    const subject = "Reservation Received - Rihla Morocco";
    const html = `
      <div style="font-family: serif; padding: 20px; background-color: #FAF7F2; color: #2B2B2B; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid #D8C2A5;">
        <h2 style="color: #3F4E35; border-bottom: 1px solid #D8C2A5; padding-bottom: 10px;">Marhaba, ${reservationDetails.name}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #6F6F6F;">
          Thank you for requesting seats with Rihla Morocco. Our boutique planning team has received your request.
        </p>
        <div style="background-color: #FFFFFF; padding: 20px; border-radius: 14px; margin: 20px 0; border: 1px solid #D8C2A5/30;">
          <h3 style="color: #A66A3D; margin-top: 0;">Reservation Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #6F6F6F;">Selected Tour:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #3F4E35;">${reservationDetails.excursion}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6F6F6F;">Travel Date:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #3F4E35;">${reservationDetails.date}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6F6F6F;">Guests:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #3F4E35;">${reservationDetails.guests} person(s)</td>
            </tr>
          </table>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #6F6F6F;">
          Please note: **This is not a final booking**. Our specialist will contact you shortly via **WhatsApp or Phone** to finalize coordinates. No payment is required until details are confirmed.
        </p>
        <p style="font-size: 13px; color: #A66A3D; margin-top: 30px;">
          Warm regards,<br />
          <strong>Rihla Morocco Team</strong>
        </p>
      </div>
    `;

    if (!config.email.enabled) {
      Logger.info(`[Email Blocked] Mock sending reservation confirmation email to: ${to}`, "EmailService");
      return true;
    }

    try {
      const transporter = this.getTransporter();
      await transporter.sendMail({
        from: config.email.from,
        to,
        subject,
        html
      });
      Logger.info(`Confirmation email sent successfully to ${to}`, "EmailService");
      return true;
    } catch (error) {
      Logger.error(`Failed to send confirmation email to ${to}`, error, "EmailService");
      return false;
    }
  }

  static async sendContactConfirmation(to: string, name: string): Promise<boolean> {
    const subject = "We have received your message - Rihla Morocco";
    const html = `
      <div style="font-family: serif; padding: 20px; background-color: #FAF7F2; color: #2B2B2B; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid #D8C2A5;">
        <h2 style="color: #3F4E35;">Marhaba, ${name}</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #6F6F6F;">
          Thank you for reaching out to Rihla Morocco. We have received your inquiry and our team will get back to you within 24 hours.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #6F6F6F;">
          If your request is urgent, please feel free to message our active specialist directly on WhatsApp.
        </p>
        <p style="font-size: 13px; color: #A66A3D; margin-top: 30px;">
          Warm regards,<br />
          <strong>Rihla Morocco Team</strong>
        </p>
      </div>
    `;

    if (!config.email.enabled) {
      Logger.info(`[Email Blocked] Mock sending contact confirmation email to: ${to}`, "EmailService");
      return true;
    }

    try {
      const transporter = this.getTransporter();
      await transporter.sendMail({
        from: config.email.from,
        to,
        subject,
        html
      });
      Logger.info(`Contact confirmation email sent successfully to ${to}`, "EmailService");
      return true;
    } catch (error) {
      Logger.error(`Failed to send contact confirmation email to ${to}`, error, "EmailService");
      return false;
    }
  }
}
