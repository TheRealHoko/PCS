import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "../../properties/entities/property.entity";

@Entity()
export class Availability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(() => Property, property => property.availabilities)
    property: Property;
}
