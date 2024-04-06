import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    available: Boolean;

    @Column({nullable: false})
    effectif: Number;

    @Column({nullable: false})
    price: Number;

    @Column({nullable: false})
    service_type: string;

    
}
