import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Properties } from './entities/properties.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Properties)
    private readonly propertyRepository: Repository<Properties>
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Properties> {
    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);  
  }

  findAll(): Promise<Properties[]> {
    return this.propertyRepository.find();  
  }

  async findOne(where: FindOptionsWhere<Properties>): Promise<Properties | null> {
    const property = await this.propertyRepository.findOne({ where });
    if (!property){
      throw new NotFoundException();
    }
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Properties> {
    const property = await this.propertyRepository.preload({
      id: id,
      ...updatePropertyDto
    });
    if (!property) {
      throw new NotFoundException();
    }
    return this.propertyRepository.save(property);  
  }

  async remove(where: FindOptionsWhere<Properties>): Promise<void> {
    const property = await this.propertyRepository.findOne({ where });
    if (!property){
      throw new NotFoundException();
    }  
    await this.propertyRepository.remove(property);
  }
}
