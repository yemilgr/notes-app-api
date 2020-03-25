import uuid from 'uuid';
import * as dynamoDB from './libs/dynamodb';
import { success, failure } from './libs/responses';

export async function main(event, context) {
	const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.tableName,
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now()
		}
	};

	try {
		await dynamoDB.call('put', params);
		return success(params.Item);
	} catch (error) {
		return failure({ status: false });
	}
}
