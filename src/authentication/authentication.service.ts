import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignInDTO } from './dto/sign_in.dto';
import { PostgresErrorCode } from 'src/resources/postgres-errors.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signIn(userDetails: SignInDTO): Promise<any> {
    const { username, password, email } = userDetails;

    try {
      const user =
        username == null
          ? await this.usersService.findByEmail(email)
          : await this.usersService.findByUsername(username);

      if (user === null) {
        throw new UnauthorizedException();
      }

      await this.verifyPassword(password, user.password);

      const payload = { sub: user.id, useremail: user.email, username: user.username, role: user.role };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      await bcrypt.genSalt(10),
    );
    try {
      const user =
        (await this.usersService.findByEmail(createUserDto.email)) ??
        (await this.usersService.findByUsername(createUserDto.username));
      if (user !== null) {
        return { success: false, reason: 'username exists' };
      }
      const createdUser = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const payload = {
        sub: createdUser.id,
        useremail: createdUser.email,
        username: createdUser.username,
        role: createdUser.role,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Could not register!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
