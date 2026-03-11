import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AcceptedDataExceptionFilter } from './filters/accepted-data.filter';
// somewhere in your initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new AcceptedDataExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(
  () => {},
  () => {},
);
