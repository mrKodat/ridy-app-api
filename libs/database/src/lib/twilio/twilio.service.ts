import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { SharedConfigurationService } from '../shared-configuration.service';
import { ForbiddenError } from '@nestjs/apollo';

@Injectable()
export class TwilioService {
  constructor(private sharedConfigService: SharedConfigurationService) {}

  async sendVerificationCodeSms(phoneNumber: string): Promise<string> {
    const config = await this.sharedConfigService.getConfiguration();
    if (
      config?.twilioAccountSid == null ||
      config?.twilioAuthToken == null ||
      config?.twilioFromNumber == null ||
      config.twilioVerificationCodeSMSTemplate == null
    ) {
      throw new Error('twilio config not found');
    }
    const client = new Twilio(
      config.twilioAccountSid!,
      config.twilioAuthToken!,
    );
    const random6Digit = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      await client.messages.create({
        body: config.twilioVerificationCodeSMSTemplate.replace(
          '{code}',
          random6Digit,
        ),
        from: config.twilioFromNumber,
        to: `+${phoneNumber}`,
      });
    } catch (error: any) {
      throw new ForbiddenError(error.message);
    }
    return random6Digit;
  }

  async sendVerificationCodeWhatsapp(phoneNumber: string): Promise<string> {
    const config = await this.sharedConfigService.getConfiguration();
    if (
      config?.twilioAccountSid == null ||
      config?.twilioAuthToken == null ||
      config?.twilioFromNumber == null ||
      config.twilioVerificationCodeSMSTemplate == null
    )
      throw new Error('twilio config not found');
    const client = new Twilio(
      config.twilioAccountSid!,
      config.twilioAuthToken!,
    );
    const random6Digit = Math.floor(100000 + Math.random() * 900000).toString();
    const message = await client.messages.create({
      body: config.twilioVerificationCodeSMSTemplate.replace(
        '{code}',
        random6Digit,
      ),
      from: config.twilioFromNumber!,
      to: `whatsapp:+${phoneNumber}`,
    });
    return random6Digit;
  }
}
