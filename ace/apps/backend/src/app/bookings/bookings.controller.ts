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
import { CreateBookingDto, UpdateInterventionDto } from '@ace/shared';
import { UpdateBookingDto } from '@ace/shared';
import { UsersService } from '../users/users.service';
import { PropertiesService } from '../properties/properties.service';
import { FindOptionsWhere } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
    private readonly propertiesService: PropertiesService,
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    const traveller = await this.usersService.findOne({
      where: { id: createBookingDto.travellerId }
    });
    const property = await this.propertiesService.findOne({ id: createBookingDto.propertyId });
    
    const requestedServicesPromises = createBookingDto.requestedServicesId.map(async (id) => {
      console.log('Fetching service with id', id);
      return await this.servicesService.findOne({ where: { id } });
    });

    const requestedServices = await Promise.all(requestedServicesPromises);

    console.log('Requested Services:', requestedServices);
      
    return this.bookingsService.create(createBookingDto, traveller, property, requestedServices);
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

  @Patch(':id/intervention')
  updateIntervention(@Param('id') id: string, @Body() updateInterventionDto: UpdateInterventionDto){
    return this.bookingsService.updateIntervention(+id, updateInterventionDto);
  }
}
