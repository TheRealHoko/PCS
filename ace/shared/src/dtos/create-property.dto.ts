import { IsNotEmpty } from 'class-validator';
import { CreateAvailabilityDto } from './create-availability.dto';

export class CreatePropertyDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  price!: number;

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
}
