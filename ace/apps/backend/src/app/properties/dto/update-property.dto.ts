import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import { IsNotEmpty } from "class-validator";

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
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
