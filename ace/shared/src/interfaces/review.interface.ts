import { IProperty } from "./property.interface";
import { IService } from "./service.interface";
import { IUser } from "./user.interface";

export interface Review {
    id: number;
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    user: IUser;
    property: IProperty;
    service: IService;
}