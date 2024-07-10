import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UsersModule } from '../users/users.module';
import { PropertiesModule } from '../properties/properties.module';
import { ServicesModule } from '../services/services.module';
import { Intervention } from '../services/entities/intervention.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Intervention]),
    UsersModule,
    PropertiesModule,
    ServicesModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
