import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PropertiesModule } from '../properties/properties.module';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [PropertiesModule, UsersModule, ServicesModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
