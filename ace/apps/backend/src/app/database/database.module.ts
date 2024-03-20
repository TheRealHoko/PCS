import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT) || 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        })
      })
]})
export class DatabaseModule {}
