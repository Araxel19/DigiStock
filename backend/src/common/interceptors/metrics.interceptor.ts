import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Histogram } from 'prom-client';
import { HTTP_REQUEST_DURATION_SECONDS } from '../../metrics/metrics.providers';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @Inject(HTTP_REQUEST_DURATION_SECONDS)
    private readonly requestDurationHistogram: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const end = this.requestDurationHistogram.startTimer();

    return next.handle().pipe(
      tap(() => {
        end({ route: request.route?.path ?? request.path, code: response.statusCode, method: request.method });
      }),
    );
  }
}
