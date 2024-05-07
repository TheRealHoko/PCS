import { IsNotEmpty } from "class-validator";

export class CreateServiceDto {
    
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    effectif!: Number;

    @IsNotEmpty()
    price!: Number;

    @IsNotEmpty()
    service_type!: string;

    @IsNotEmpty()
    provider_id!: number

}
