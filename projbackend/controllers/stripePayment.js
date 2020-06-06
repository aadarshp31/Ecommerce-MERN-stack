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
					amount: amount * 100,
					currency: "usd",
					customer: customer.id,
                    receipt_email: token.email,
                    description: "TEST Description: Product purchase description",
					shipping: {
						name: token.card.name,
						address: {
                            line1: token.card.address_line1,
                            line2: token.card.address_line2,
                            city: token.card.address_city,
                            country: token.card.address_country,
                            postal_code: token.card.address_zip
                        }
					},
				},
				{ idempotencyKey }
			);
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
};
