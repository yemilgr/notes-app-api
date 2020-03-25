import * as dynamoDB from './libs/dynamodb';
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
		const res = await dynamoDB.call('get', params);
		console.log(res);
		if (res.Item) {
			return success(res.Item);
		}

		return failure({ status: false, error: 'Note not found' });
	} catch (error) {
		return failure({ status: false });
	}
}
