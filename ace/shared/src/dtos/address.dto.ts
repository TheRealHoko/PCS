import { IAddress } from '../interfaces';
import { User } from './user.dto';

export class Address implements IAddress {
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
