import { DynamicModule, Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { SenderEmail, SmsGateway } from "./notifications.model";
import { JsonFileLoggerModule } from "../json-file-logger/json-file-logger.module";

@Module({})
export class NotificationsModule {
  static forRoot(senderEmail: SenderEmail, smsGateway: SmsGateway): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: 'SENDER_EMAIL',
          useValue: senderEmail,
        },
        {
          provide: 'SMS_GATEWAY',
          useValue: smsGateway,
        },
        NotificationsService,
      ],
      imports: [JsonFileLoggerModule.register({
        logFileName: 'notifications.json',
        logDirectory: 'logs',
      })],
      exports: [NotificationsService, 'SENDER_EMAIL', 'SMS_GATEWAY'],
    }
  }
}
