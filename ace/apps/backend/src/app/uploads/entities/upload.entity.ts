import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "../../properties/entities/property.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

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
