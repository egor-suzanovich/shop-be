import AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import {
  getApiErrorResponse,
  getApiResponse,
  schemaValidationError,
} from '../../helpers/apiHelpers';
import commonMidlware from '../../lib/commonMidlware';
import { Product } from '../types';
import { createProductSchema } from './validation';

export const originalHandler = async (event) => {
  const { title, description, count, price } = event.body as Product;
  console.log('[Incoming payload]', event.body);
  const validationResult = createProductSchema.validate(
    { title, description, count, price },
    {
      allowUnknown: false,
    },
  );

  if (validationResult.error) {
    console.log(`[Validation errors]`, { validationResult });
    return schemaValidationError(validationResult?.error?.details[0]?.message);
  }

  try {
    const TableName = process.env.DATA_TABLE_NAME as string;
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const payload = {
      id: uuid(),
      title,
      description,
      price,
      count,
    };

    const config = {
      TableName,
      Item: payload,
    };
    const result = await dynamodb.put(config).promise();
    console.log('[Product created]', payload);
    return getApiResponse(payload);
  } catch (error) {
    console.log(error);
    return getApiErrorResponse();
  }
};

export const handler = commonMidlware(originalHandler);
