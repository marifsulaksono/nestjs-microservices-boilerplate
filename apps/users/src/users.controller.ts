import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from 'shared/dtos/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  create(@Payload() createRoleDto: CreateUserDto) {
    const data = this.usersService.create(createRoleDto);
    return data;
  }

  @MessagePattern('users.findAll')
  findAll(@Payload() query: any) {
    const filter = {
      username: query.username,
      email: query.email
    };
    const page :number =  query.number || 1;
    const itemPerPage :number =  query.itemPerPage || 10;

    return this.usersService.findAll(filter, page, itemPerPage);
  }

  @MessagePattern('users.findOne')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('users.update')
  update(@Payload() updateRoleDto: UpdateUserDto) {
    return this.usersService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern('users.delete')
  delete(@Payload() id: string) {
    return this.usersService.delete(id);
  }
}
