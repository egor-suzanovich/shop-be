import { APIGatewayProxyEventPathParameters } from 'aws-lambda';

export interface ProductPathParameter extends APIGatewayProxyEventPathParameters {
  productId: string | undefined;
}

export interface Product {
  title: string;
  description: string;
  count: number;
  price: number;
}

export interface ProductsListItem extends Product {
  id: string;
}
