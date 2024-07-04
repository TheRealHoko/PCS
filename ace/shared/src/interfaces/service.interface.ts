import { IServiceAvailability } from "./service-availability.interface";

export interface IService {
    id: number;
  
    name: string;
  
    description: string;
  
    effectif: number;
  
    price: number;
  
    service_type: string;
    
    status: 'OFFLINE' | 'WAITING' | 'ONLINE';

    availabilities: IServiceAvailability[];
  }