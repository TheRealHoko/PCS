import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { IMailService } from './mail.interface';

@Injectable()
export class MailService implements IMailService {
  private readonly transporter: Transporter;
  private readonly logger: Logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USERNAME'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendVerificationMail(to: string, token: string) {
    try {
      const domain = this.configService.get<string>('FRONT_URL');
      const url = `${domain}/login?token=${token}`;
      await this.transporter.sendMail({
        to: to,
        subject: 'Verify your email please',
        html: `
                <h1>Verify your email</h1>
                <br>
                <p>Please click on the link to verify your email : ${url}</p>
                `,
      });
      this.logger.log(`Verification mail sent to ${to}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMail(to: string, subject: string, body: string) {
    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: body,
      });
      this.logger.log(`Mail sent to ${to}`);
    } catch (error) {
      throw new Error(error);
    }
  }
}
