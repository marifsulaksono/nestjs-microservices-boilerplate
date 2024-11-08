import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.APP_GATEWAY_PORT ?? 3000);
}
bootstrap();