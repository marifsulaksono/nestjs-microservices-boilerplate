import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RoleDto {
   id: number;
   name: string;
   access: string;
}

export class CreateRoleDto {
   @IsNotEmpty()
   @MinLength(1, { message: 'Name must have atleast 1 characters.' })
   @IsString({ message: 'Name must be a string' })
   name: string;

   @IsNotEmpty()
   @IsString({ message: 'Access must be a string' })
   access: string | object;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
   id: string;
}
 