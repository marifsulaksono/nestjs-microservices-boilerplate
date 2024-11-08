import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../../../shared/dtos/role.dto';
import { UpdateRoleDto } from '../../../shared/dtos/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    return this.roleRepository.save(createRoleDto);
  }

  async findAll(filter: any = {}, page: number, limit: number){

    const queryBuilder = this.roleRepository.createQueryBuilder('role');

    if (filter.name) {
      queryBuilder.where('role.name LIKE :name', { name: `%${filter.name}%` });
    }

    const [roles, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

      const links = [];
      const totalPages = Math.ceil(total / limit);
    
      for (let i = 1; i <= totalPages; i++) {
        links.push(`http://localhost:3000/api/v1/roles?sort=role_auth.id%20DESC&page=${i}`);
      }
    return {
      list: roles,
      meta: {
        links: links,
        total: total
      }
    };
  }

  findOne(id: string): Promise<Roles> {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      return null;
    }
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOneBy({ id });
  }

  delete(id: string): Promise<{ affected?: number }> {
    return this.roleRepository.softDelete(id)
  }
}
