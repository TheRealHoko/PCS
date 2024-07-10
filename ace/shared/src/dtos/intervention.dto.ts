import { Property } from "./property.dto";
import { Service } from "./services.dto";

export class Intervention {
    id!: number;
    created_at!: Date;
    updated_at!: Date;
    description?: string;
    price?: number;
    status!: "REQUESTED" | "ONGOING" | "COMPLETED" | "CANCELLED";
    service!: Service;
    property!: Property;
}