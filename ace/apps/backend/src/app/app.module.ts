import { Logger, Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties/properties.controller';
import { PropertiesService } from './services/properties/properties.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, Logger],
})

export class AppModule {}
