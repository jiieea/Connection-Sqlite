import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Email } from './user/email/email';
import { ValidationFilter } from './validation/validation.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private emailService: Email,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send-email')
  @UseFilters(ValidationFilter)
  sendEmail(@Query('email') email: string): string {
    return this.emailService.sendEmail(email);
  }

  @Get('/hello')
  @UseFilters(ValidationFilter)
  sayHello(@Query('name') name: string): string {
    return `Hello, ${name}!`;
  }
  @Get('create-user')
  async create(@Query('email') email: string, @Query('name') name?: string) {
    await this.userService.createUser(email, name);
    return 'User created';
  }
}
