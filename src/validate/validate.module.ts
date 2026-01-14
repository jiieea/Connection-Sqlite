import { DynamicModule, Module } from '@nestjs/common';
import { ValidateService } from './validate/validate.service';

@Module({})
export class ValidateModule {
  static forRoot(isGlobal: boolean): DynamicModule {
    return {
      global: isGlobal,
      module: ValidateModule,
      providers: [ValidateService],
      exports: [ValidateService],
    };
  }
}
