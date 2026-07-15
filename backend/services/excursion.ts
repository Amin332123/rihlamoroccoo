import { ExcursionRepository } from "../repositories/excursion";
import { Logger } from "../utils/logger";

export class ExcursionService {
  static async getAllPublished(onlyPublished = true) {
    Logger.info(`Fetching excursions (onlyPublished: ${onlyPublished})`, "ExcursionService");
    return ExcursionRepository.findAll(onlyPublished);
  }

  static async getBySlug(slug: string) {
    Logger.info(`Fetching excursion by slug: ${slug}`, "ExcursionService");
    const excursion = await ExcursionRepository.findBySlug(slug);
    if (!excursion) {
      Logger.warn(`Excursion not found for slug: ${slug}`, "ExcursionService");
    }
    return excursion;
  }

  static async getById(id: string) {
    Logger.info(`Fetching excursion by id: ${id}`, "ExcursionService");
    return ExcursionRepository.findById(id);
  }

  static async createExcursion(data: any) {
    Logger.info(`Creating new excursion: ${data.title}`, "ExcursionService");
    return ExcursionRepository.create(data);
  }

  static async updateExcursion(id: string, data: any) {
    Logger.info(`Updating excursion by id: ${id}`, "ExcursionService");
    return ExcursionRepository.update(id, data);
  }

  static async deleteExcursion(id: string) {
    Logger.info(`Deleting excursion by id: ${id}`, "ExcursionService");
    return ExcursionRepository.delete(id);
  }
}
