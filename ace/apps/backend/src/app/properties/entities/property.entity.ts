import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Upload } from '../../uploads/entities/upload.entity';
import { User } from '../../users/entities/user.entity';
import { Comment, IProperty } from '@ace/shared';
import { PropertyUnavailability } from './property-unavailability.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { InventoryCheck } from './inventory-check.entity';
import { Review } from '../../services/entities/review.entity';

@Entity()
export class Property implements IProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  pricePerNight: number;

  @Column()
  capacity: number;

  @Column()
  surface: number;

  @Column()
  roomCount: number;

  @Column()
  propertyType: 'HOUSE' | 'APARTMENT' | 'OFFICE' | 'LAND' | 'COMMERCIAL';

  @ManyToOne(() => User, lessor => lessor.properties, {
    eager: true
  })
  lessor: User;

  @OneToMany(() => Upload, upload => upload.property, {
    eager: true,
  })
  images: Upload[];

  @OneToMany(() => PropertyUnavailability, unavailability => unavailability.property, {
    eager: true,
    cascade: true,
  })
  propertyUnavailabilities: PropertyUnavailability[];

  @OneToMany(() => Booking, booking => booking.property)
  bookings: Booking[];

  @OneToMany(() => Review, review => review.property, {
    eager: true,
    cascade: true,
  })
  reviews: Review[];

  @OneToMany(() => InventoryCheck, inventoryCheck => inventoryCheck.property, {
    eager: true,
    cascade: true,
  })
  inventoryChecks: InventoryCheck[];

  // @ManyToMany(() => User, user => user.property_comments)
  // comments: Comment[];

  /** Crée la relation avec ADDRESS_ID pour la suite
   * @JoinTable()
   * address_id: ADDRESS[id]
   **/
}
