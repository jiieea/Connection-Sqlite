import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from 'winston';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger.info('UserService initialized');
  }
  async createUser(email: string, name?: string) {
    this.logger.info(`Creating user with email: ${email} and name: ${name}`);
    await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }
}
