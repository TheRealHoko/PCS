import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Property } from "../../properties/entities/property.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    path: string;

    @ManyToOne(() => Property, (property) => property.images, {
        onDelete: "CASCADE",
    })
    property: Property;

    @OneToOne(() => User, (user) => user.profile_picture, {
        onDelete: "CASCADE",
    })
    user: User;
}
