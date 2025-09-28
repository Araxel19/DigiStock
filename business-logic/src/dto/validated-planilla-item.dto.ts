
import { IsArray, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class ValidatedPlanillaItem {
    @IsString()
    @IsOptional()
    detectedCode?: string;

    @IsString()
    @IsOptional()
    detectedName?: string;

    @IsNumber()
    @IsOptional()
    detectedQuantity?: number;

    @IsUUID()
    @IsOptional()
    correctedProductId?: string;

    @IsNumber()
    @IsOptional()
    correctedQuantity?: number;

    @IsString()
    matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous';

    @IsNumber()
    @IsOptional()
    confidenceScore?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class ValidatedPlanillaDto {
    @IsArray()
    @Type(() => ValidatedPlanillaItem)
    items: ValidatedPlanillaItem[];
}
