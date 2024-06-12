import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Property } from "../../properties/entities/property.entity";
import { IBooking } from "@ace/shared";

@Entity()
export class Booking implements IBooking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @Column({default: 'pending'})
    status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';

    @ManyToOne(() => User, user => user.bookings, {
        eager: true
    })
    traveller: User;

    @ManyToOne(() => Property, property => property.bookings, {
        eager: true
    })
    property: Property
}
