
import { IsArray, IsString, IsUUID } from 'class-validator';

export class OcrResultDto {
    @IsUUID()
    planillaId: string;

    @IsArray()
    inventario: any[];
}
