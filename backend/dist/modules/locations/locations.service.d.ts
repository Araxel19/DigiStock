import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from './dto';
export declare class LocationsService {
    private readonly locationRepository;
    constructor(locationRepository: Repository<Location>);
    create(createLocationDto: CreateLocationDto): Promise<Location>;
    findAll(organizationId: string): Promise<Location[]>;
    findOne(id: string): Promise<Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location>;
    remove(id: string): Promise<void>;
}
