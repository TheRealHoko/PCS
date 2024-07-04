import { IService, IServiceAvailability } from "../interfaces";

export class Service implements IService {
  id!: number;
  
  name!: string;
  
  description!: string;
  
  effectif!: number;
  
  price!: number;
  
  service_type!: string;
  
  status!: "OFFLINE" | "WAITING" | "ONLINE";

  availabilities!: IServiceAvailability[];
}
