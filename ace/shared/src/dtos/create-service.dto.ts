import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  base_price!: number;

  dynamic_price?: number;

  @IsNotEmpty()
  service_type!: "ESSENTIAL" | "OPTIONAL";

  @IsNotEmpty()
  service_category!: "ESSENTIAL_PROPERTY_MANAGEMENT" | "ESSENTIAL_MAINTENANCE_REPAIR" | "MARKETING_COMMUNICATION" | "FINANCIAL_OPTIMIZATION" | "TRANSPORT" | "CONCIERGE" | "OTHER";
  
  @IsNotEmpty()
  pricing_type!: "FIXED" | "PER_KM" | "PER_HOUR" | "PER_DAY" | "PER_WEEK" | "PER_MONTH" | "PER_YEAR";

  status?: 'OFFLINE' | 'WAITING' | 'ONLINE';

  @IsNotEmpty()
  providerId!: number;
}
