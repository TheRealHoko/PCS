import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyAvailability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(() => Property, property => property.availabilities, {
        onDelete: 'CASCADE',
    })
    property: Property;
}
