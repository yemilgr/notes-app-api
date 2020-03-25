import * as dynamoDb from './libs/dynamodb';
import { success, failure } from './libs/responses';

export async function main(event, context) {
	const params = {
		TableName: process.env.tableName,
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		}
	};

	try {
		await dynamoDb.call('delete', params);
		return success({ status: true });
	} catch (e) {
		return failure({ status: false });
	}
}
