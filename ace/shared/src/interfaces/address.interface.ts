import { IUser } from './user.interface';

export interface IAddress {
  id: number;

  street_number: number;

  street_name: string;

  apartment_number: number;

  city: string;

  state?: string;

  postal_code: string;

  country: string;

  user: IUser;
}
