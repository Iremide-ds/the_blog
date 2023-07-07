import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEnum(Role)
  role: Role = Role.User;
}
