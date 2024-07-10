import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Intervention } from "./intervention.dto";

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

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    status?: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';

    requestedServicesId?: number[];
}
