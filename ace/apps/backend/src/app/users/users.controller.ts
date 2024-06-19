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
  Query,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RoleEnum } from '@ace/shared';
import { UpdateUserDto } from '@ace/shared';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { PropertiesService } from '../properties/properties.service';
import { IsNumber, isNumber } from 'class-validator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly propertiesService: PropertiesService
  ) {}

  private readonly logger = new Logger(UsersController.name);

  @Post()
  @Roles(RoleEnum.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  findAll(@Query('role') role?: RoleEnum) {
    const options: any = {
      relations: ['services'],
    };

    if (role) {
      options.where = { 
        roles: { 
          name: role
        }
      };
    }

    return this.usersService.findAll(options);
  }
  
  @Get('my-properties/:id')
  @Roles(RoleEnum.LESSOR)
  async findMyProperty(@Req() req: any, @Param('id') id: string) {
    const property = await this.propertiesService.findOne({
      id: +id,
      lessor: {
        id: req['user'].sub,
      },
    });
    return property
  }

  @Get('my-properties')
  @Roles(RoleEnum.LESSOR)
  async findMyProperties(@Req() req: any) {
    this.logger.log(`Finding properties for user ${req['user'].sub}`);
    return this.propertiesService.findAll({
      where: {
        lessor: {
          id: req['user'].sub,
        },
      },
    });
  }
  
  @Delete('my-properties/:id')
  @Roles(RoleEnum.LESSOR)
  async deleteMyProperty(@Req() req: any, @Param('id') id: string) {
    const property = await this.propertiesService.findOne({
      id: +id,
      lessor: {
          id: req['user'].sub,
        },
    });

    if (!property) {
      throw new NotFoundException("Property not found");
    }

    return this.propertiesService.remove({
      id: +id,
    });
  }

  @Get(':id')
  // @Roles(RoleEnum.ADMIN)
  findOne(@Param('id') id: number) {
    this.logger.debug(`Finding user ${id}`);

    return this.usersService.findOne({
      where: { id: id },
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
