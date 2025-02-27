import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException) // Catch all HTTP exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    /*
       NestJS provides a way to access the Express Request and Response objects by using `host.switchToHttp()`
       By using host.switchToHttp(), you're ensuring that the filter will work in any of these environments, not just Express.
    */

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    this.logger.error(
      `${request.method} ${request.originalUrl} ${status} error: ${exception.message}`,
    );

    let formattedErrors:
      | string
      | Record<string, string>
      | Array<Record<string, string>>;

    // If the response has a message array (like in BadRequestException), format it
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      if (Array.isArray(exceptionResponse.message)) {
        formattedErrors = exceptionResponse.message.map((msg: string) => {
          const [field, ...rest] = msg.split(' ');
          return { [field]: rest.join(' ') };
        });
      } else {
        formattedErrors = (exceptionResponse as any).message;
      }
    } else {
      formattedErrors = exception.message; // Fallback for other HttpExceptions
    }

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse['error'] || exception.name,
      message: formattedErrors,
    });
  }
}
