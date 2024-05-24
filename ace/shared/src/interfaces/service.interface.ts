export interface IService {
    id: number;
  
    name: string;
  
    description: string;
  
    available: Boolean;
  
    effectif: number;
  
    price: number;
  
    service_type: string;
    
    status: 'OFFLINE' | 'WAITING' | 'ONLINE';
  }