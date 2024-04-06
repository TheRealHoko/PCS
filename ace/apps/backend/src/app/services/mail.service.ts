import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transporter, createTransport } from "nodemailer";
import { randomBytes } from "crypto";

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

    async sendVerificationMail(to: string) {
        try {
            const domain = 'localhost:4200';
            const token = randomBytes(16);
            const url = `${domain}/login?token=${token.toString('hex')}`;
            this.transporter.sendMail({
                to: to,
                subject: 'Verify your email please',
                html: `
                <h1>Verify your email</h1>
                <br>
                <p>Please click on hte link to verify your email : ${url}</p>
                `
            })
        } catch (error) {
            throw new Error(error);
        }

    }
}