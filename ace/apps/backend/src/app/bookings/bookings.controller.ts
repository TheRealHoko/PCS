import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from '@ace/shared';
import { UpdateBookingDto } from '@ace/shared';
import { UsersService } from '../users/users.service';
import { PropertiesService } from '../properties/properties.service';
import { FindOptionsWhere } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
    private readonly propertiesService: PropertiesService,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    const traveller = await this.usersService.findOne({
      where: { id: createBookingDto.travellerId }
    });
    const property = await this.propertiesService.findOne({ id: createBookingDto.propertyId });
    this.propertiesService.update(property.id, { isBooked: true });
    return this.bookingsService.create(createBookingDto, traveller, property);
  }

  @Get()
  findAll(@Body() where?: FindOptionsWhere<Booking>) {
    return this.bookingsService.findAll(where);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
