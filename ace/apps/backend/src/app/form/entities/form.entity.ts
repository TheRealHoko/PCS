import { Collection, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    applicable: string;

    @Column({nullable: false})
    message: string;

    @Column({nullable: false})
    isSolved: boolean;
}
