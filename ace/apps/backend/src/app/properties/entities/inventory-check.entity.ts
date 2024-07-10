import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class InventoryCheck {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    check_type: "IN" | "OUT";

    @Column()
    check_date: Date;

    @Column()
    description: string;

    @ManyToOne(() => Property, property => property.inventoryChecks)
    property: Property;
}