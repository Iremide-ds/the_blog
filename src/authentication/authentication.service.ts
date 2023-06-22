import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignInDTO } from './dto/sign_in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDetails: SignInDTO): Promise<any> {
    const { username, password, email } = userDetails;

    const user =
      username == null
        ? await this.usersService.findByEmail(email)
        : await this.usersService.findByUsername(username);

    if (user === null) {
      throw new UnauthorizedException();
    } else if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, useremail: user.email, roles: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user =
      (await this.usersService.findByEmail(createUserDto.email)) ??
      (await this.usersService.findByUsername(createUserDto.username));
    if (user !== null) {
      return { success: false, reason: 'username exists' };
    }
    const createdUser = await this.usersService.create(createUserDto);
    const payload = {
      sub: createdUser.id,
      useremail: createdUser.email,
      username: createdUser.username,
      roles: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
