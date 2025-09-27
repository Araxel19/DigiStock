import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' }) // Opciones dentro de @PrimaryColumn
  userId: string;

  @PrimaryColumn({ type: 'integer', name: 'role_id' }) // Opciones dentro de @PrimaryColumn
  roleId: number;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}