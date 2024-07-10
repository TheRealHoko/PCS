import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Property } from "../../properties/entities/property.entity";
import { Intervention } from "../../services/entities/intervention.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @Column({default: 'pending'})
    status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'checked-out';

    @Column()
    price: number;

    @ManyToOne(() => User, user => user.bookings, {
        eager: true
    })
    traveller: User;

    @ManyToOne(() => Property, property => property.bookings, {
        eager: true
    })
    property: Property

    @ManyToMany(() => Intervention, {
        cascade: true,
        eager: true
    })
    @JoinTable()
    interventions: Intervention[];
}
