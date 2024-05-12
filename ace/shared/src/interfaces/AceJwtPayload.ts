import { RoleEnum } from '../enums';
import { JwtPayload } from 'jwt-decode';

export interface AceJwtPayload extends JwtPayload {
  email: string;
  roles: RoleEnum[];
}
