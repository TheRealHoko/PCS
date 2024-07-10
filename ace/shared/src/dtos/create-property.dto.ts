import { IsNotEmpty } from 'class-validator';
import { CreatePropertyUnavailabilityDto } from './create-property-unavailability.dto';

export class CreatePropertyDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  pricePerNight!: number;

  @IsNotEmpty()
  capacity!: number;

  @IsNotEmpty()
  surface!: number;

  @IsNotEmpty()
  roomCount!: number;

  @IsNotEmpty()
  propertyType!: 'HOUSE' | 'APARTMENT' | 'OFFICE' | 'LAND' | 'COMMERCIAL';

  @IsNotEmpty()
  bookingType!: 'INSTANT' | 'REQUEST';

  @IsNotEmpty()
  lessorId!: number;

  status?: 'OFFLINE' | 'WAITING' | 'ONLINE';
}
