import { Logger, Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties/properties.controller';
import { PropertiesService } from './services/properties/properties.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, Logger],
})
export class AppModule {}
