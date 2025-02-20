import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    let resourceName = request.url.split('?')[0].split('/')[2] || 'resource';
    resourceName = resourceName.replace(/-/g, ' '); // Handle kebab-case names like "user-profile"
    resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1); // Capitalize

    // Define dynamic messages based on HTTP method
    const methodMessages: Record<string, string> = {
      GET: `${resourceName} fetched successfully`,
      POST: `${resourceName} created successfully`,
      PUT: `${resourceName} updated successfully`,
      PATCH: `${resourceName} updated successfully`,
      DELETE: `${resourceName} deleted successfully`,
    };

    // Extract pagination details from request query if it's a GET request
    const page = Number(request.query.page) || 1;
    const pageSize = Number(request.query.limit) || 10;

    return next.handle().pipe(
      map((response) => {
        if (!response) {
          return {
            status: 'success',
            message: `${resourceName} processed successfully`,
            data: null,
          };
        }
        const { data, total } = response;
        const totalRecords = total || 0;

        // Get the appropriate message based on the request method
        const message =
          methodMessages[method] || `${resourceName} processed successfully`;

        // Include pagination only for GET requests
        if (method === 'GET') {
          const totalPages = Math.ceil(totalRecords / pageSize);
          return {
            status: 'success',
            message,
            data: data || response,
            metaData: {
              page,
              pageSize,
              totalPages,
              totalRecords,
            },
          };
        }

        // For non-GET requests (POST, DELETE, UPDATE, etc.), return only the data
        return {
          status: 'success',
          message,
          data: data || response,
        };
      }),
    );
  }
}
