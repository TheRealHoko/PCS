import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { Role } from "../../roles/entities/role.entity";
import { Address } from "../../address/entities/address.entity";

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
    phone: string;

    @ManyToMany(() => Role, {
        eager: true
    })
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Address, (address) => address.user, {
        cascade: ['insert', 'update'], 
        eager: true,
        onDelete: 'CASCADE',
    })
    addresses: Address[];
}
