import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { WinstonModule } from 'nest-winston';
import { ValidateModule } from './validate/validate.module';
import { Email } from './user/email/email';
import * as winston from 'winston';
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ValidateModule.forRoot(true),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, Email],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Configure middleware here if needed
    consumer.apply(LogMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/current',
      method: RequestMethod.GET,
    });
  }
}
