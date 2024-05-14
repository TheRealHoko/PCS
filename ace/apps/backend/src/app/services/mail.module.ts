import { Module, Provider } from '@nestjs/common';
import { MailService } from './mail.service';
import { MockMailService } from './mockMail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


const MailProvider: Provider = {
  provide: MailService,
  useFactory: (configService: ConfigService) => {
    const isLocal = configService.get('NODE_ENV') === 'local';
    console.log('isLocal', isLocal);
    return isLocal ? MockMailService : new MailService(configService);
  },
  inject: [ConfigService]
};

@Module({
  providers: [MailProvider],
  exports: [MailProvider],
})
export class MailModule {}
