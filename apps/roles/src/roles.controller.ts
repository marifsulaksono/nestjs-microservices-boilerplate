import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from 'shared/dtos/role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('roles.create')
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('roles.findAll')
  findAll(@Payload() query: any) {
    const filter = {
      name: query.name,
    };
    const page :number =  query.number || 1;
    const itemPerPage :number =  query.itemPerPage || 10;
    return this.rolesService.findAll(filter, page, itemPerPage);
  }

  @MessagePattern('roles.findOne')
  findOne(@Payload() id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern('roles.update')
  update(@Payload() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern('roles.delete')
  delete(@Payload() id: string) {
    return this.rolesService.delete(id);
  }
}
