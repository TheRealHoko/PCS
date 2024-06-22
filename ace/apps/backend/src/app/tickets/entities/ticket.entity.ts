import { Collection, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "./comment.entity";
import { Type, Exclude } from "class-transformer";

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

    @OneToOne(() => User, user => user.tickets)
    @JoinColumn()
    createdBy: User;

    @ManyToOne(() => User, user => user.tickets, {
        eager: true
    })
    assignee: User;

    @OneToMany(() => Comment, comment => comment.ticket, { cascade: true })
    @Type(() => Comment)
    comments: Comment[];
}
