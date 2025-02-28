import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, // Provides access to the request and response objects
    next: CallHandler, // Handles the next step in the request-response cycle
  ): Observable<any> | Promise<Observable<any>> {
    // Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Modify the request by adding a custom property
    request.customProperty = 'Added by interceptor';

    // Log the modified request property (useful for debugging)
    console.log('Request Modified:', request.customProperty);

    // `next.handle()` returns an Observable that represents the response
    return next.handle().pipe(
      // `pipe(map(...))` is used to transform the response **before sending it to the client**
      map((data) => {
        // Modify the response format
        return {
          success: true, // Indicating a successful response
          modifiedBy: 'CustomInterceptor', // Meta information showing interceptor modified the response
          timestamp: new Date().toISOString(), // Adding a timestamp for debugging/logging purposes
          data: data, // Keeping the original response data unchanged
        };
      }),
    );
  }
}
