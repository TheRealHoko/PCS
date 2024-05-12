import { Upload } from "./upload.dto";
import { User } from "./users.dto";

export class Property {
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
