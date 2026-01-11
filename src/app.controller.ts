import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('create-user')
  async create(@Query('email') email: string, @Query('name') name?: string) {
    await this.userService.createUser(email, name);
    return 'User created';
  }
}
