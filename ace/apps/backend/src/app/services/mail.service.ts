import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transporter, createTransport } from "nodemailer";

@Injectable()
export class MailService {
    transporter: Transporter;

    constructor(
        private configService: ConfigService
    ) {
        this.transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USERNAME'),
                pass: this.configService.get<string>('MAIL_PASS')
            }
        });
    }

    sendVerificationMail(to: string, token: string) {
        const url = ''
    }
}