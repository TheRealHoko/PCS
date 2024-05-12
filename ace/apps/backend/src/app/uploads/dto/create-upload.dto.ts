import { IsNotEmpty } from "class-validator";

export class CreateUploadDto {
    @IsNotEmpty()
    property_id: number;
}
