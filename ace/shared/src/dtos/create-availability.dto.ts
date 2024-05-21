import { IsNotEmpty } from "class-validator";

export class CreateAvailabilityDto {
    @IsNotEmpty()
    from!: Date;
    
    @IsNotEmpty()
    to!: Date;

    property_id?: number;
}
