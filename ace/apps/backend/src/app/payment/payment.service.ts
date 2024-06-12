import { Property, User } from '@ace/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from "stripe";

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get<string>('STRIPE_KEY'));
    }

    async checkoutProperty(property: Property, amount: number, booker: User) {
        console.log(property);
        console.log("Amount: " + amount);
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
                }
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
