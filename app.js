const express = require("express");
const app = express();
const connectDB = require("./db/connect");
// const router = require("./routes/items");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const Items = require("./models/Tasks");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.use("/api/items", router);
// get all items
app.get("/api/items", async (req, res) => {
	try {
		const tasks = await Items.find({});
		res.status(StatusCodes.OK).json({ success: true, tasks });
	} catch (error) {
		console.log(error);
	}
});

app.get("/api/items/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const tasks = await Items.findById(id);
		res.status(StatusCodes.OK).json({ success: true, tasks });
	} catch (error) {
		console.log(error);
	}
});

// create new item
app.post("/api/items", async (req, res) => {
	try {
		const tasks = await Items.create(req.body);
		res.status(StatusCodes.OK).json({ tasks });
	} catch (error) {
		console.log(error);
	}
});

// update item
app.patch("/api/items/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const tasks = await Items.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(StatusCodes.OK).json({ tasks });
	} catch (error) {
		console.log(error);
	}
});

app.delete("/api/items/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Items.deleteOne({ _id: id });
		res.status(StatusCodes.OK).json({ task });
	} catch (error) {
		console.log(error);
	}
});

const port = 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log("server is run", port);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
