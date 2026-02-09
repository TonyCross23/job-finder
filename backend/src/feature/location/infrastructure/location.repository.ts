import { PrismaClient } from '../../../generated/prisma/client';
import { Location } from '../location';
import { ILocationRepository } from './location.IRepository';

export class LocationRepository implements ILocationRepository {
  constructor(private prisma: PrismaClient) {}

  async create(name: string, description: string | null): Promise<Location> {
    const location = await this.prisma.location.create({
      data: {
        name,
        description,
      },
    });

    return new Location(location.id, location.name, location.description ?? '');
  }

  async getAll(): Promise<Location[]> {
    const locations = await this.prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return locations.map((location) => new Location(location.id, location.name));
  }

  async getById(id: string): Promise<Location | null> {
    const location = await this.prisma.location.findUnique({
      where: { id: id },
    });
    if (!location) return null;

    return new Location(location.id, location.name, location.description ?? '');
  }

  async getByName(name: string): Promise<Location | null> {
    const location = await this.prisma.location.findUnique({
      where: {
        name: name,
      },
    });
    if (!location) return null;

    return new Location(location.id, location.name);
  }

  async update(id: string, name: string, description: string): Promise<Location | null> {
    const location = await this.prisma.location.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return new Location(location.id, location.name, location.description ?? '');
  }

  async delete(id: string): Promise<void> {
    await this.prisma.location.delete({
      where: { id },
    });
  }
}
