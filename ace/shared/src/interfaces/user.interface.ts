import { IAddress } from './address.interface';
import { IRole } from './role.interface';
import { IService } from './service.interface';

export interface IUser {
  id: number;

  firstname: string;

  lastname: string;

  email: string;

  hash?: string;

  access_token?: string;

  phone: string;

  roles?: IRole[];

  addresses?: IAddress[];

  email_verification_token?: string;

  status: boolean;

  review?: 0 | 1 | 2 | 3 | 4 | 5;

  services?: IService[];
}
