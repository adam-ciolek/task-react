const mongoose = require("mongoose");

const Items = new mongoose.Schema({
	element: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	option: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		trim: true,
	},
	amount: {
		type: Number,
		trim: true,
	},
});

module.exports = mongoose.model("Item", Items);
