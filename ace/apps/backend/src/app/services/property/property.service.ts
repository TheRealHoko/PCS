import { Injectable } from '@nestjs/common';
import { Property } from '../../interfaces/property.interface';

@Injectable()
export class PropertyService {
    private readonly properties:  Property[] = [
        {
            id: 0,
            name: "Appartement 4 pièces"
        },
        {
            id: 1,
            name: "Maison 4 pièces"
        }
    ];

    getProperties(): Property[] {
        return this.properties;
    }

    getProperty(id: number): Property {
        return this.properties.find((x) => x.id === id);
    }
}
