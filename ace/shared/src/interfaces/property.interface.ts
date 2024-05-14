import { IUpload } from "./upload.interface";
import { IUser } from "./user.interface";

export interface IProperty {
  id: number;

  name: string;

  description: string;

  price: number;

  capacity: number;

  surface: number;

  room_count: number;

  isActive: boolean;

  lessor: IUser;

  images: IUpload[];
}
