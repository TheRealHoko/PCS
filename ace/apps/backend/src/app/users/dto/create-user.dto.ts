import { IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "../../address/dto/create-address.dto";

export class CreateUserDto {
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    firstname: string;
    
    @IsNotEmpty()
    lastname: string;
    
    @IsNotEmpty()
    tel: string;

    roles?: string[];

    address: CreateAddressDto;
}