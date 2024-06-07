import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PropertiesService } from '../properties/properties.service';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { RolesGuard } from '../roles/roles.guard';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly stripeService: PaymentService,
        private readonly propertiesService: PropertiesService,
        private readonly usersService: UsersService
    ) {}

    @Post('checkout')
    @UseGuards(RolesGuard)
    async checkoutProperty(@Req() req: any, @Body() data: { propertyId: number, amount: number }) {
        try {
            const user = await this.usersService.findOne({where: {id: req['user'].id}});
            const property = await this.propertiesService.findOne({id: data.propertyId});
            const session = await this.stripeService.checkoutProperty(property, data.amount, user);
            return session;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('success')
    async success(@Body() data: { sessionId: string, userId: number}) {
        try {
            console.log(data);
            const session = await this.stripeService.retrieveCheckoutSession(data.sessionId);
            const user = await this.usersService.findOne({where: {id: data.userId}});
            return { session: session, userFirstName: user.firstname };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
