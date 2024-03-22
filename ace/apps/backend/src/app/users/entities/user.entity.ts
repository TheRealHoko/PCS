import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    firstname: string;

    @Column({nullable: false})
    lastname: string;

    @Column({nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    hash?: string;

    @Column({default: null})
    access_token?: string;

    @Column()
    tel: string;
}
