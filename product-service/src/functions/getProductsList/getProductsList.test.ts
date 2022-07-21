import { describe, expect } from '@jest/globals';
import { originalHandler } from './getProductsList';

describe('getProductsList tests', () => {
  it('should return valid response', async () => {
    const response = await originalHandler({});
    expect(response).toMatchSnapshot();
  });
});
