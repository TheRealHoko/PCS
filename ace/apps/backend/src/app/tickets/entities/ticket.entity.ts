import { Collection, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    description: string;

    @Column({default: false})
    isSolved: boolean;

    @ManyToOne(() => User, user => user.tickets)
    assignee: User;
}
