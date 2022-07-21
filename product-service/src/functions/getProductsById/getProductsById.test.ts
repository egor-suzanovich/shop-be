import { describe, expect } from '@jest/globals';
import { originalHandler } from './getProductsById';

describe('getProductsById tests', () => {
  const mockEvent = {
    pathParameters: {
      productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    },
  } as any;

  it('should return valid response', async () => {
    const response = await originalHandler(mockEvent);
    expect(response).toMatchSnapshot();
  });
});
