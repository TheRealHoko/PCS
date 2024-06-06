import { Property } from '@ace/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from "stripe";

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(configService: ConfigService) {
        this.stripe = new Stripe(configService.get<string>('STRIPE_KEY'));
    }

    async checkoutProperty(property: Property, amount: number) {
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
                            // images: [ 'http://localhost:3000/' + property.images[0].path],
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:4200/success',
            cancel_url: 'http://localhost:4200/cancel',
        });

        return { id: session.id };
    }
}
