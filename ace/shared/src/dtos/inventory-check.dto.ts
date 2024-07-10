import { Intervention } from "./intervention.dto";
import { Property } from "./property.dto";
import { Review } from "./review.dto";
import { User } from "./user.dto";

export class InventoryCheck {
    id!: number;
    created_at!: Date;
    updated_at!: Date;
    status!: 'WAITING' | 'ONGOING' | 'COMPLETED';
    property!: Property;
    user!: User;
    intervention!: Intervention;
    review!: Review;
}