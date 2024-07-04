import { IsNotEmpty } from "class-validator";

export class CreatePropertyUnavailabilityDto {
    @IsNotEmpty()
    from!: Date;
    
    @IsNotEmpty()
    to!: Date;

    propertyId?: number;
}
