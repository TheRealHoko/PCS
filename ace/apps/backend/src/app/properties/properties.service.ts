import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryCheckDto, CreatePropertyDto, CreateReviewDTO } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { Property } from './entities/property.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { InventoryCheck } from './entities/inventory-check.entity';
import { Review } from '../services/entities/review.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(InventoryCheck)
    private readonly inventoryCheckRepository: Repository<InventoryCheck>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
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

  async createInventoryCheck(propertyId: number, createInventoryCheckDto: CreateInventoryCheckDto) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId }
    });

    if (!property) {
      throw new NotFoundException();
    }

    const inventoryCheck = this.inventoryCheckRepository.create(createInventoryCheckDto);
    property.inventoryChecks.push(inventoryCheck);
  }

  getInventoryChecks(propertyId: number) {
    return this.inventoryCheckRepository.find({
      where: { property: { id: propertyId } }
    });
  }

  async addReview(user: User , propertyId: number, createReviewDTO: CreateReviewDTO) {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId }
    });

    if (!property) {
      throw new NotFoundException();
    }

    if (user.id !== property.lessor.id) {
      throw new Error('Only the lessor can add reviews');
    }

    if (user.bookings.filter(booking => booking.property.id === propertyId).length === 0) {
      throw new Error('Only users who have booked the property can add reviews');
    }

    const review = this.reviewRepository.create(createReviewDTO);
    review.user = user;
    property.reviews.push(review);
    return this.propertyRepository.save(property);
  }

  async getReviews(propertyId: number, user: User) {
    return this.reviewRepository.find(
      {
        where: {
          property: {
            id: propertyId
          },
          user: {
            id: user.id
          }
        }
      }
    );
  }
}
