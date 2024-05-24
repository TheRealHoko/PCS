import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  effectif!: number;

  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  service_type!: string;

  status?: 'OFFLINE' | 'WAITING' | 'ONLINE';

  @IsNotEmpty()
  providerId!: number;
}
