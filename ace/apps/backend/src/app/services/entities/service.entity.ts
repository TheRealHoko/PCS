import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceAvailability } from './service-availability.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: true })
  available: Boolean;

  @Column({ nullable: false })
  effectif: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  service_type: string;

  @Column({ default: 'WAITING' })
  status: 'OFFLINE' | 'WAITING' | 'ONLINE';

  // !! removed eager: true
  @ManyToOne(() => User, (user) => user.services, {
    eager: true
  })
  provider: User;

  @OneToMany(() => ServiceAvailability, availability => availability.service, {
    eager: true,
    cascade: true
  })
  availabilities: ServiceAvailability[];
}
