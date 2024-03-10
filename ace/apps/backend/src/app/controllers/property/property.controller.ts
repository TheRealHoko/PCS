import { Controller, Get, Ip, Logger, Param } from '@nestjs/common';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../interfaces/property.interface';

@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService,
        private logger: Logger) {}

    @Get()
    async getProperties(): Promise<Property[]> {
        return this.propertyService.getProperties();
    }

    @Get(":id")
    async getProperty(@Param("id") id: string): Promise<Property> {
        return this.propertyService.getProperty(Number.parseInt(id));
    }
}
