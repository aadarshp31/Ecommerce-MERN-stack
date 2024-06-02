var braintree = require("braintree");

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: process.env.BRAINTREE_MERCHENT_ID,
	publicKey: process.env.BRAINTREE_PUBLIC_KEY,
	privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//Generate Token and send it to the client/frontend application
exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
};

//Recieve 'paymentMethodNonce' & 'amount' from frontend and create transaction for the payment.
exports.processPayment = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amountFromTheClient = req.body.amount;

	gateway.transaction.sale(
		{
			amount: amountFromTheClient,
			paymentMethodNonce: nonceFromTheClient,
			options: {
				submitForSettlement: true,
			},
		},
		function (err, result) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(result);
			}
		}
	);
};
