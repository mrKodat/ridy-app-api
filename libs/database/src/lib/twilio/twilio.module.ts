import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { SharedConfigurationService } from '../shared-configuration.service';

@Module({
  imports: [],
  providers: [TwilioService, SharedConfigurationService],
  exports: [TwilioService],
})
export class TwilioModule {}
