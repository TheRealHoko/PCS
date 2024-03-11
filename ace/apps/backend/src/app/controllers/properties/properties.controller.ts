import { Controller, Get, Ip, Logger, Param } from '@nestjs/common';
import { PropertiesService } from '../../services/property/properties.service';
import { Property } from '../../interfaces/property.interface';

@Controller('property')
export class PropertiesController {
    constructor(
        private propertyService: PropertiesService,
        private logger: Logger
        ) {}

    @Get()
    async getProperties(): Promise<Property[]> {
        return this.propertyService.getProperties();
    }

    @Get(":id")
    async getProperty(@Param("id") id: string): Promise<Property> {
        return this.propertyService.getProperty(Number.parseInt(id));
    }
}
