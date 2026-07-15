import { TestimonialRepository } from "../repositories/testimonial";
import { Logger } from "../utils/logger";

export class TestimonialService {
  static async getTestimonials(onlyFeatured = false) {
    Logger.info(`Fetching testimonials (featured only: ${onlyFeatured})`, "TestimonialService");
    return TestimonialRepository.findAll(onlyFeatured);
  }

  static async addTestimonial(data: {
    fullName: string;
    country: string;
    rating: number;
    comment: string;
    avatar?: string;
    featured?: boolean;
  }) {
    Logger.info(`Adding new guest testimonial from: ${data.fullName}`, "TestimonialService");
    return TestimonialRepository.create(data);
  }

  static async updateTestimonial(id: string, data: {
    fullName?: string;
    country?: string;
    rating?: number;
    comment?: string;
    avatar?: string;
    featured?: boolean;
  }) {
    Logger.info(`Updating guest testimonial ${id}`, "TestimonialService");
    return TestimonialRepository.update(id, data);
  }

  static async deleteTestimonial(id: string) {
    Logger.info(`Deleting guest testimonial ${id}`, "TestimonialService");
    return TestimonialRepository.delete(id);
  }
}
