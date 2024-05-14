import { IProperty } from "../interfaces";
import { Upload } from "./upload.dto";
import { User } from "./user.dto";

export class Property implements IProperty {
  id!: number;

  name!: string;

  description!: string;

  price!: number;

  capacity!: number;

  surface!: number;

  room_count!: number;

  isActive!: boolean;

  lessor!: User;

  images!: Upload[];
}
