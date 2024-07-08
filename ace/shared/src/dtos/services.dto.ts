import { IService, IServiceAvailability } from "../interfaces";
import { Review } from "../interfaces/review.interface";

export class Service implements IService {
  reviews!: Review[];
  
  id!: number;
  
  name!: string;
  
  description!: string;
  
  price!: number;
  
  service_type!: string;
  
  status!: "OFFLINE" | "WAITING" | "ONLINE";

  availabilities!: IServiceAvailability[];
}
