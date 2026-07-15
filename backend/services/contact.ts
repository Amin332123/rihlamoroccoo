import { ContactRepository } from "../repositories/contact";
import { EmailService } from "./email";
import { Logger } from "../utils/logger";

export class ContactService {
  static async submitMessage(data: { fullName: string; email: string; subject: string; message: string }) {
    Logger.info(`Submitting new contact message from: ${data.fullName}`, "ContactService");
    
    const messageObj = await ContactRepository.create(data);

    // Trigger confirmation email
    EmailService.sendContactConfirmation(messageObj.email, messageObj.fullName).catch((err) => {
      Logger.error("Failed to trigger contact email confirmation in background", err, "ContactService");
    });

    return messageObj;
  }

  static async getAllMessages() {
    Logger.info("Fetching all contact messages", "ContactService");
    return ContactRepository.findAll();
  }

  static async markMessageRead(id: string) {
    Logger.info(`Marking contact message ${id} as read`, "ContactService");
    return ContactRepository.markAsRead(id);
  }

  static async deleteMessage(id: string) {
    Logger.info(`Deleting contact message ${id}`, "ContactService");
    return ContactRepository.delete(id);
  }
}
