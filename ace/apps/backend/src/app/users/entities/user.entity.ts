import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({default: null})
    access_token?: string;

    @Column()
    tel: string;
}
