import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResponseService } from 'shared/utils/response.service';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { SharedModule } from 'shared/modules/shared.module';
import { AuthModule } from '../auth/auth.module';

const ROLES_CLIENT_NAME = 'ROLES_CLIENT';
@Module({
  imports: [
      SharedModule,
      AuthModule,
      ClientsModule.register([
          {
              name: ROLES_CLIENT_NAME,
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
export class RolesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('api/v1/role*');
  }
}
