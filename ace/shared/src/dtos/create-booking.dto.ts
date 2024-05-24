import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookingDto {
    @IsDateString()
    @IsNotEmpty()
    from!: Date;

    @IsDateString()
    @IsNotEmpty()
    to!: Date;

    @IsNotEmpty()
    @IsNumber()
    travellerId!: number;

    @IsNotEmpty()
    @IsNumber()
    propertyId!: number;
}
