import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { Property } from './entities/property.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PropertyUnavailability } from './entities/property-unavailability.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(PropertyUnavailability)
    private readonly propertyAvailabilityRepository: Repository<PropertyUnavailability>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, lessor: User): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    property.lessor = lessor;
    const savedProperty = await this.propertyRepository.save(property);
    return savedProperty;
  }

  findAll(options?: FindManyOptions<Property>): Promise<Property[]> {
    return this.propertyRepository.find(options);
  }

  async findOne(
    where: FindOptionsWhere<Property>
  ): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({ where });
    if (!property) {
      throw new NotFoundException();
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto
  ): Promise<Property> {
    const property = await this.propertyRepository.preload({
      id: id,
      ...updatePropertyDto,
    });
    if (!property) {
      throw new NotFoundException();
    }
    return this.propertyRepository.save(property);
  }

  async remove(where: FindOptionsWhere<Property>): Promise<void> {
    const property = await this.propertyRepository.findOne({ where });
    if (!property) {
      throw new NotFoundException();
    }
    await this.propertyRepository.remove(property);
  }
}
