import { Collection, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
// importer les utilisateurs?
// importer les adresses?

@Entity()
export class Properties {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    capacity: number;

    @Column({nullable: false})
    surface: number;

    @Column({nullable: false})
    room_count: number;

    /** Crée la relation avec USER_ID et ADDRESS_ID pour la suite
     * 
     * @JoinTable()
     * user_id: USER[id]
     * 
     * @JoinTable()
     * address_id: ADDRESS[id]
     **/
}