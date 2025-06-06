import { DynamicModule, Global, Module } from "@nestjs/common";
import { JsonFileLoggerService } from "./json-file-logger.service.";
import { JsonFileLoggerOptions } from "./json-file-logger.model";

@Global()
@Module({})
export class JsonFileLoggerModule {
  static register(options: JsonFileLoggerOptions): DynamicModule {
    return {
      module: JsonFileLoggerModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        JsonFileLoggerService,
      ],
      exports: [JsonFileLoggerService],
    }
  }
}