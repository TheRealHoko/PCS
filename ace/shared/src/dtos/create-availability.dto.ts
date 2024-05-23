import { IsNotEmpty } from "class-validator";

export class CreatePropertyAvailabilityDto {
    @IsNotEmpty()
    from!: Date;
    
    @IsNotEmpty()
    to!: Date;

    propertyId?: number;
}
