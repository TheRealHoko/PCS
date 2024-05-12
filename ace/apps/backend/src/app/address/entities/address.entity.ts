import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street_number: number;

  @Column()
  street_name: string;

  @Column({ nullable: true })
  apartment_number: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: User;
}
