import { Logger, Module } from '@nestjs/common';
import { PropertyController } from './controllers/property/property.controller';
import { PropertyService } from './services/property/property.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [],
  controllers: [PropertyController],
  providers: [PropertyService, Logger],
})

export class AppModule {}
