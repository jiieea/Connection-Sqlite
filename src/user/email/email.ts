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

  getName(name: string): string {
    const nameSchema = z.string().min(3);
    this.validationService.validate(nameSchema, name);
    return `Hello ${name}`;
  }
}
