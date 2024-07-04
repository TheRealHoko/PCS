import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { UpdatePropertyUnavailabilityDto } from './update-property-availability.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    propertyUnavailabilities?: UpdatePropertyUnavailabilityDto[];
}
