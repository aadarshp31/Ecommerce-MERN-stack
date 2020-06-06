const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
	const { products, token } = req.body;
	console.log("PRODUCTS =>", products);

	let amount = 0;
	products.map((product) => {
		amount += product.price;
	});

	//Unique id for each the transaction
	const idempotencyKey = uuid();

	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create(
				{
					amount: amount,
					currency: "usd",
					customer: customer.id,
					reciept_email: token.email,
					shipping: {
						name: token.card.name,
						address: token.card.address_country,
					},
				},
				{ idempotencyKey }
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
};
