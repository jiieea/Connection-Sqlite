import { ArgumentsHost, Catch, ExceptionFilter, Global } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Global()
@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    response.status(400).json({
      code: 400,
      message: 'Validation Error',
      details: exception.issues,
    });
  }
}
