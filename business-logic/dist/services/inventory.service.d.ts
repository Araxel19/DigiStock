import { Product, Planilla } from '../entities';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto, ValidatedPlanillaDto } from '../dto';
import { IProductRepository, IPlanillaRepository, IPlanillaItemRepository, ICategoryRepository, ILocationRepository, IInventorySnapshotRepository } from '../interfaces/repositories.interface';
export declare class InventoryService {
    private readonly productRepository;
    private readonly planillaRepository;
    private readonly planillaItemRepository;
    private readonly categoryRepository;
    private readonly locationRepository;
    private readonly inventorySnapshotRepository;
    constructor(productRepository: IProductRepository, planillaRepository: IPlanillaRepository, planillaItemRepository: IPlanillaItemRepository, categoryRepository: ICategoryRepository, locationRepository: ILocationRepository, inventorySnapshotRepository: IInventorySnapshotRepository);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAllProducts(organizationId: string, search?: string): Promise<Product[]>;
    findProductById(id: string): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    removeProduct(id: string): Promise<void>;
    createPlanilla(createPlanillaDto: CreatePlanillaDto): Promise<Planilla>;
    findAllPlanillas(organizationId: string): Promise<any[]>;
    findPlanillasByUserId(userId: string): Promise<Planilla[]>;
    findPlanillaById(id: string): Promise<Planilla>;
    updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto): Promise<Planilla>;
    removePlanilla(id: string): Promise<void>;
    saveValidatedPlanillaItems(planillaId: string, validatedPlanillaDto: ValidatedPlanillaDto): Promise<Planilla>;
    getDashboardStats(organizationId: string): Promise<{
        totalProducts: number;
        processedPlanillas: number;
        pendingPlanillas: number;
        ocrSuccessRate: number;
        recentActivity: {
            planillas: Planilla[];
            products: Product[];
        };
    }>;
}
