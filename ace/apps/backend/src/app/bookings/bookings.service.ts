import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto, UpdateInterventionDto } from '@ace/shared';
import { UpdateBookingDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { Intervention } from '../services/entities/intervention.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Intervention)
    private interventionRepository: Repository<Intervention>
  ) { }

  async create(createBookingDto: CreateBookingDto, traveller: User, property: Property, requestedServices: Service[]): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);
    booking.traveller = traveller;
    booking.property = property;
    console.log("services", requestedServices);
    const interventions = requestedServices.map((service) => {
      const intervention = this.interventionRepository.create();
      intervention.property = property;
      intervention.service = service;
      return intervention;
    });

    console.log('interventions', interventions);
    booking.interventions = await this.interventionRepository.save(interventions);
    console.log('booking interventions', booking);

    return this.bookingRepository.save(booking);
  }

  findAll(where?: FindOptionsWhere<Booking>): Promise<Booking[]> {
    if (where) {
      return this.bookingRepository.find({where});
    }
    return this.bookingRepository.find();
  }

  findOne(id: number) {
    return this.bookingRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.preload({
      id: id,
      ...updateBookingDto,
    });
    return this.bookingRepository.save(booking);
  }

  async remove(id: number) {
    return this.bookingRepository.delete(id);
  }

  async cancelBooking(id: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    
    if (booking.to < new Date(Date.now())) {
      throw new Error('Cannot cancel a booking that has already ended');
    }

    return this.bookingRepository.update(id, { status: 'cancelled'});
  }

  async updateIntervention(id: number, updateInterventionDto: UpdateInterventionDto) {
    const intervention = await this.interventionRepository.preload({
      id,
      ...updateInterventionDto
    });

    return this.interventionRepository.save(intervention);
  }
}
