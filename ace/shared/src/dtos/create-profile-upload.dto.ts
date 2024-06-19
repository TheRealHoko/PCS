import { IsNotEmpty } from "class-validator";

export class CreateProfileUploadDto {
    @IsNotEmpty()
    userId!: number;
}
