import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { CreateServiceAvailabilityDto } from './create-service-availability.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
    availabilities?: CreateServiceAvailabilityDto[];
}
