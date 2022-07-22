import AWS from 'aws-sdk';

export const getProductsList = async () => {
  const TableName = process.env.DATA_TABLE_NAME as string;
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const config = {
    TableName,
  };

  try {
    const result = await (await dynamodb.scan(config).promise()).Items;
    console.log('[Get productList]', { result });
    return result;
  } catch (error) {
    console.log(error);
  }
};
