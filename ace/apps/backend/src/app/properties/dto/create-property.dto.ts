import { IsNotEmpty } from "class-validator";

export class CreatePropertyDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    capacity!: number;

    @IsNotEmpty()
    surface!: number;

    @IsNotEmpty()
    room_count!: number;
}
