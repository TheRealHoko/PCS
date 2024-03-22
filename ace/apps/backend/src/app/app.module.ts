import { Logger, Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties/properties.controller';
import { PropertiesService } from './services/properties/properties.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    RolesModule
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, Logger],
})
export class AppModule {}
