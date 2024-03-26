import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.name = createRoleDto.name;
    
    await this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOneBy({ id });

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
