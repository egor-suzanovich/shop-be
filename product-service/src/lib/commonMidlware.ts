import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';

export default (handler) =>
  middy(handler).use([
    httpHeaderNormalizer(),
    httpEventNormalizer(),
    httpJsonBodyParser(),
    httpErrorHandler(),
  ]);
