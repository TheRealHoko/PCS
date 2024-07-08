import { Comment } from "./comment.interface";
import { PropertyUnavailability } from "../dtos/property-unavailability.dto";
import { IUpload } from "./upload.interface";
import { IUser } from "./user.interface";
import { Review } from "./review.interface";

export const property_types = ["HOUSE", "APARTMENT", "OFFICE", "LAND", "COMMERCIAL"] as const;

export interface IProperty {
  id: number;

  name: string;

  description: string;

  pricePerNight: number;

  capacity: number;

  surface: number;

  roomCount: number;

  propertyType: 'HOUSE' | 'APARTMENT' | 'OFFICE' | 'LAND' | 'COMMERCIAL';

  lessor: IUser;

  images: IUpload[];

  propertyUnavailabilities: PropertyUnavailability[];

  reviews: Review[];
}
