import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { AddressModule } from './address/address.module';
import { MailModule } from './services/mail.module';
import { PropertiesModule } from './properties/properties.module';
import { TicketsModule } from './tickets/tickets.module';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    RolesModule,
    AuthModule,
    PropertiesModule,
    TicketsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DatabaseModule,
    RolesModule,
    AuthModule,
    PropertiesModule,
    ServicesModule,
    AddressModule,
    MailModule,
    UploadsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../public'),
      serveRoot: '/public/',
    }),
    BookingsModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
