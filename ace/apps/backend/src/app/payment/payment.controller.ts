import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PropertiesService } from '../properties/properties.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly stripeService: PaymentService,
        private readonly propertiesService: PropertiesService,
    ) {}

    @Post('checkout')
    async checkout(@Body() data: { propertyId: number, amount: number }) {
        try {
            const property = await this.propertiesService.findOne({id: data.propertyId});
            const session = await this.stripeService.checkoutProperty(property, data.amount);
            return session;
        } catch (error) {
            return { error: error.message };
        }
    }
}
