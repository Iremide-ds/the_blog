import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role_guard.decorator';
import { Role } from 'src/enums/roles.enum';
import { FindOneParams } from 'src/resources/findOneParam.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([Role.Admin, Role.User])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile')
  findProfile(@Req() request: Request) {
    return this.userService.findProfile(request['user'].sub);
  }

  @Get(':id')
  findOne(@Param() id: FindOneParams) {
    return this.userService.findOne(id.id);
  }

  @Patch(':id')
  update(@Param() id: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() id: FindOneParams) {
    return this.userService.disableUser(id.id);
  }
}
