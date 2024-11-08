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
  create(@Body() createUserDto: CreateUserDto) {
   return this.userClient.send('users.create', createUserDto);
  }

  @Get()
  async findAll(@Res() res: Response, @Query() query: any) {
   const payload = {
      username: query.username,
      email: query.email,
      page : query.number || 1,
      itemPerPage : query.itemPerPage || 10,
    };
    const data = await this.userClient.send('users.findAll', query).toPromise();
   console.log("data users: ", data);
   return this.responseService.success(res, data, 'Users fetched successfully');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
   return this.userClient.send('users.findOne', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   return this.userClient.send('users.update', updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   return this.userClient.send('users.delete', id);
  }
}
