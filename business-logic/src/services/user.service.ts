import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

export interface IUserRepository {
  create(entity: Partial<User>): User;
  save(entity: User): Promise<User>;
  find(options?: any): Promise<User[]>;
  findOne(options: any): Promise<User | null>;
  update(criteria: any, partialEntity: any): Promise<any>;
  delete(criteria: any): Promise<any>;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear la contraseña antes de crear el usuario
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    
    // No devolver la contraseña en la respuesta
    delete savedUser.password;
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      // Corregido: Se añaden todos los campos necesarios que no son sensibles
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      // Corregido: Se añade 'updatedAt' a la selección
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    // Este método sí debe poder seleccionar la contraseña para la lógica de login
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * CORREGIDO: Método de actualización más robusto.
   * 1. Valida si el email ya está en uso por OTRO usuario.
   * 2. Hashea la nueva contraseña si se proporciona.
   * 3. Verifica que la operación de actualización realmente afectó a un registro.
   * 4. Devuelve el usuario actualizado sin la contraseña.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Si se está actualizando el email, verificar que no exista en otro usuario
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('El email ya está en uso por otro usuario');
      }
    }

    // Si se está enviando una nueva contraseña, hashearla
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    // Ejecutar la actualización
    const result = await this.userRepository.update(id, updateUserDto);

    // Si ninguna fila fue afectada, significa que el usuario no se encontró
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
    }

    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
