import { Collection, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    applicable: string;

    @Column()
    message: string;

    @Column()
    isSolved: boolean;
}
