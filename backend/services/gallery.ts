import { GalleryRepository } from "../repositories/gallery";
import { Logger } from "../utils/logger";

export class GalleryService {
  static async getImages() {
    Logger.info("Fetching all gallery images", "GalleryService");
    return GalleryRepository.findAll();
  }

  static async addImage(data: { title: string; category: string; image: string; featured?: boolean }) {
    Logger.info(`Adding new gallery image: ${data.title}`, "GalleryService");
    return GalleryRepository.create(data);
  }

  static async updateImage(id: string, data: { title?: string; category?: string; image?: string; featured?: boolean }) {
    Logger.info(`Updating gallery image ${id}`, "GalleryService");
    return GalleryRepository.update(id, data);
  }

  static async deleteImage(id: string) {
    Logger.info(`Deleting gallery image ${id}`, "GalleryService");
    return GalleryRepository.delete(id);
  }
}
