import { IsNotEmpty } from "class-validator";

export class CreateUploadDto {
    @IsNotEmpty()
    propertyId!: number;
}
