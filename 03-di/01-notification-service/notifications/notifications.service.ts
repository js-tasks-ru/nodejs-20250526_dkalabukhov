import { Inject, Injectable } from "@nestjs/common";
import { SmsGateway, SenderEmail } from "./notifications.model";
import { JsonFileLoggerService } from "../json-file-logger/json-file-logger.service.";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('SMS_GATEWAY') private smsGateway: SmsGateway,
    @Inject('SENDER_EMAIL') private senderEmail: SenderEmail,
    private jsonFileLoggerService: JsonFileLoggerService,
  ) {
    this.jsonFileLoggerService.setContext(NotificationsService.name);
  }
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    const logs = this.senderEmail.sendEmail(to, subject, message);
    await this.jsonFileLoggerService.logToJSON(logs);
  }

  async sendSMS(to: string, message: string): Promise<void> {
    const logs = this.smsGateway.sendSMS(to, message);
    await this.jsonFileLoggerService.logToJSON(logs);
  }
}
