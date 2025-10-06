import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { User, UserRole } from '../entities';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { IUserRepository, IUserRoleRepository } from '../interfaces/repositories.interface';
import * as bcrypt from 'bcryptjs';
import { EntityManager, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserRoleRepository')
    private readonly userRoleRepository: IUserRoleRepository,
  ) {}

  private transformUser(user: User): any {
    if (!user) return null;
    const roles = user.userRoles ? user.userRoles.map(ur => ur.role.name) : [];
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizationId: user.organizationId,
      isSuperAdmin: user.isSuperAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      roles: roles,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, roleIds, ...userData } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.manager.transaction(async (manager: EntityManager) => {
      const newUser = manager.create(User, {
        ...userData,
        email,
        password: hashedPassword,
      });
      const savedUser = await manager.save(newUser);

      const userRoles = roleIds.map(roleId =>
        manager.create(UserRole, {
          userId: savedUser.id,
          roleId: roleId,
        }),
      );
      await manager.save(userRoles);

      return savedUser;
    });

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });
    return users.map(this.transformUser);
  }

  async findAllByOrganization(organizationId: string): Promise<User[]> {
    // HACK: Force file change for build cache
    const users = await this.userRepository.find({
      where: { organizationId },
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });
    return users.map(this.transformUser);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.transformUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['organization', 'userRoles', 'userRoles.role'],
    });
  }

  

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password, roleIds, ...userData } = updateUserDto;

    if (email) {
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    if (password) {
      updateUserDto.password = await bcrypt.hash(password, 10);
    }

    await this.userRepository.manager.transaction(async (manager: EntityManager) => {
        await manager.update(User, id, userData);

        if (roleIds) {
            await manager.delete(UserRole, { userId: id });
            const userRoles = roleIds.map(roleId =>
                manager.create(UserRole, {
                    userId: id,
                    roleId: roleId,
                }),
            );
            await manager.save(userRoles);
        }
    });

    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}