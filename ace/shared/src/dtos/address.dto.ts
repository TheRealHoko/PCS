import { User } from './users.dto';

export class Address {
  id!: number;

  street_number!: number;

  street_name!: string;

  apartment_number!: number;

  city!: string;

  state?: string;

  postal_code!: string;

  country!: string;

  user!: User;
}
