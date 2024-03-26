import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    RolesModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
