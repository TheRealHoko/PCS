import { IsNotEmpty } from 'class-validator';
import { CreatePropertyAvailabilityDto } from './create-availability.dto';

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
  lessorId!: number;

  @IsNotEmpty()
  availabilities!: CreatePropertyAvailabilityDto[];
}
