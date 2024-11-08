import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RolesService {
  constructor(@Inject('ROLES_CLIENT') private rolesClient: ClientProxy) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesClient.send('roles.create', createRoleDto);
  }

  findAll() {
    return this.rolesClient.send('roles.findAll', {});
  }

  findOne(id: number) {
    return this.rolesClient.send('roles.findOne', id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesClient.send('roles.update', { id, updateRoleDto });
  }

  delete(id: number) {
    return this.rolesClient.send('roles.delete', id);
  }
}
