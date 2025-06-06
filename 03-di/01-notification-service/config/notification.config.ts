import { BadRequestException } from '@nestjs/common';
import { SenderEmail, SmsGateway } from '../notifications/notifications.model';

export class emailSender implements SenderEmail {
  sendEmail(to: string, subject: string, message: string): string {
    if (!to || to.trim() === '') {
      throw new BadRequestException('Email is required');
    }
    console.log(`Email sent to ${to}: ${subject} ${message}`);
    return(`Email sent to ${to}: ${subject} ${message}`);
  }
}

export class smsSender implements SmsGateway {
  sendSMS(to: string, message: string): string {
    if (!to || to.trim() === '') {
      throw new BadRequestException('Phone is required');
    }
    console.log(`SMS sent to ${to}: ${message}`);
    return(`SMS sent to ${to}: ${message}`);
  }
}