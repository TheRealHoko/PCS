import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInterventionDto {
    description?: string;

    price?: number;

    status!: "REQUESTED" | "ONGOING" | "COMPLETED" | "CANCELLED";
}
