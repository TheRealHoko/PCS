import { Module, forwardRef } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { UsersModule } from '../users/users.module';
import { PropertyUnavailability } from './entities/property-unavailability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, PropertyUnavailability]),
    forwardRef(() => UsersModule)
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService]
})
export class PropertiesModule {}
