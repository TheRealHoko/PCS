import { IAddress, IUser } from '../interfaces';
import { Role } from './role.dto';

export class User implements IUser {
  id!: number;

  firstname!: string;

  lastname!: string;

  email!: string;

  hash?: string;

  access_token?: string;

  phone!: string;

  roles?: Role[];

  addresses?: IAddress[];

  email_verification_token?: string;

  status!: boolean;
}
