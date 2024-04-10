import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    RolesModule, 
    AuthModule,
    ServicesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global:true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: {expiresIn: '60s'}
      }),
      inject: [ConfigService]
    })],
  controllers: [],
  providers: [Logger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
