import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';
import {
  getApiErrorResponse,
  getApiResponse,
  getProductNotFoundError,
} from '../../helpers/apiHelpers';
import { getProductsList } from '../../helpers/products';
import commonMidlware from '../../lib/commonMidlware';
import { ProductPathParameter, ProductsListItem } from '../types';

export const originalHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { productId } = event.pathParameters as ProductPathParameter;
  
  console.log(`[Incoming productId]: ${productId}`);

  try {
    const productsList = (await getProductsList()) as Array<ProductsListItem>;
    const product = productsList.find((p) => p.id === productId);

    if (!product) {
      return getProductNotFoundError(`Product with ID: "${productId}" not found`);
    }

    return getApiResponse(product);
  } catch (error) {
    console.log(error);
    return getApiErrorResponse();
  }
};

export const handler = commonMidlware(originalHandler);
