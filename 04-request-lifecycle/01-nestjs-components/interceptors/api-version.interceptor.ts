import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from 'rxjs/operators';

export class ApiVersionInterceptor implements NestInterceptor {
  private API_VERSION = "1.0";

  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'object' && data !== null) {
          return {
            ...data,
            apiVersion: this.API_VERSION,
            executionTime: `${Date.now() - now}ms`
          };
        }
        return {
          data,
          apiVersion: this.API_VERSION,
          executionTime: `${Date.now() - now}ms`
        };
    }));
  }
}
