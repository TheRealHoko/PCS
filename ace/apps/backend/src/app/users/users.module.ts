import { Logger, Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => PropertiesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
