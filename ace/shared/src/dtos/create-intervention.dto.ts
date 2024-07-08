import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInterventionDto {
    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    price!: number;
}
