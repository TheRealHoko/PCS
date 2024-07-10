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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  base_price: number;

  @Column({nullable: true})
  dynamic_price: number;

  @Column()
  service_type: "ESSENTIAL" | "OPTIONAL";

  @Column()
  service_category: "ESSENTIAL_PROPERTY_MANAGEMENT" | "ESSENTIAL_MAINTENANCE_REPAIR" | "MARKETING_COMMUNICATION" | "FINANCIAL_OPTIMIZATION" | "TRANSPORT" | "CONCIERGE" | "OTHER";

  @Column()
  pricing_type: "FIXED" | "PER_KM" | "PER_HOUR" | "PER_DAY" | "PER_WEEK" | "PER_MONTH" | "PER_YEAR";

  @Column({ default: 'WAITING' })
  status: 'OFFLINE' | 'WAITING' | 'ONLINE';

  // !! removed eager: true
  @ManyToOne(() => User, (user) => user.services, {
    eager: true,
  })
  provider: User;

  @OneToMany(() => ServiceAvailability, availability => availability.service, {
    eager: true,
    cascade: true,
  })
  availabilities: ServiceAvailability[];

  @OneToMany(() => Intervention, intervention => intervention.service, {
    eager: true,
    cascade: true
  })
  interventions: Intervention[];

  @OneToMany(() => Review, review => review.service, {
    eager: true,
    cascade: true,
  })
  reviews: Review[];
}
