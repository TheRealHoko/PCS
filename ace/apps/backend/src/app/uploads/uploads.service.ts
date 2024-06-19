import { Injectable } from '@nestjs/common';
import { UpdateUploadDto } from '@ace/shared';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>
  ) {}

  async saveFilesLinkedToProperty(files: Express.Multer.File[], linkedProperty: Property) {
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

  async saveFileLinkedToUser(file: Express.Multer.File, linkedUser: User) {
    const upload = this.uploadRepository.create();
    upload.path = file.path;
    upload.user = linkedUser;
    await this.uploadRepository.save(upload);
    return { message: `Uploaded image linked to user #${linkedUser.id}`};
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
