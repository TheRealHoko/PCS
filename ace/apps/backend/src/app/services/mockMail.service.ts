import { Injectable, Logger } from '@nestjs/common';
import { IMailService } from './mail.interface';

@Injectable()
export class MockMailService implements IMailService {
  private readonly logger: Logger = new Logger(MockMailService.name);

  async sendVerificationMail(to: string, token: string) {
    this.logger.log(`Sent verification mail to ${to} with token "${token}"`);
  }

  async sendMail(to: string, subject: string, body: string) {
    this.logger.log(`Sent mail to ${to} with subject ${subject} and with content ${body}`)
  }
}
