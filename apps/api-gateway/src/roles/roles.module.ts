import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResponseService } from 'shared/utils/response.service';

@Module({
  imports: [
      ClientsModule.register([
          {
              name: 'ROLES_CLIENT',
              transport: Transport.TCP,
              options: {
                  port: parseInt(process.env.APP_ROLE_PORT ?? '3002', 10)
              }
          }
      ])
  ],
  providers: [
    RolesService,
    ResponseService,
  ],
  controllers: [RolesController]
})
export class RolesModule {}
