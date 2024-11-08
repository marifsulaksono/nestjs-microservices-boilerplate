import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = parseInt(process.env.APP_ROLE_PORT ?? '3002', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RolesModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: port,
      },
    },
  );
  await app.listen();
  console.log(`Roles microservice is listening on localhost:${port}`);
}
bootstrap();
