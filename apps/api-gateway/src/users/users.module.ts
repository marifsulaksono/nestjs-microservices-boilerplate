import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResponseService } from 'shared/utils/response.service';

@Module({
  imports: [
      ClientsModule.register([
          {
              name: 'USERS_CLIENT',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: parseInt(process.env.APP_USER_PORT ?? '3001', 10)
              }
          }
      ])
  ],
  providers: [
    UsersService,
    ResponseService,
  ],
  controllers: [UsersController]
})
export class UsersModule {}
