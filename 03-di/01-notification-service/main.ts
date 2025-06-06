import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { JsonFileLoggerService } from "json-file-logger/json-file-logger.service.";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new JsonFileLoggerService({
    logFileName: 'app.json',
    logDirectory: 'logs'
  }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
