import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateFormDto {
    @IsNotEmpty()
    applicable: string;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    isSolved: boolean;
}
