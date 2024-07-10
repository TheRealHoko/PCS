import { Property } from "./property.dto";
import { Service } from "./services.dto";
import { User } from "./user.dto";

export class Review {
    id!: number;
    rating!: 1 | 2 | 3 | 4 | 5;
    comment!: string;
    user!: User;
    property!: Property;
    service!: Service;
}