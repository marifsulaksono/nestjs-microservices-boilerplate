import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query, Inject } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Response } from 'express';
import { ResponseService } from 'shared/utils/response.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api/v1/roles')
export class RolesController {
  constructor(
    @Inject('ROLES_CLIENT') private roleClient: ClientProxy,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleClient.send('roles.create', createRoleDto);
  }

  @Get()
  async findAll(@Res() res: Response, @Query() query: any) {
    const payload = {
       email: query.email,
       page : query.number || 1,
       itemPerPage : query.itemPerPage || 10,
     };
     const data = await this.roleClient.send('roles.findAll', query);
     this.responseService.success(res, data, 'Roles fetched successfully');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleClient.send('roles.findOne', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleClient.send('roles.update', updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleClient.send('roles.delete', id);
  }
}
