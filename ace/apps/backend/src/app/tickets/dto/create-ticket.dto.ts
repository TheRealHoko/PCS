import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateTicketDto {
    @IsNotEmpty()
    topic: string;

    @IsNotEmpty()
    description: string;
}
