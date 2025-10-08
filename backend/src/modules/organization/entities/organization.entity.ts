import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  details?: any; // Puede contener dirección u otros datos

  @OneToMany(() => Location, (location) => location.organization)
  locations: Location[];
}
