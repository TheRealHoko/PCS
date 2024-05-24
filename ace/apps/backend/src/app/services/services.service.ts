import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from '@ace/shared';
import { UpdateServiceDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { FindOneOptions, In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto, provider: User) {
    const service = this.servicesRepository.create(createServiceDto);
    service.provider = provider;
    return await this.servicesRepository.save(service);
  }

  async findAll() {
    const services = await this.servicesRepository.find();

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
    const service = await this.servicesRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with #${id} not found`);
    }

    const updated = this.servicesRepository.merge(service, updateServiceDto);
    return this.servicesRepository.save(updated);
  }

  async remove(id: number) {
    if (!(await this.servicesRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    this.servicesRepository.delete(id);
  }
}
