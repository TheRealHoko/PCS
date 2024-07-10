import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Property } from "../../properties/entities/property.entity";
import { Service } from "./service.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: 1 | 2 | 3 | 4 | 5;

    @Column()
    comment: string;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @ManyToOne(() => Property, property => property.reviews)
    property: Property;

    @ManyToOne(() => Service, service => service.reviews, {
        onDelete: 'CASCADE'
    })
    service: Service;
}