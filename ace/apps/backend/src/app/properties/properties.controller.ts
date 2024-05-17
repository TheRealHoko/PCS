import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { UsersService } from '../users/users.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    const lessor = await this.usersService.findOne({ id: createPropertyDto.lessorId });
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
