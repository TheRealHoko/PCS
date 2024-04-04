import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mailer from "nodemailer";

@Injectable()
export class MailService {
    constructor(
        private configService: ConfigService
    ) {}

    sendMail(to: string) {
        const transporter = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USERNAME'),
                pass: this.configService.get<string>('MAIL_PASS')
            }
        });

        transporter.sendMail({
            from: this.configService.get<string>('MAIL_NOREPLY'),
            to: to,
            subject: "Test mail",
            html: "<h1>Test</h1>"
        })
    }
}