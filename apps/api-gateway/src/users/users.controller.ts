import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'shared/dtos/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseService } from 'shared/utils/response.service';
import { Response } from 'express';

@Controller('api/v1/users')
export class UsersController {
   constructor(
      @Inject('USERS_CLIENT') private userClient: ClientProxy,
      private readonly responseService: ResponseService,
   ) {}

   @Post()
  async create(@Res() res: Response,@Body() createUserDto: CreateUserDto) {
   const data = await this.userClient.send('users.create', createUserDto).toPromise();
   return this.responseService.success(res, data, 'Users inserted successfully');
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
      const data = await this.userClient.send('users.findAll', query).toPromise();
      return this.responseService.success(res, data, 'Users fetched successfully');
   } catch (error) {
      console.error('Error sending message to users microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Get(':id')
   async findOne(@Res() res: Response, @Param('id') id: string) {
   try {
      const data = await this.userClient.send('users.findOne', id).toPromise();
      return this.responseService.success(res, data, 'User fetched successfully');
   } catch (error) {
      console.error('Error sending message to users microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   try {
      updateUserDto.id = id;
      const data = await this.userClient.send('users.update', updateUserDto).toPromise();
      return this.responseService.success(res, data, 'User updated successfully');
   } catch (error) {
      console.error('Error sending message to users microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
   try {
      const data = await this.userClient.send('users.delete', id).toPromise();
      return this.responseService.success(res, null, 'User deleted successfully');
   } catch (error) {
      console.error('Error sending message to users microservice:', error);
      return this.responseService.failed(res, error, 500);
   }
  }
}
