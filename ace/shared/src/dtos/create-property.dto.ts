import { IsNotEmpty } from 'class-validator';
import { IAvailability } from '../interfaces';

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

  @IsNotEmpty()
  availabilities!: IAvailability[];
}
