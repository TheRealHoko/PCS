import { Controller, Get, Ip, Logger, Param } from '@nestjs/common';
import { PropertiesService } from '../../services/properties/properties.service';
import { Property } from '../../interfaces/property.interface';
import { ConfigService } from '@nestjs/config';

@Controller('property')
export class PropertiesController {
    constructor(
        private propertyService: PropertiesService) {}

    @Get()
    async getProperties(): Promise<Property[]> {
        return this.propertyService.getProperties();
    }

    @Get(":id")
    async getProperty(@Param("id") id: string): Promise<Property> {
        return this.propertyService.getProperty(Number.parseInt(id));
    }
}
