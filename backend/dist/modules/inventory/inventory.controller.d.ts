import { InventoryService } from './inventory.service';
import { CreateProductDto, UpdateProductDto, CreatePlanillaDto, UpdatePlanillaDto } from './dto';
import { ValidatedPlanillaDto } from 'digistock-business-logic';
import { ProgressGateway } from '../progress/progress.gateway';
export declare class InventoryController {
    private readonly inventoryService;
    private readonly progressGateway;
    constructor(inventoryService: InventoryService, progressGateway: ProgressGateway);
    getDashboardStats(req: any): Promise<{
        totalProducts: number;
        processedPlanillas: number;
        pendingPlanillas: number;
        ocrSuccessRate: number;
        recentActivity: {
            planillas: import("digistock-business-logic").Planilla[];
            products: import("digistock-business-logic").Product[];
        };
    }>;
    createProduct(createProductDto: CreateProductDto, req: any): Promise<import("digistock-business-logic").Product>;
    findAllProducts(search: string, req: any): Promise<import("digistock-business-logic").Product[]>;
    findProduct(id: string): Promise<import("digistock-business-logic").Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, req: any): Promise<import("digistock-business-logic").Product>;
    removeProduct(id: string): Promise<void>;
    createPlanilla(createPlanillaDto: CreatePlanillaDto, req: any): Promise<import("digistock-business-logic").Planilla>;
    findAllPlanillas(req: any): Promise<any[]>;
    findPlanilla(id: string): Promise<import("digistock-business-logic").Planilla>;
    updatePlanilla(id: string, updatePlanillaDto: UpdatePlanillaDto): Promise<import("digistock-business-logic").Planilla>;
    removePlanilla(id: string): Promise<void>;
    confirmPlanillaData(id: string, validatedPlanillaDto: ValidatedPlanillaDto): Promise<import("digistock-business-logic").Planilla>;
    notifyProgress(planillaId: string, status: string, message: string): Promise<{
        success: boolean;
        message: string;
        data: {
            planillaId: string;
            status: string;
            message: string;
        };
    }>;
}
