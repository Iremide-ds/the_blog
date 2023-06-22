import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find({ withDeleted: true });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { email: email },
    });
  }

  async findByUsername(userName: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { username: userName },
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const update = await this.usersRepository.update(id, updateUserDto);
      if (update.affected > 0) {
        return 'success';
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotImplementedException();
    }
  }

  async disableUser(id: number) {
    try {
      await this.usersRepository.update(id, { isActive: false });
      const update = await this.usersRepository.softDelete(id);
      if (update.affected > 0) {
        return 'success';
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new NotImplementedException();
    }
  }
}
