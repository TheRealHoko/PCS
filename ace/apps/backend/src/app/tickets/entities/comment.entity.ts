import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Ticket } from "./ticket.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Ticket, ticket => ticket.comments)
    @Exclude()
    ticket: Ticket;

    @ManyToOne(() => User, user => user.comments, { cascade: true })
    sent_by: User;
}