import { makeHistogramProvider } from '@willsoto/nestjs-prometheus';

export const HTTP_REQUEST_DURATION_SECONDS = 'http_request_duration_seconds';

export const httpRequestDurationSecondsProvider = makeHistogramProvider({
  name: HTTP_REQUEST_DURATION_SECONDS,
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});
