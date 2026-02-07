import { Request, Response } from "express";
import { ILocationRepository } from "../../feature/location/location.IRepository";
import { LocationService } from "../../feature/location/location.service";
import { LocationController } from "../../feature/location/location.controller";

class MockLocationRepository implements ILocationRepository {
    create = jest.fn();
    getAll = jest.fn();
    getById = jest.fn();
    getByName = jest.fn();
    update = jest.fn();
    delete = jest.fn();
}

describe("Location controller", () => {
    let locationRepository: MockLocationRepository;
    let locationService: LocationService;
    let locationController: LocationController;

    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        locationRepository = new MockLocationRepository()
        locationService = new LocationService(locationRepository)
        locationController = new LocationController(locationService)

        req = {
            body: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis(),
        }
        next = jest.fn();
    })

    describe("create location", () => {
        it("should return 201 and create location", async () => {
            const location = { id: 99, name: "Pyin Oo Lwin", description: "POL" }

            // Mocking the repository methods
            locationRepository.getByName.mockResolvedValue(null);
            locationRepository.create.mockResolvedValue(location);

            req.body = { name: "Pyin Oo Lwin", description: "POL" }

            const createMethod = locationController.create.bind(locationController);

            await createMethod(req as Request, res as Response, next);

            if (next.mock.calls.length > 0) {
                console.log("Error caught by catchAsync:", next.mock.calls[0][0]);
            }

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(location)
        })
    })
})