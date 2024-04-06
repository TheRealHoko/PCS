import { IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";

export class CreateUserDto {
    @IsNotEmpty()
    email!: string;
    
    @IsNotEmpty()
    password!: string;
    
    @IsNotEmpty()
    firstname!: string;
    
    @IsNotEmpty()
    lastname!: string;
    
    @IsNotEmpty()
    phone!: string;

    roles?: string[];

    address!: CreateAddressDto;

    status?: boolean;
}
