import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Planilla } from './planilla.entity';
import { Organization } from './organization.entity';

@Entity('inventory_snapshots')
export class InventorySnapshot {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ type: 'uuid', name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'uuid', name: 'planilla_id' })
  planillaId: string;

  @ManyToOne(() => Planilla)
  @JoinColumn({ name: 'planilla_id' })
  planilla: Planilla;

  @Column({ name: 'stock_quantity', type: 'integer' })
  stockQuantity: number;

  @Column({ name: 'snapshot_date', type: 'timestamptz' })
  snapshotDate: Date;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
