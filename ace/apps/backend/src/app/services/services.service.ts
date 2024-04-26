import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>
  ) {}

  async create(createServiceDto: CreateServiceDto) {

    return await this.servicesRepository.save(createServiceDto)
  
  }

  async findAll() {
    const services = await this.servicesRepository.find();

    if (!services){
      throw new NotFoundException("No services")
    }
    return services;
  }

  async findOne(id: number) {
    const service = await this.servicesRepository.findOne({where: {id}});

    if (!service){
      throw new NotFoundException(`Service #${id} not found`)
    }
    return service;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  async remove(id: number) {
    if (! await this.servicesRepository.exists({where: {id}})) {
      throw new NotFoundException(`Service #${id} not found`) 
    }
    this.servicesRepository.delete(id);
  }
}
