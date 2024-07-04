import { Property, User } from '@ace/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from "stripe";
import { Service } from '../services/entities/service.entity';

@Injectable()
export class PaymentService {
    private stripe: Stripe;
    logger = new Logger(PaymentService.name);

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get<string>('STRIPE_KEY'));
    }

    async checkoutProperty(property: Property, amount: number, booker: User, services: Service[]) {
        console.log(property);
        this.logger.debug("SERVICES" + services);
        console.log("Amount: " + amount);
        const lineItems = services.map(service => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: service.name,
                        description: service.description,
                    },
                    unit_amount: service.price * 100,
                },
                quantity: 1
            }
        });

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: property.name,
                            description: property.description,
                            // images: [ `${this.configService.get('BACK_URL')}/${property.images[0].path}`],
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1
                },
                ...lineItems
            ],
            mode: 'payment',
            success_url: `${this.configService.get('FRONT_URL')}/payment/success?sessionId={CHECKOUT_SESSION_ID}&userId=${booker.id}`,
            cancel_url: `${this.configService.get('FRONT_URL')}/payment/cancel?sessionId={CHECKOUT_SESSION_ID}&userId=${booker.id}`,
        });

        return { id: session.id };
    }

    async retrieveCheckoutSession(sessionId: string) {
        return this.stripe.checkout.sessions.retrieve(sessionId);
    }

    async retrieveInvoices(sessionId: string) {
        return this.stripe.invoices.list({ customer: sessionId });
    }
}
