import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Property } from '../properties/entities/property.entity';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>
  ) {}

  async create(files: Express.Multer.File[], linkedProperty: Property) {
    console.log(files);
    const uploads = [];
    files.forEach(file => {
      const upload = this.uploadRepository.create();
      upload.path = file.path;
      upload.property = linkedProperty;
      uploads.push(upload);
    });
    await this.uploadRepository.save(uploads);
    return { message: `Uploaded ${uploads.length} files linked to property #${linkedProperty.id}`};
  }

  findAll(): Promise<Upload[]> {
    return this.uploadRepository.find();
  }

  findOne(id: number): Promise<Upload> {
    return this.uploadRepository.findOne({where: {id}});
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    this.uploadRepository.delete(id);
  }
}
