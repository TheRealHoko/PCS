import { IProperty, IUpload } from "../interfaces";

export class Upload implements IUpload {
    id!: number;

    path!: string;

    property!: IProperty;
}
