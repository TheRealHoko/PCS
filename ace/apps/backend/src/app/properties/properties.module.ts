import { Module, forwardRef } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { UsersModule } from '../users/users.module';
import { PropertyUnavailability } from './entities/property-unavailability.entity';
import { InventoryCheck } from './entities/inventory-check.entity';
import { Review } from '../services/entities/review.entity';
import { MailModule } from '../services/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, PropertyUnavailability, InventoryCheck, Review]),
    forwardRef(() => UsersModule),
    MailModule
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService]
})
export class PropertiesModule {}
