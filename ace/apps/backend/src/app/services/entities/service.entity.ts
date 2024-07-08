import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceAvailability } from './service-availability.entity';
import { Intervention } from './intervention.entity';
import { Review } from './review.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

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

  @OneToMany(() => Intervention, intervention => intervention.service, {
    eager: true,
    cascade: true
  })
  interventions: Intervention[];

  @OneToMany(() => Review, review => review.service, {
    eager: true,
    cascade: true
  })
  reviews: Review[];
}
