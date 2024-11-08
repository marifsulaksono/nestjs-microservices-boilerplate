import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'shared/utils/response.service';
import { SignInDto } from 'shared/dtos/auth.dto';
import { Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly responseService: ResponseService,
    ) {}
  
    @Post('login')
    async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
      try {
        const { access_token } = await this.authService.signIn(
          signInDto.email,
          signInDto.password,
        );
        return this.responseService.success(res, { access_token }, 'Login successful');
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          return this.responseService.failed(res, error.message, 401);
        }
        return this.responseService.failed(res, 'Internal Server Error', 500);
      }
    }
}
