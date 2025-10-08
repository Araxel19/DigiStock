import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto, req: any): Promise<import("./entities/location.entity").Location>;
    findAll(req: any): Promise<import("./entities/location.entity").Location[]>;
    findOne(id: string): Promise<import("./entities/location.entity").Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<import("./entities/location.entity").Location>;
}
