import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInterventionDto, CreateReviewDTO, CreateServiceDto } from '@ace/shared';
import { UpdateServiceDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Intervention } from './entities/intervention.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    @InjectRepository(Intervention)
    private readonly interventionsRepository: Repository<Intervention>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createServiceDto: CreateServiceDto, provider: User) {
    const service = this.servicesRepository.create(createServiceDto);
    service.provider = provider;
    return await this.servicesRepository.save(service);
  }

  async findAll(options?: FindManyOptions<Service>) {
    const services = await this.servicesRepository.find(options);

    if (!services) {
      throw new NotFoundException('No services');
    }
    return services;
  }

  async findOne(options: FindOneOptions<Service>) {
    const service = await this.servicesRepository.findOne(options);

    if (!service) {
      throw new NotFoundException(`Service #${options.where} not found`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.servicesRepository.preload({
      id: id,
      ...updateServiceDto
    });

    if (!service) {
      throw new NotFoundException(`Service with #${id} not found`);
    }

    return this.servicesRepository.save(service);
  }

  async remove(id: number) {
    if (!(await this.servicesRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    this.servicesRepository.delete(id);
  }

  async addReview(user: User , serviceId: number, createReviewDTO: CreateReviewDTO) {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId }
    });

    if (!service) {
      throw new NotFoundException();
    }

    const review = this.reviewRepository.create(createReviewDTO);
    review.user = user;
    service.reviews.push(review);
    return this.servicesRepository.save(service);
  }

  async getReviews(serviceId: number, user: User) {
    return this.reviewRepository.find(
      {
        where: {
          service: {
            id: serviceId
          },
          user: {
            id: user.id
          }
        }
      }
    );
  }
}
