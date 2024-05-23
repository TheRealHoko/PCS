import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyAvailabilityDto } from './create-availability.dto';

export class UpdateAvailabilityDto extends PartialType(CreatePropertyAvailabilityDto) {}
