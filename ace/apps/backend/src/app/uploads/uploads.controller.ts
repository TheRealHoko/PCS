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
  UploadedFile,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateProfileUploadDto, CreatePropertyUploadDto } from '@ace/shared';
import { UpdateUploadDto } from '@ace/shared';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { PropertiesService } from '../properties/properties.service';
import { UsersService } from '../users/users.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService
  ) {}

  @Post('property-images')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadPropertyImages(@UploadedFiles() files: Express.Multer.File[], @Body() propertyImageDto: CreatePropertyUploadDto) {
    const property = await this.propertiesService.findOne({id: propertyImageDto.propertyId});
    return await this.uploadsService.saveFilesLinkedToProperty(files, property);
  }

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Body() profileImageDto: CreateProfileUploadDto) {
    const user = await this.usersService.findOne({where: {id: profileImageDto.userId}});
    return await this.uploadsService.saveFileLinkedToUser(file, user);
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
