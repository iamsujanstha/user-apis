import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Transforming the error response into the desired format
    const formattedErrors = exceptionResponse.message.map((msg: string) => {
      const [field, ...rest] = msg.split(' ');
      return { [field]: rest.join(' ') };
    });

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse.error,
      message: formattedErrors,
    });
  }
}
