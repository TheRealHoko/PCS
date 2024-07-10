import { Service } from "./services.dto";

export class ServiceAvailability {
    id!: number;
    from!: Date;
    to!: Date;
    service!: Service;
}