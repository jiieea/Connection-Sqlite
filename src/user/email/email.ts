import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ValidateService } from 'src/validate/validate/validate.service';

@Injectable()
export class Email {
  constructor(private validationService: ValidateService) {}

  sendEmail(email: string): string {
    const emailSchema = z.email();
    this.validationService.validate(emailSchema, email);
    return `Email sent to ${email}`;
  }
}
