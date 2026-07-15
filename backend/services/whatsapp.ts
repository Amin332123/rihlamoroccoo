import { config } from "../config";

export class WhatsAppService {
  /**
   * Generates a link that allows the administrator to quickly initiate a conversation
   * on WhatsApp with a prefilled message templates about a new reservation request.
   */
  static generateAdminAlertLink(reservation: {
    name: string;
    excursion: string;
    date: string;
    guests: number;
    phone: string;
  }): string {
    const textMessage = `New Excursion Request!\n\nName: ${reservation.name}\nTour: ${reservation.excursion}\nDate: ${reservation.date}\nGuests: ${reservation.guests}\nPhone: ${reservation.phone}\n\nPlease click to confirm.`;
    const encodedText = encodeURIComponent(textMessage);
    return `${config.whatsapp.apiUrl}?phone=${config.whatsapp.agentPhone}&text=${encodedText}`;
  }

  /**
   * Generates a direct WhatsApp link to contact the customer directly to confirm details.
   */
  static generateCustomerContactLink(customerPhone: string, excursionTitle: string): string {
    const formattedPhone = customerPhone.replace(/[^\d+]/g, ""); // Clean formatting
    const message = `Marhaba! Thank you for reserving your seats for "${excursionTitle}" with Rihla Morocco. We would love to coordinate details.`;
    return `${config.whatsapp.apiUrl}?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
  }
}
