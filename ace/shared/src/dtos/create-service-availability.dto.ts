import { IsNotEmpty } from "class-validator";

export class CreateServiceAvailabilityDto {
    @IsNotEmpty()
    from!: Date;
    
    @IsNotEmpty()
    to!: Date;

    providerId?: number;
}
