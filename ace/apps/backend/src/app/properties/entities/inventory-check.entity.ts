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

    @Column({ nullable: false })
    check_type: "IN" | "OUT";

    @Column({ nullable: false })
    check_date: Date;

    @Column({ nullable: false })
    description: string;

    @ManyToOne(() => Property, property => property.inventoryChecks)
    property: Property;
}