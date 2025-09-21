import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PlanillaStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  ERROR = 'error',
}

@Entity('planillas')
export class Planilla {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column({
    type: 'enum',
    enum: PlanillaStatus,
    default: PlanillaStatus.PENDING,
  })
  status: PlanillaStatus;

  @Column('jsonb', { nullable: true })
  ocrData: any;

  @Column('jsonb', { nullable: true })
  extractedProducts: any;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ nullable: true })
  processedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
