import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyUnavailability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(() => Property, property => property.propertyUnavailabilities, {
        onDelete: 'CASCADE',
    })
    property: Property;
}
