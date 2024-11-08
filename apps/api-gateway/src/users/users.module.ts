import { Module, OnModuleInit } from '@nestjs/common';
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
// export class UsersModule {}
export class UsersModule implements OnModuleInit {
    onModuleInit() {
      const port = parseInt(process.env.APP_USER_PORT ?? '3001', 10);
      console.log(`UsersModule initialized with USERS_CLIENT on localhost:${port}`);
    }
  }