import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { MailModule } from './mail.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    MailModule,
    UsersModule
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
