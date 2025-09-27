import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // 'org_admin', 'supervisor', 'data_entry'

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}
