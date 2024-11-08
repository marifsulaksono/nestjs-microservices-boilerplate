import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query, Inject } from '@nestjs/common';
import { Response } from 'express';
import { ResponseService } from 'shared/utils/response.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoleDto, UpdateRoleDto } from 'shared/dtos/role.dto';

@Controller('api/v1/roles')
export class RolesController {
  constructor(
    @Inject('ROLES_CLIENT') private roleClient: ClientProxy,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() createRoleDto: CreateRoleDto) {
    try {
      const data = await this.roleClient.send('roles.create', createRoleDto).toPromise();
      return this.responseService.success(res, data, 'Roles inserted successfully');
    } catch (error) {
      console.error('Error sending message to roles microservice:', error);
      return this.responseService.failed(res, error, 500);
    }
  }

  @Get()
  async findAll(@Res() res: Response, @Query() query: any) {
    const payload = {
      username: query.username,
      email: query.email,
      page : query.number || 1,
      itemPerPage : query.itemPerPage || 10,
   };
   try {
      const data = await this.roleClient.send('roles.findAll', query).toPromise();
      return this.responseService.success(res, data, 'roles fetched successfully');
   } catch (error) {
      console.error('Error sending message to roles microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.roleClient.send('roles.findOne', id).toPromise();
      return this.responseService.success(res, data, 'Role fetched successfully');
   } catch (error) {
      console.error('Error sending message to roles microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      updateRoleDto.id = id;
      const data = await this.roleClient.send('roles.update', updateRoleDto).toPromise();
      return this.responseService.success(res, data, 'Role updated successfully');
   } catch (error) {
      console.error('Error sending message to roles microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.roleClient.send('roles.delete', id).toPromise();
      return this.responseService.success(res, null, 'Role deleted successfully');
   } catch (error) {
      console.error('Error sending message to roles microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }
}
