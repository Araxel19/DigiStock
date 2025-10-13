import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto, req: any): Promise<import("digistock-business-logic").Location>;
    findAll(req: any): Promise<import("digistock-business-logic").Location[]>;
    findOne(id: string): Promise<import("digistock-business-logic").Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<import("digistock-business-logic").Location>;
}
