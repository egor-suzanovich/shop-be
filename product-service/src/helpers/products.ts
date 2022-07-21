import AWS from 'aws-sdk';

export const getProductsList = async () => {
  try {
    // Temp solution: mock product data is stored in S3 bucket, in futher tasks data will be moved to DB
    const client = new AWS.S3();
    const data = await client
      .getObject({
        Bucket: 'mock-product-list',
        Key: 'productList.json',
      })
      .promise();
    const content = data.Body?.toString('utf8');
    const result = JSON.parse(content as string);
    return result;
  } catch (error) {
    throw error;
  }
};
