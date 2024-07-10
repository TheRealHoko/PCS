import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';
import { Address } from '../../address/entities/address.entity';
import { Service } from '../../services/entities/service.entity';
import { Property } from '../../properties/entities/property.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Upload } from '../../uploads/entities/upload.entity';
import { Comment } from '../../tickets/entities/comment.entity';
import { Review } from '../../services/entities/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  hash?: string;

  @Column({ default: null })
  access_token?: string;

  @Column()
  phone: string;
  
  @Column({ nullable: true })
  email_verification_token?: string;
  
  @Column({ default: false })
  status: boolean;
  
  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];

  @ManyToMany(() => Role, {
    eager: true,
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Address, (address) => address.user, {
    cascade: ['insert', 'update'],
    eager: true,
    onDelete: 'CASCADE',
  })
  addresses: Address[];

  @OneToMany(() => Property, property => property.lessor)
  properties: Property[];

  @OneToMany(() => Booking, booking => booking.traveller)
  bookings: Booking[];

  @OneToMany(() => Ticket, ticket => ticket.assignee)
  tickets: Ticket[];

  @OneToOne(() => Upload, upload => upload.user, {
    eager: true,
  })
  @JoinColumn()
  profile_picture: Upload;

  @OneToMany(() => Comment, comment => comment.sent_by)
  comments: Comment[]

  @OneToMany(() => Review, review => review.user)
  reviews: Review[]
}
