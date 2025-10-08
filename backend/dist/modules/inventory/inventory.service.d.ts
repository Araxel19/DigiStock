import { InventoryService as BusinessInventoryService, ValidatedPlanillaDto } from 'digistock-business-logic';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto, CreateCategoryDto, UpdateCategoryDto } from './dto';
export declare class InventoryService {
    private readonly businessInventoryService;
    constructor(businessInventoryService: BusinessInventoryService);
    createProduct(createProductDto: CreateProductDto): Promise<import("digistock-business-logic").Product>;
    findAllProducts(organizationId: string, search?: string): Promise<import("digistock-business-logic").Product[]>;
    findProductById(id: string): Promise<import("digistock-business-logic").Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<import("digistock-business-logic").Product>;
    removeProduct(id: string): Promise<void>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<import("digistock-business-logic").Category>;
    findAllCategories(organizationId: string): Promise<import("digistock-business-logic").Category[]>;
    findCategoryById(id: string): Promise<import("digistock-business-logic").Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("digistock-business-logic").Category>;
    removeCategory(id: string): Promise<void>;
    createPlanilla(createPlanillaDto: CreatePlanillaDto): Promise<import("digistock-business-logic").Planilla>;
    findAllPlanillas(organizationId: string): Promise<any[]>;
    findPlanillasByUserId(userId: string): Promise<any[]>;
    findPlanillaById(id: string): Promise<import("digistock-business-logic").Planilla>;
    updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto): Promise<import("digistock-business-logic").Planilla>;
    removePlanilla(id: string): Promise<void>;
    saveValidatedPlanillaItems(id: string, validatedPlanillaDto: ValidatedPlanillaDto): Promise<import("digistock-business-logic").Planilla>;
    getDashboardStats(organizationId: string): Promise<{
        totalProducts: number;
        processedPlanillas: number;
        pendingPlanillas: number;
        ocrSuccessRate: number;
        recentActivity: {
            planillas: import("digistock-business-logic").Planilla[];
            products: import("digistock-business-logic").Product[];
        };
    }>;
    getUserDashboardStats(userId: string): Promise<{
        totalProducts: number;
        processedPlanillas: number;
        pendingPlanillas: number;
        ocrSuccessRate: number;
        recentActivity: {
            planillas: import("digistock-business-logic").Planilla[];
            products: any[];
        };
    }>;
}
