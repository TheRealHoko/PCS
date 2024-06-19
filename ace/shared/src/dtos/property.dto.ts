import { IProperty, IPropertyAvailability } from "../interfaces";
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

  availabilities!: IPropertyAvailability[];
}
