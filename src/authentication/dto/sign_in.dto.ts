import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  username: string;
}
