import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class Intervention {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    status: boolean

    @ManyToOne(() => Service, service => service.interventions)
    service: Service;
}