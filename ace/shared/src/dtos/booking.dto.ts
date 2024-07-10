import { Intervention } from "./intervention.dto";
import { Property } from "./property.dto";
import { ServiceAvailability } from "./service-availability.dto";
import { Service } from "./services.dto";
import { Ticket } from "./ticket.dto";
import { User } from "./user.dto";

export class Booking {
    id!: number;
    created_at!: Date;
    updated_at!: Date;
    from!: Date;
    to!: Date;
    status!: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';
    price!: number;
    traveller!: User;
    property!: Property;
    interventions!: Intervention[];
}