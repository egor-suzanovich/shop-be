import { APIGatewayProxyResult } from 'aws-lambda';
import { Method, ResponseType } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

export const commonHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store, max-age=0',
};

export const buildErrorResponse = (message: string): string =>
  JSON.stringify({ error: { message } });

export const getRawResponse = (body: any, statusCode: number = StatusCodes.OK, headers = {}) => ({
  statusCode,
  body,
  headers: {
    ...commonHeaders,
    ...headers,
  },
});

export function getApiResponse(
  data: Record<string, unknown> | unknown[] | unknown,
  statusCode: number = StatusCodes.OK,
): APIGatewayProxyResult {
  const body = JSON.stringify(data);
  return getRawResponse(body, statusCode);
}

export function getApiErrorResponse(
  message = 'Internal server error',
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
  errorCode?: string,
): APIGatewayProxyResult {
  const body = buildErrorResponse(message);
  return getRawResponse(body, statusCode);
}

export function getProductNotFoundError(
  message = 'Not found error',
  statusCode: number = StatusCodes.NOT_FOUND,
): APIGatewayProxyResult {
  const body = buildErrorResponse(message);
  return getRawResponse(body, statusCode);
}
