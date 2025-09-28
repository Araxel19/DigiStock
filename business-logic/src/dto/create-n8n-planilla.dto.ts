// business-logic/src/dto/create-n8n-planilla.dto.ts

import { IsArray, IsUUID } from 'class-validator';

export class CreateN8nPlanillaDto {
  @IsUUID()
  planillaId: string;

  @IsArray()
  inventario: any[];
}