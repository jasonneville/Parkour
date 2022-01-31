const stripe = require('stripe')(
    'sk_test_51HSpkTIvprkD8Pr3COPkpVl0hWouubBZ1sgipbWIkbv1RKN9HXsdKgIhbMhMGLBxI6XBRRoSCSqad54K0ilqc17700MD2SPdkc'
);

/**
 * Creates a stripe customer.
 * @returns {*} Created customer object 
 */
module.exports.createCustomer = async() => {
	const customer = await stripe.customers.create();
	return customer;
}

/**
 * Retrieves the stripe customer information for the specified stripe id.
 * @param {*} stripeId - ID of the stripe user to retrieve.
 * @returns Stripe customer object
 */
module.exports.getCustomer = async(stripeId) => {
	const customer = await stripe.customers.retrieve(stripeId);
	return customer;
}

/**
 * Gets all cards associated with a specific stripe id.
 * @param {*} stripeId - ID of the stripe user to retrieve.
 * @returns All cards for the stripe customer
 */
module.exports.getCards = async(stripeId) => {

	const stripeCards = await stripe.customers.listSources(stripeId, {
		object: 'card'
	});
	return stripeCards;
}

/**
 * Deletes the specified card id from the specified stripe id.
 * @param {*} stripeId - ID of the stripe user to retrieve.
 * @param {*} cardId - ID of the card to delete.
 * @returns Deleted stripe card information
 */
module.exports.deleteCard = async(stripeId, cardId) => {
	const deleted = await stripe.customers.deleteSource(stripeId, cardId);
	return deleted;
}

/**
 * Updates the default card to the specified cardId for the specified stripeId
 * @param {*} stripeId - ID of the stripe user to retrieve.
 * @param {*} cardId - ID of the card to update.
 */
module.exports.updateDefaultCard = async(stripeId, cardId) => {
	await stripe.customers.update(stripeId, cardId);
}

/**
 * Creates a stripe card for the specified stripe id.
 * @param {*} stripeId - ID of the stripe user to retrieve.
 * @param {*} source - Source information of the card.
 * @returns Created card information
 */
module.exports.createCard = async(stripeId, source) => {
	const cards = await stripe.customers.createSource(stripeId, {
		source: source
	});
	return cards;
}






