import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { AddressModule } from './address/address.module';
import { MailModule } from './services/mail.module';
import { PropertiesModule } from './properties/properties.module';
import { UploadController } from './upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    RolesModule,
    AuthModule,
    PropertiesModule,
    ServicesModule,
    PropertiesModule,
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
    AddressModule,
    MailModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [UploadController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
