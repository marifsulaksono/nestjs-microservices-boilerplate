import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = parseInt(process.env.APP_ROLE_PORT ?? '3002', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RolesModule,
    {
      transport: Transport.TCP,
      options: {
        port: port,
      },
    },
  );
  await app.listen();

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
  })
}
bootstrap();
