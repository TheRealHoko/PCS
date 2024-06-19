import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyUploadDto } from './create-property-upload.dto';

export class UpdateUploadDto extends PartialType(CreatePropertyUploadDto) {}
