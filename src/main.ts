import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<any>(WINSTON_MODULE_NEST_PROVIDER);
  app.useGlobalFilters(new ValidationFilter());
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
