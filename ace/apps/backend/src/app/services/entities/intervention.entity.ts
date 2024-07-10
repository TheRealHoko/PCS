import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from "./service.entity";
import { Booking } from "../../bookings/entities/booking.entity";
import { Property } from "../../properties/entities/property.entity";

@Entity()
export class Intervention {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    price?: number;

    @Column({default: 'REQUESTED'})
    status: "REQUESTED" | "ONGOING" | "COMPLETED" | "CANCELLED";

    @ManyToOne(() => Service, service => service.interventions)
    service: Service;

    @ManyToOne(() => Property)
    property: Property;
}