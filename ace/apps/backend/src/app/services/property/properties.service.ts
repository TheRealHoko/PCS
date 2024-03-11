import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from '../../interfaces/property.interface';

@Injectable()
export class PropertiesService {
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
        const property: Property = this.properties.find((x) => x.id === id);
        if (!property) {
            throw new NotFoundException(`Property ${id} doesn't exist`);
        }
        return property;
    }
}
