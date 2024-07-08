import { Collection, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "./comment.entity";
import { Type, Exclude } from "class-transformer";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

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
