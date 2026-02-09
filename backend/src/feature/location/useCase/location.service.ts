import { AppError } from "../../../errors/httpErrors";
import { ILocationRepository } from "../infrastructure/location.IRepository";
import { Location } from "../location";


export class LocationService {
  constructor(private locationRepo: ILocationRepository) {}

  async create(name: string, description: string | null): Promise<Location> {
    const location = await this.locationRepo.getByName(name);
    if (location) {
      throw new AppError('Location Name is already exist', 409);
    }
    return await this.locationRepo.create(name, description ?? '');
  }

  async getAll(): Promise<Location[]> {
    return await this.locationRepo.getAll();
  }

  async getById(id: string): Promise<Location | null> {
    const location = await this.locationRepo.getById(id);
    if (!location) {
      throw new AppError('Location not found', 404);
    }
    return location;
  }

  async update(id: string, name: string, description: string): Promise<Location | null> {
    const location = await this.locationRepo.getById(id);
    if (!location) {
      throw new AppError('Location not found', 404);
    }

    return this.locationRepo.update(id, name, description);
  }

  async delete(id: string): Promise<void> {
    return this.locationRepo.delete(id);
  }
}
