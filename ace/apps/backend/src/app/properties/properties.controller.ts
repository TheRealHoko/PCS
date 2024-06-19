import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto, RoleEnum } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { UsersService } from '../users/users.service';

@Controller('properties')
export class PropertiesController {

  logger = new Logger(PropertiesController.name);

  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    const lessor = await this.usersService.findOne({
      where : { id: createPropertyDto.lessorId }
    });
    const lessorRoles = lessor.roles.map(role => role.name);
    if (!lessorRoles.includes(RoleEnum.LESSOR)) {
      this.logger.log(`Adding Renter role to lessor ${lessor.email}`);
      await this.usersService.update(lessor.id, {roles: [...lessorRoles, RoleEnum.LESSOR]});
    }
    return this.propertiesService.create(createPropertyDto, lessor);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove({ id: +id });
  }
}
