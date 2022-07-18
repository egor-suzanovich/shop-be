import { getApiErrorResponse, getApiResponse } from '../../helpers/apiHelpers';
import { getProductsList } from '../../helpers/products';
import commonMidlware from '../../lib/commonMidlware';

export const originalHandler = async (event) => {
  try {
    const result = await getProductsList();
    console.log('[getProductsList handler]', { result });
    return getApiResponse(result);
  } catch (error) {
    console.log(error);
    return getApiErrorResponse();
  }
};

export const handler = commonMidlware(originalHandler);
