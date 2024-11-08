import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ResponseService } from 'shared/utils/response.service';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from 'shared/modules/shared.module';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: parseInt(process.env.APP_USER_PORT ?? '3001', 10),
        },
      },
    ]),
  ],
  providers: [
    UsersService,
    ResponseService,
    AuthService,
    {
      provide: 'USERS_CLIENT', // Explicitly register USERS_CLIENT as a provider
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: parseInt(process.env.APP_USER_PORT ?? '3001', 10),
          },
        });
      },
    },
  ],
  controllers: [UsersController],
  exports: ['USERS_CLIENT', AuthService],
})
export class UsersModule implements OnModuleInit {
  onModuleInit() {
    const port = parseInt(process.env.APP_USER_PORT ?? '3001', 10);
    console.log(`UsersModule initialized with USERS_CLIENT on localhost:${port}`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('api/v1/user*');
  }
}

// @Module({
//   imports: [
//       ClientsModule.register([
//           {
//               name: 'USERS_CLIENT',
//               transport: Transport.TCP,
//               options: {
//                 host: 'localhost',
//                 port: parseInt(process.env.APP_USER_PORT ?? '3001', 10)
//               }
//           }
//       ])
//   ],
  // providers: [
  //   UsersService,
  //   ResponseService,
  // ],
//   controllers: [UsersController]
// })
// // export class UsersModule {}
// export class UsersModule implements OnModuleInit {
//     onModuleInit() {
//       const port = parseInt(process.env.APP_USER_PORT ?? '3001', 10);
//       console.log(`UsersModule initialized with USERS_CLIENT on localhost:${port}`);
//     }

//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(JwtMiddleware).forRoutes('api/v1/user*'); // Apply to all routes
//       }
//   }