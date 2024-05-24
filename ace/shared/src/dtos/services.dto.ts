import { IService } from "../interfaces";

export class Service implements IService {
  id!: number;
  
  name!: string;
  
  description!: string;
  
  available!: Boolean;
  
  effectif!: number;
  
  price!: number;
  
  service_type!: string;

  status!: "OFFLINE" | "WAITING" | "ONLINE";
}
