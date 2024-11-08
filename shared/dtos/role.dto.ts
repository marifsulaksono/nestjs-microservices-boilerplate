import { PartialType } from "@nestjs/mapped-types";

export class RoleDto {
   id: number;
   name: string;
}

export class CreateRoleDto {}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
   id: string;
}
 