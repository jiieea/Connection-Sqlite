import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Email } from './user/email/email';
import { ValidationFilter } from './validation/validation.filter';
import { LoginUserRequest, loginUserRequestValidation } from './model/model';
import { ValidationPipe } from './validation/validation/validation.pipe';
import { TimeInterceptor } from './time/time.interceptor';
import { Auth } from './auth/auth.decorator';
import * as client from 'generated/prisma/client';
import { RoleGuard } from './role/role.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private emailService: Email,
  ) {}

  @Get('/system')
  @UseGuards(new RoleGuard(['Quality Assurance', 'Developer']))
  enter(@Auth() user: client.User): Record<string, any> {
    return {
      data: `Welcome aboard ${user.name}`,
    };
  }

  @Get('/current')
  @UseGuards(new RoleGuard(['Quality Assurance', 'Developer']))
  current(@Auth() user: client.User): Record<string, any> {
    return {
      data: `Credential received = ${user.name} for ${user.email}`,
    };
  }

  @UsePipes(new ValidationPipe(loginUserRequestValidation))
  @UseInterceptors(TimeInterceptor)
  @Post('/login')
  login(
    @Query('name') name: string,
    @Body()
    request: LoginUserRequest,
  ) {
    return {
      client: request.username,
      password: request.password,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/send-email')
  @UseFilters(ValidationFilter)
  sendEmail(@Query('email') email: string): string {
    return this.emailService.sendEmail(email);
  }

  @Get('/:id')
  getId(@Param('id', ParseIntPipe) id: number): string {
    return `received id ${id}`;
  }

  @Get('/hello')
  sayHello(@Query('name') name: string): string {
    return this.emailService.getName(name);
  }
  @Get('create-user')
  async create(@Query('email') email: string, @Query('name') name?: string) {
    await this.userService.createUser(email, name);
    return 'User created';
  }
}
