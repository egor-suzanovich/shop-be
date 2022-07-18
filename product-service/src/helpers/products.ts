import { Client } from 'pg';
import { getApiErrorResponse } from './apiHelpers';

const { PG_HOST, PG_PORT, PG_DBNAME, PG_USERNAME, PG_PASSWORD } = process.env;

export const productsDBConfig = {
  host: PG_HOST,
  port: parseInt(PG_PORT as string),
  database: PG_DBNAME,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const getProductsList = async () => {
  const client = new Client(productsDBConfig);
  await client.connect();
  try {
    const products = await client.query('SELECT * FROM productsList');
    const stocks = await client.query('SELECT * FROM stocks');

    const result = products.rows.map((product) => {
      const { count } = stocks.rows.find((s) => s.product_id === product.id);
      return { ...product, count };
    });
    console.log('[getProductsList result]', result);
    return result;
  } catch (error) {
    console.log(error);
    return getApiErrorResponse();
  } finally {
    client.end();
  }
};
