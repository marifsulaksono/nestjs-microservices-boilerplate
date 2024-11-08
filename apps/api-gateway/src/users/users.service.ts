import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
   constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}
   findOneByEmail(email: string) {
      return this.usersClient.send('users.findOneByEmail', email);
   }
}
