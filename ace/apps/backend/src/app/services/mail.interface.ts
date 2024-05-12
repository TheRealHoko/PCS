export interface IMailService {
    sendVerificationMail(to: string, token: string): any;
    sendMail(to: string, subject: string, body: string): any;
}