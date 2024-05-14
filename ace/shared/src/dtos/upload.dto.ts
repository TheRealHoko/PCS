import { IUpload } from "../interfaces";
import { Property } from "./property.dto";

export class Upload implements IUpload {
    id!: number;

    path!: string;

    property!: Property;
}
