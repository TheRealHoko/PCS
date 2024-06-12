import { IProperty } from "./property.interface";
import { IUser } from "./user.interface";

export interface IBooking {
    id: number;

    from: Date;

    to: Date;

    traveller: IUser;
    
    property: IProperty;

    status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';
}