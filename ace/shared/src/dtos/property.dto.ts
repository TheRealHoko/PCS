import { Address } from "./address.dto";
import { PropertyUnavailability } from "./property-unavailability.dto";
import { Review } from "./review.dto";
import { Upload } from "./upload.dto";
import { User } from "./user.dto";

export class Property {
  reviews!: Review[];
  
  id!: number;
  
  name!: string;
  
  description!: string;
  
  pricePerNight!: number;
  
  capacity!: number;
  
  surface!: number;
  
  roomCount!: number;
  
  propertyType!: "HOUSE" | "APARTMENT" | "OFFICE" | "LAND" | "COMMERCIAL";
  
  lessor!: User;
  
  images!: Upload[];

  propertyUnavailabilities!: PropertyUnavailability[];

  // comments!: Comment[];
}
