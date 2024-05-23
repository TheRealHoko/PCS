import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Upload } from '../../uploads/entities/upload.entity';
import { User } from '../../users/entities/user.entity';
import { IProperty } from '@ace/shared';
import { PropertyAvailability } from './property-availability.entity';

@Entity()
export class Property implements IProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

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

  @OneToMany(() => PropertyAvailability, availability => availability.property, {
    eager: true
  })
  availabilities: PropertyAvailability[];

  /** Crée la relation avec ADDRESS_ID pour la suite
   * @JoinTable()
   * address_id: ADDRESS[id]
   **/
}
