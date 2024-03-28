import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { Role } from "../../roles/entities/role.entity";

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

    @ManyToMany(() => Role, {
        eager: true
    })
    @JoinTable()
    roles: Role[]
}
