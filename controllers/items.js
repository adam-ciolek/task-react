// const { StatusCodes } = require("http-status-codes");
// const Items = require("../models/Tasks");

// const getAllItems = async (req, res) => {
// 	try {
// 		const tasks = await Items.find({});
// 		res.status(StatusCodes.OK).json({ success: true, data: tasks });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const createItem = async (req, res) => {
// 	try {
// 		const tasks = await Items.create(req.body);
// 		res.status(StatusCodes.OK).json({ tasks });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const updateItems = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const tasks = await Items.findOneAndUpdate({ _id: id }, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});
// 		res.send(StatusCodes.OK).json({ tasks });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const deleteTask = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const task = await Items.deleteOne({ id });
// 		res.status(StatusCodes.OK).json({ task });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// module.exports = { getAllItems, createItem, updateItems, deleteTask };
