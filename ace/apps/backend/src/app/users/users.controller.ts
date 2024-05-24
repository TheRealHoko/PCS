import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RoleEnum } from '@ace/shared';
import { UpdateUserDto } from '@ace/shared';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @Post()
  @Roles(RoleEnum.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  findAll() {
    return this.usersService.findAll({
      relations: ['services']

    });
  }

  @Get(':id')
  // @Roles(RoleEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  // @Roles(RoleEnum.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
