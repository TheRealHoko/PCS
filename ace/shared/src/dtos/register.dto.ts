import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  firstname!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  phone!: string;

  @IsDefined()
  address!: CreateAddressDto;
}
