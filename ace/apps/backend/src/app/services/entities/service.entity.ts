import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({default: true})
    available: Boolean;

    @Column({nullable: false})
    effectif: Number;

    @Column({nullable: false})
    price: Number;

    @Column({nullable: false})
    service_type: string;

    @Column({default: false})
    validated: Boolean;
}
