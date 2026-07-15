import { NextResponse } from "next/server";
import { GalleryService } from "../services/gallery";
import { handleRouteError } from "../middlewares/error";

export class GalleryController {
  static async getAll() {
    try {
      const images = await GalleryService.getImages();
      return NextResponse.json({
        success: true,
        data: images
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async create(request: Request) {
    try {
      const body = await request.json();
      
      if (!body.title || !body.category || !body.image) {
        return NextResponse.json(
          { success: false, error: "Title, category, and image are required" },
          { status: 400 }
        );
      }

      const image = await GalleryService.addImage(body);
      return NextResponse.json(
        {
          success: true,
          message: "Gallery image uploaded successfully",
          data: image
        },
        { status: 201 }
      );
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async update(request: Request, id: string) {
    try {
      const body = await request.json();
      const image = await GalleryService.updateImage(id, body);
      return NextResponse.json({
        success: true,
        message: "Gallery image updated successfully",
        data: image
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async delete(id: string) {
    try {
      await GalleryService.deleteImage(id);
      return NextResponse.json({
        success: true,
        message: "Gallery image deleted successfully"
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }
}
