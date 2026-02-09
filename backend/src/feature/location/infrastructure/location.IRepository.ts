import { Location } from '../location';

export interface ILocationRepository {
  create(name: string, description: string): Promise<Location>;
  getAll(): Promise<Location[]>;
  getById(id: string): Promise<Location | null>;
  getByName(ModelName: string): Promise<Location | null>;
  update(id: string, name: string, description: string): Promise<Location | null>;
  delete(id: string): Promise<void>;
}
