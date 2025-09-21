// Entities
export { User } from './entities/user.entity';
export { Product } from './entities/product.entity';
export { Planilla } from './entities/planilla.entity';

// DTOs
export { CreateUserDto } from './dto/create-user.dto';
export { UpdateUserDto } from './dto/update-user.dto';
export { LoginDto } from './dto/login.dto';
export { CreateProductDto } from './dto/create-product.dto';
export { CreatePlanillaDto } from './dto/create-planilla.dto';
export { OcrRequestDto } from './dto/ocr-request.dto';

// Services (solo lo que haga falta y sin duplicar interfaces)
export { UserService } from './services/user.service';
export { InventoryService } from './services/inventory.service';
export { AuthService } from './services/auth.service';
export { OcrService } from './services/ocr.service';

// Interfaces
export {
  IUserRepository,
  IProductRepository,
  IPlanillaRepository,
  IJwtService,
  IN8nConfig,
} from './interfaces/repositories.interface';
