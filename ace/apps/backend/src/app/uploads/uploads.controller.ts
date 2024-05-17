import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from '@ace/shared';
import { UpdateUploadDto } from '@ace/shared';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { PropertiesService } from '../properties/properties.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly propertiesService: PropertiesService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Express.Multer.File[], @Body() createUploadDto: CreateUploadDto) {
    const property = await this.propertiesService.findOne({id: createUploadDto.propertyId});
    return await this.uploadsService.bulkCreate(files, property);
  }

  @Post('property-images')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadPropertyImages(@UploadedFiles() files: Express.Multer.File[], @Body() createUploadDto: CreateUploadDto) {
    const property = await this.propertiesService.findOne({id: createUploadDto.propertyId});
    return await this.uploadsService.bulkCreate(files, property);
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
}
