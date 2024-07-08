import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from '@ace/shared';
import { UpdateBookingDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) { }

  create(createBookingDto: CreateBookingDto, traveller: User, property: Property): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);
    booking.traveller = traveller;
    booking.property = property;
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

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
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
}
