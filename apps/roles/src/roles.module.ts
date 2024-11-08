import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: true,
    synchronize: false,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    driver: require('mysql2'),
  }),
  TypeOrmModule.forFeature([Roles]),
],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
