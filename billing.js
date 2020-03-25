import Stripe from 'stripe';
import { calculateCost } from './libs/billingCostCalculator';
import { success, failure } from './libs/response-lib';

export async function main(event, contect) {
	const { storage, source } = JSON.parse(event.body);
	const amount = calculateCost(storage);
	const description = 'Scratch charge';

	const stripe = Stripe(process.env('stripeSecretKey'));

	try {
		await stripe.charges.create({
			source,
			amount,
			description,
			currecy: 'USD'
		});

		return success({ status: true });
	} catch (error) {
		return failure({ status: false, message: error.message });
	}
}
