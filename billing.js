import Stripe from 'stripe';
import { calculateCost } from './libs/billingCostCalculator';
import { success, failure } from './libs/responses';

export async function main(event, contect) {
	const { storage, source } = JSON.parse(event.body);
	const amount = calculateCost(storage);
	const description = 'Scratch charge';

	const stripe = Stripe(process.env.stripeSecretKey);

	try {
		const charge = await stripe.charges.create({
			source,
			amount,
			description,
			currency: 'USD'
		});

		console.log(charge);

		return success({ status: true });
	} catch (error) {
		return failure({ status: false, message: error.message });
	}
}
