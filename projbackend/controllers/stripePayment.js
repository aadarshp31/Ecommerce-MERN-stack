const stripe = require("stripe")(process.env.STRIPE_SK);
const { v4: uuid } = require("uuid");
const { json } = require("body-parser");

exports.makePayment = (req, res) => {
	const { products, token } = req.body;

	let amount = 0;
	products.map((product) => {
		amount += product.price * product.quantity;
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
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => console.log("Stripe Charges Create Catch ======> \n",err));
		})
		.catch((err) => console.log("Stripe Customer Create Catch ======> \n",err));
};
