import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../../shared/dtos/user.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(request: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = request.email;
    user.name = request.name;
    user.password = await bcrypt.hash(request.password, 10);
    return this.userRepository.save(user);
  }


  async findAll(filter: any = {}, page: number, limit: number) {
    console.log("processing");
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect('user.role', 'roles');
    if (filter.name) {
      queryBuilder.where('user.name LIKE :name', { name: `%${filter.name}%` });
    }

    if (filter.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${filter.email}%` });
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

      const links = [];
      const totalPages = Math.ceil(total / limit);
    
      for (let i = 1; i <= totalPages; i++) {
        links.push(`http://localhost:3000/api/v1/users?sort=user_auth.id%20DESC&page=${i}`);
      }
    return {
      list: users,
      meta: {
        links: links,
        total: total
      }
    };
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, request: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.email = request.email;
    user.name = request.name;
    user.password = await bcrypt.hash(request.password, 10);
    user.id = id;
    user.roles_id = request.roles_id;
    return this.userRepository.save(user);
  }

  delete(id: string): Promise<{ affected?: number }> {
    return this.userRepository.softDelete(id)
  }
}
