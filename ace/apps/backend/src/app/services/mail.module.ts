import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MockMailService } from './mockMail.service';


const MailProvider = {
  provide: MailService,
  useClass: false ? MailService : MockMailService
};

@Module({
  providers: [MailProvider],
  exports: [MailProvider],
})
export class MailModule {}
