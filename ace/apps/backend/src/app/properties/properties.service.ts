import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { Property } from './entities/property.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PropertyAvailability } from './entities/property-availability.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(PropertyAvailability)
    private readonly propertyAvailabilityRepository: Repository<PropertyAvailability>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, lessor: User): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
    property.lessor = lessor;
    const savedProperty = await this.propertyRepository.save(property);

    const availabilities = createPropertyDto.availabilities.map((availability) => {
      const propertyAvailability = this.propertyAvailabilityRepository.create(availability);
      propertyAvailability.property = savedProperty;
      return propertyAvailability;
    });
    await this.propertyAvailabilityRepository.save(availabilities);
    
    return savedProperty;
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
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
