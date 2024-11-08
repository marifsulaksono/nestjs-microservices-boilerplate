import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = parseInt(process.env.APP_USER_PORT ?? '3001', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: port,
      },
    },
  );
  await app.listen();
  console.log(`Users microservice is listening on localhost:${port}`);
}
bootstrap();
