import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';
import { PlanillaItem } from './planilla-item.entity';

@Entity('planillas')
export class Planilla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.planillas)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', name: 'organization_id' })
  organizationId: string;

  @ManyToOne(() => Organization, organization => organization.planillas)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string;

  @Column({ name: 'file_path', type: 'varchar', length: 500 })
  filePath: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'recibido',
  })
  status: 'recibido' | 'en_ocr' | 'validacion_pendiente' | 'procesado' | 'error';

  @Column({ name: 'raw_ocr_data', type: 'jsonb', nullable: true })
  rawOcrData: any;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string;

  @Column({ name: 'uploaded_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  uploadedAt: Date;

  @Column({ name: 'processing_started_at', type: 'timestamptz', nullable: true })
  processingStartedAt: Date;

  @Column({ name: 'validated_by_user_id', type: 'uuid', nullable: true })
  validatedByUserId: string;

  @ManyToOne(() => User, user => user.validatedPlanillas)
  @JoinColumn({ name: 'validated_by_user_id' })
  validatedByUser: User;

  @Column({ name: 'validated_at', type: 'timestamptz', nullable: true })
  validatedAt: Date;

  @Column({ name: 'processed_at', type: 'timestamptz', nullable: true })
  processedAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @OneToMany(() => PlanillaItem, item => item.planilla)
  items: PlanillaItem[];
}