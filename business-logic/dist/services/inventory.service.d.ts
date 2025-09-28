import { Product, Planilla } from '../entities';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto } from '../dto';
import { IProductRepository, IPlanillaRepository, IPlanillaItemRepository, ICategoryRepository, ILocationRepository } from '../interfaces/repositories.interface';
export declare class InventoryService {
    private readonly productRepository;
    private readonly planillaRepository;
    private readonly planillaItemRepository;
    private readonly categoryRepository;
    private readonly locationRepository;
    constructor(productRepository: IProductRepository, planillaRepository: IPlanillaRepository, planillaItemRepository: IPlanillaItemRepository, categoryRepository: ICategoryRepository, locationRepository: ILocationRepository);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAllProducts(organizationId: string, search?: string): Promise<Product[]>;
    findProductById(id: string): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: string): Promise<void>;
    createPlanilla(createPlanillaDto: CreatePlanillaDto): Promise<Planilla>;
    findAllPlanillas(organizationId: string): Promise<Planilla[]>;
    findPlanillaById(id: string): Promise<Planilla>;
    updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto): Promise<Planilla>;
    removePlanilla(id: string): Promise<void>;
    findPlanillasByUserId(userId: string): Promise<Planilla[]>;
    saveConfirmedN8nPlanilla(createN8nPlanillaDto: import("../dto").CreateN8nPlanillaDto): Promise<Planilla>;
}
