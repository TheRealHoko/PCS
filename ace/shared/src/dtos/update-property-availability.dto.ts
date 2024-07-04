import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyUnavailabilityDto } from './create-property-unavailability.dto';

export class UpdatePropertyUnavailabilityDto extends PartialType(CreatePropertyUnavailabilityDto) {}
