import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { Location } from './location.entity';
import { Planilla } from './planilla.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  details: any;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @OneToMany(() => User, user => user.organization)
  users: User[];

  @OneToMany(() => Product, product => product.organization)
  products: Product[];

  @OneToMany(() => Category, category => category.organization)
  categories: Category[];

  @OneToMany(() => Location, location => location.organization)
  locations: Location[];

  @OneToMany(() => Planilla, planilla => planilla.organization)
  planillas: Planilla[];
}
