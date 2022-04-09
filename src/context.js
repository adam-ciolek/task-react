import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext();

// save new added option in localStorage
const getLocalStorage = () => {
	let category = localStorage.getItem("category");
	if (category) {
		return (category = JSON.parse(localStorage.getItem("category")));
	} else {
		return [];
	}
};

const Storage = ({ children }) => {
	const [element, setElement] = useState("");
	const [description, setDescription] = useState("");
	const [option, setOption] = useState("oprogramowanie");
	const [price, setPrice] = useState("");
	const [amount, setAmount] = useState("");

	const [listCategory, setListCategory] = useState(getLocalStorage());
	const [category, setCategory] = useState("");

	const [data, setData] = useState();
	const [isLoad, setIsLoad] = useState(false);

	// take all products
	const fetchData = async () => {
		setIsLoad(false);
		try {
			const response = await axios.get("http://localhost:5000/api/items");
			if (response.status === 200) {
				setData(response.data.tasks);
			}
			setIsLoad(true);
		} catch (error) {
			setIsLoad(true);
			console.log(error);
		}
	};

	// delete product
	const handleDelete = (id) => {
		if (data) {
			axios.delete(`http://localhost:5000/api/items/${id}`).then(() => {
				fetchData();
			});
		}
	};

	const handleNew = (e) => {
		e.preventDefault();
		if (category) {
			const newCategory = category;
			setListCategory([...listCategory, newCategory]);
			setCategory("");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Context.Provider
			value={{
				element,
				setElement,
				description,
				setDescription,
				option,
				setOption,
				price,
				setPrice,
				data,
				fetchData,
				isLoad,
				setIsLoad,
				amount,
				setAmount,
				handleDelete,
				category,
				setCategory,
				listCategory,
				setListCategory,
				handleNew,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(Context);
};

export { Context, Storage };
