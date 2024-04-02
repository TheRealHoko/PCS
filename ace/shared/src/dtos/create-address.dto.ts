import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateAddressDto {
    @IsNumber()
    street_number!: number;

    @IsNotEmpty()
    street_name!: string;

    apartment_number?: number;

    @IsNotEmpty()
    city!: string;

    state?: string;

    @IsNotEmpty()
    @IsNumberString()
    postal_code!: string;

    @IsNotEmpty()
    country!: string;
}
