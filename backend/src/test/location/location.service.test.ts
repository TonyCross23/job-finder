import { prisma } from '../../database/prisma';
import { LocationRepository } from '../../feature/location/infrastructure/location.repository';
import { LocationService } from '../../feature/location/useCase/location.service';

const locationRepo = new LocationRepository(prisma);
const locationService = new LocationService(locationRepo);

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.location.deleteMany();
});

afterAll(async () => {
  await prisma.location.deleteMany();
  await prisma.$disconnect();
});

describe('Create location', () => {
  it('should be create location', async () => {
    const location = await locationService.create('Yangon', 'From Yangon');
    expect(location.name).toBe('Yangon');
    expect(location.description).toBe('From Yangon');
  });

  it('should get all locations', async () => {
    await locationService.create('Mandalay', 'Current From MDY');
    await locationService.create('Yangon', 'Current From YGN');
    const locations = await locationService.getAll();
    expect(locations.length).toBe(2);
    expect(locations[0].description).toBeUndefined();
  });

  it('should get a location with id', async () => {
    const location = await locationService.create('Pyin Oo Lwin', 'POL');
    const foundLocation = await locationService.getById(location.id);

    expect(foundLocation!.name).toBe('Pyin Oo Lwin');
    expect(foundLocation!.description).toBe('POL');
  });

  it('should throw a 500-level error if database fails during creation', async () => {
    const dbError = new Error('Database Connection Lost');
    const spy = jest.spyOn(locationRepo, 'create').mockRejectedValue(dbError);

    await expect(locationService.create('Taunggyi', 'Shan State')).rejects.toThrow(
      'Database Connection Lost',
    );

    spy.mockRestore();
  });

  it('should return null if location not exist', async () => {
    await expect(locationService.getById('1')).rejects.toThrow('Location not found');
  });

  it('should update an existing location', async () => {
    const createdLocation = await locationService.create('Old City', 'Old Description');

    const updatedLocation = await locationService.update(
      createdLocation.id,
      'New City Name',
      'New Description',
    );
    if (!updatedLocation) throw new Error('Location not found');
    expect(updatedLocation.name).toBe('New City Name');
    expect(updatedLocation.description).toBe('New Description');
    expect(updatedLocation.id).toBe(createdLocation.id); // Must be same id
  });

  it('should return null or throw error if updating non-existent location', async () => {
    await expect(locationService.update('9999', 'Ghost City', 'No Exist')).rejects.toThrow(
      'Location not found',
    );
  });

  it('should allow updating only the name and keep/change description to null', async () => {
    const location = await locationService.create('Bago', 'Initial Desc');

    const updated = await locationService.update(location.id, 'Bago City', 'Initial');
    if (!updated) throw new Error('Location not found');
    expect(updated.name).toBe('Bago City');
    expect(updated.description).toBe('Initial');
  });

  it('should delete location with id', async () => {
    const location = await locationService.create('test', 'testing');
    const foundLocation = await locationService.getById(location.id);
    expect(foundLocation).toBeDefined();
    await locationService.delete(foundLocation!.id);
    await expect(locationService.getById(location.id)).rejects.toThrow('Location not found');
  });

  it('should handle error if database fails during deletion', async () => {
    const spy = jest.spyOn(locationRepo, 'delete').mockRejectedValue(new Error('Delete Failed'));

    await expect(locationService.delete('some-id')).rejects.toThrow('Delete Failed');

    spy.mockRestore();
  });
});
