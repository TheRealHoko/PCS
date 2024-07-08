import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateReviewDTO {
    @IsNotEmpty()
    @IsString()
    comment!: string;

    @IsNotEmpty()
    @IsNumber()
    rating!: 1 | 2 | 3 | 4 | 5;
}