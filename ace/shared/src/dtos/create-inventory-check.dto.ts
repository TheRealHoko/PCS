import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateInventoryCheckDto {
    @IsNotEmpty()
    @IsString()
    check_type!: "IN" | "OUT";

    @IsDate()
    @IsNotEmpty()
    check_date!: Date;

    @IsNotEmpty()
    @IsString()
    description!: string;
}