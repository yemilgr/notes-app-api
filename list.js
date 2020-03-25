import * as dynamoDB from './libs/dynamodb';
import { success, failure } from './libs/responses';

export async function main(event, context) {
	const params = {
		TableName: process.env.tableName,
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': event.requestContext.identity.cognitoIdentityId
		}
	};

	try {
		const res = await dynamoDB.call('query', params);
		return success(res.Items);
	} catch (error) {
		return failure({ status: false });
	}
}
