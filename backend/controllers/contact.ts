import { NextResponse } from "next/server";
import { ContactService } from "../services/contact";
import { CreateContactSchema } from "../validation/contact";
import { handleRouteError } from "../middlewares/error";

export class ContactController {
  static async submit(request: Request) {
    try {
      const body = await request.json();
      const validatedInput = CreateContactSchema.parse(body);

      const messageObj = await ContactService.submitMessage(validatedInput);

      return NextResponse.json(
        {
          success: true,
          message: "Message received successfully",
          data: messageObj
        },
        { status: 201 }
      );
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async getAll() {
    try {
      const messages = await ContactService.getAllMessages();
      return NextResponse.json({
        success: true,
        data: messages
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async markRead(id: string) {
    try {
      const messageObj = await ContactService.markMessageRead(id);
      return NextResponse.json({
        success: true,
        message: "Message marked as read",
        data: messageObj
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async delete(id: string) {
    try {
      await ContactService.deleteMessage(id);
      return NextResponse.json({
        success: true,
        message: "Message deleted successfully"
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }
}
