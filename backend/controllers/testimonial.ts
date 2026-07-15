import { NextResponse } from "next/server";
import { TestimonialService } from "../services/testimonial";
import { handleRouteError } from "../middlewares/error";

export class TestimonialController {
  static async getAll(request: Request) {
    try {
      const url = new URL(request.url);
      const onlyFeatured = url.searchParams.get("featured") === "true";
      
      const testimonials = await TestimonialService.getTestimonials(onlyFeatured);
      return NextResponse.json({
        success: true,
        data: testimonials
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async create(request: Request) {
    try {
      const body = await request.json();
      
      if (!body.fullName || !body.country || !body.rating || !body.comment) {
        return NextResponse.json(
          { success: false, error: "FullName, country, rating, and comment are required" },
          { status: 400 }
        );
      }

      const testimonial = await TestimonialService.addTestimonial({
        fullName: body.fullName,
        country: body.country,
        rating: parseFloat(body.rating),
        comment: body.comment,
        avatar: body.avatar,
        featured: body.featured === true
      });

      return NextResponse.json(
        {
          success: true,
          message: "Testimonial added successfully",
          data: testimonial
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
      const testimonial = await TestimonialService.updateTestimonial(id, body);
      return NextResponse.json({
        success: true,
        message: "Testimonial updated successfully",
        data: testimonial
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }

  static async delete(id: string) {
    try {
      await TestimonialService.deleteTestimonial(id);
      return NextResponse.json({
        success: true,
        message: "Testimonial deleted successfully"
      });
    } catch (error) {
      return handleRouteError(error);
    }
  }
}
