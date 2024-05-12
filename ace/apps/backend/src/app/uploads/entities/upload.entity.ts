import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "../../properties/entities/property.entity";

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Property, (property) => property.images)
    property: Property;
}
