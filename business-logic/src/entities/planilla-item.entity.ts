import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Planilla } from './planilla.entity';
import { Product } from './product.entity';

@Entity('planilla_items')
export class PlanillaItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'planilla_id' })
  planillaId: string;

  @ManyToOne(() => Planilla, planilla => planilla.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'planilla_id' })
  planilla: Planilla;

  @Column({ name: 'detected_code', type: 'varchar', length: 100, nullable: true })
  detectedCode: string;

  @Column({ name: 'detected_name', type: 'varchar', length: 255, nullable: true })
  detectedName: string;

  @Column({ name: 'detected_quantity', type: 'integer', nullable: true })
  detectedQuantity: number;

  @Column({ type: 'uuid', name: 'corrected_product_id', nullable: true })
  correctedProductId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'corrected_product_id' })
  correctedProduct: Product;

  @Column({ name: 'corrected_quantity', type: 'integer', nullable: true })
  correctedQuantity: number;

  @Column({
    name: 'match_status',
    type: 'varchar',
    length: 50,
    default: 'unmatched',
  })
  matchStatus: 'matched' | 'unmatched' | 'manual_override' | 'ambiguous';

  @Column({ name: 'confidence_score', type: 'real', nullable: true })
  confidenceScore: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
