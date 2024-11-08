import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly invalidatedTokens: string[] = [];

  constructor(
   @Inject('USERS_CLIENT') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
   const user = await this.userClient.send('users.findOneByEmail', email).toPromise();
   if (!user) {
     throw new UnauthorizedException('Email or password is incorrect.');
   }

   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
     throw new UnauthorizedException('Email or password is incorrect.');
   }

   const payload = { sub: user.id, email: user.email };

   try {
     // Attempt to sign the payload and create the JWT token
     const access_token = await this.jwtService.signAsync(payload);
     return { access_token };
   } catch (error) {
     // Catch any errors thrown by the signAsync method
     console.error('Error signing JWT:', error);
     throw new UnauthorizedException('Failed to generate access token.');
   }
 }

 async logout(token: string): Promise<void> {
   this.invalidatedTokens.push(token);
 }

 async isTokenInvalidated(token: string): Promise<boolean> {
   return this.invalidatedTokens.includes(token);
 }
}
