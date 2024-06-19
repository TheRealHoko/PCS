import { IsNotEmpty } from "class-validator";

export class CreatePropertyUploadDto {
    @IsNotEmpty()
    propertyId!: number;
}
