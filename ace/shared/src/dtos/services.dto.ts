import { Intervention } from "./intervention.dto";
import { Review } from "./review.dto";
import { ServiceAvailability } from "./service-availability.dto";
import { User } from "./user.dto";

export class Service {
  id!: number;
  created_at!: Date;
  updated_at!: Date;
  name!: string;
  description!: string;
  base_price!: number;
  dynamic_price!: number;
  service_type!: "ESSENTIAL" | "OPTIONAL";
  service_category!: "ESSENTIAL_PROPERTY_MANAGEMENT" | "ESSENTIAL_MAINTENANCE_REPAIR" | "MARKETING_COMMUNICATION" | "FINANCIAL_OPTIMIZATION" | "TRANSPORT" | "CONCIERGE" | "OTHER";
  pricing_type!: "FIXED" | "PER_KM" | "PER_HOUR" | "PER_DAY" | "PER_WEEK" | "PER_MONTH" | "PER_YEAR";
  status!: 'OFFLINE' | 'WAITING' | 'ONLINE';
  provider!: User;
  availabilities!: ServiceAvailability[];
  interventions!: Intervention[];
  reviews!: Review[];
}
