import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { register, Histogram } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    let histogram = register.getSingleMetric('http_request_duration_seconds') as Histogram<string>;
    if (!histogram) {
      histogram = new Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['route', 'code', 'method'],
      });
      register.registerMetric(histogram);
    }
    const end = histogram.startTimer();

    return next.handle().pipe(
      tap(() => {
        end({ route: request.route?.path ?? request.path, code: response.statusCode, method: request.method });
      }),
    );
  }
}
