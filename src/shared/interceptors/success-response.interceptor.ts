import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        message: 'Request fetched successfully',
        data,
        metaData: {
          page: 1,
          pageSize: 10,
          totalPages: 1,
          totalRecords: data?.length,
        },
      })),
    );
  }
}
