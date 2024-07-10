import { Address } from './address.dto';
import { Booking } from './booking.dto';
import { Property } from './property.dto';
import { Review } from './review.dto';
import { Role } from './role.dto';
import { Service } from './services.dto';
import { Ticket } from './ticket.dto';
import { Upload } from './upload.dto';

export class User {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  hash?: string;
  access_token?: string;
  phone!: string;
  email_verification_token?: string;
  status!: boolean;
  services!: Service[];
  roles!: Role[];
  addresses!: Address[];
  properties!: Property[];
  bookings!: Booking[];
  tickets!: Ticket[];
  profile_picture!: Upload;
  comments!: Comment[];
  reviews!: Review[];
}
