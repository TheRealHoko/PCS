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
import { Availability } from '../../availabilities/entities/availability.entity';

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

  @OneToMany(() => Availability, availability => availability.property, {
    eager: true,
  })
  availabilities: Availability[];

  /** Crée la relation avec ADDRESS_ID pour la suite
   * @JoinTable()
   * address_id: ADDRESS[id]
   **/
}
