import { Comment, IProperty } from "../interfaces";
import { Address } from "./address.dto";
import { PropertyUnavailability } from "./property-unavailability.dto";
import { Upload } from "./upload.dto";
import { User } from "./user.dto";

export class Property implements IProperty {
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
