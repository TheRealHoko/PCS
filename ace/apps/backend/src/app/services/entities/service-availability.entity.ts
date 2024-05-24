import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class ServiceAvailability {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @ManyToOne(() => Service, service => service.availabilities)
    service: Service;
}
