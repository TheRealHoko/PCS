import { Logger, Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties/properties.controller';
import { PropertiesService } from './services/properties/properties.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [],
  controllers: [PropertiesController],
  providers: [PropertiesService, Logger],
})

export class AppModule {}
