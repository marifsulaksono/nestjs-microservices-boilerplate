import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'shared/modules/shared.module';
import { AuthController } from './auth.controller';
import { ResponseService } from 'shared/utils/response.service';

@Module({
   imports: [
     SharedModule,  // Use SharedModule for JwtService
     UsersModule,
   ],
   providers: [
      AuthService,
      ResponseService,
   ],
   exports: [AuthService],
   controllers: [AuthController],
 })
 export class AuthModule {}
 