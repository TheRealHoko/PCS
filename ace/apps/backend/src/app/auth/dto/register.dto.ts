import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "../../address/dto/create-address.dto";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    firstname: string;
    
    @IsNotEmpty()
    lastname: string;
    
    @IsNotEmpty()
    tel: string;

    @IsDefined()
    address: CreateAddressDto;
}