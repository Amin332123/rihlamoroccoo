import { NextResponse } from "next/server";
import { ExcursionService } from "../services/excursion";
import { handleRouteError } from "../middlewares/error";
import { CreateExcursionSchema } from "../validation/excursion";

export class ExcursionController {
  static async getAll(onlyPublished = true) {
    try {
      const excursions = await ExcursionService.getAllPublished(onlyPublished);
      return NextResponse.json({
        success: true,
        data: excursions
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async getBySlug(slug: string) {
    try {
      // Find by slug first
      let excursion = await ExcursionService.getBySlug(slug);
      
      // Fallback: find by ID
      if (!excursion) {
        excursion = await ExcursionService.getById(slug);
      }

      if (!excursion) {
        return NextResponse.json(
          { success: false, error: "Excursion not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: excursion
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async create(request: Request) {
    try {
      const body = await request.json();
      const validatedInput = CreateExcursionSchema.parse(body);
      const excursion = await ExcursionService.createExcursion(validatedInput);
      return NextResponse.json(
        {
          success: true,
          message: "Excursion created successfully",
          data: excursion
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
      const excursion = await ExcursionService.updateExcursion(id, body);
      return NextResponse.json({
        success: true,
        message: "Excursion updated successfully",
        data: excursion
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async delete(id: string) {
    try {
      await ExcursionService.deleteExcursion(id);
      return NextResponse.json({
        success: true,
        message: "Excursion deleted successfully"
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }
}
