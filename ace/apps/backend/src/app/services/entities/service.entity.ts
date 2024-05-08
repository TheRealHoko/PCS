import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

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

    @Column({default: "WAITING"})
    status: "OFFLINE" | "WAITING" | "ONLINE";

    @ManyToOne(() => User, (user) => user.services, { eager: true })
    provider: User;
}
