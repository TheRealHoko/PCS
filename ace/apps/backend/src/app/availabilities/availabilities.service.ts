import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from '@ace/shared';
import { UpdateAvailabilityDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './entities/availability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvailabilitiesService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabiliesRepository: Repository<Availability>
  ) {}

  create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability>{
    return this.availabiliesRepository.save(createAvailabilityDto);
  }

  findAll(): Promise<Availability[]> {
    return this.availabiliesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  async remove(id: number): Promise<Availability> {
    const availability = await this.availabiliesRepository.findOneBy({id});
    await this.availabiliesRepository.delete(id);
    return availability;
  }
}
