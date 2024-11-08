import { PartialType } from "@nestjs/mapped-types";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class UserDto {
   id: string;
   name: string;
   email: string;
   password: string;
}

const passwordRegEx =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {

@IsNotEmpty()
@MinLength(3, { message: 'Username must have atleast 3 characters.' })
@IsString({ message: 'Namae must be a string' })
name: string;

@IsNotEmpty()
@IsEmail(null, { message: 'Please provide valid Email.' })
email: string;

@IsNotEmpty()
@Matches(passwordRegEx, {
  message: `Password must contain Minimum 8 and maximum 20 characters, 
  at least one uppercase letter, 
  one lowercase letter, 
  one number and 
  one special character`,
})
password: string;

roles_id:string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
   id: string;
}