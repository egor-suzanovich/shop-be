import { Client } from 'pg';
import { v4 as uuid } from 'uuid';
import {
  getApiErrorResponse,
  getApiResponse,
  schemaValidationError,
} from '../../helpers/apiHelpers';
import { productsDBConfig } from '../../helpers/products';
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

  const client = new Client(productsDBConfig);
  await client.connect();

  try {
    await client.query('BEGIN');

    const product_id = uuid();
    const { rows: product } = await client.query(
      'INSERT INTO productsList (id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_id, title, description, price],
    );

    const { rows: stock } = await client.query(
      'INSERT INTO stocks (product_id, count) VALUES ($1, $2) RETURNING *',
      [product_id, count],
    );

    await client.query('COMMIT');

    console.log('[created products and stocks tables]', { product, stock });
    return getApiResponse({ product, stock });
  } catch (error) {
    console.log(error);

    await client.query('ROLLBACK');

    return getApiErrorResponse();
  } finally {
    client.end();
  }
};

export const handler = commonMidlware(originalHandler);
