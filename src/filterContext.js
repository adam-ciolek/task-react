import React, { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./context";

const Filter = React.createContext();

const FilterStorage = ({ children }) => {
	const { data } = useGlobalContext();

	const [filtredProduct, setFiltredProduct] = useState();
	const [sort, setSort] = useState("price-lowest");
	const [total, setTotal] = useState("");
	const [msg, setMsg] = useState(false);

	// filter products by click btn
	const handleFilter = (e) => {
		// clone old data and put new one in new variable
		let newData = data;
		let temp = [];
		if (e.target.id === "all") {
			return setFiltredProduct(data);
		}
		if (e.target.id) {
			temp = newData.filter((el) => el.option === e.target.id);
			return setFiltredProduct(temp);
		}
		return setFiltredProduct(newData);
	};

	// filter product by sort
	React.useMemo(() => {
		if (filtredProduct) {
			let temp = [...filtredProduct];
			if (sort === "price-lowest") {
				temp = filtredProduct.sort((a, b) => a.price - b.price);
				return setFiltredProduct(temp);
			}
			if (sort === "price-highest") {
				temp = filtredProduct.sort((a, b) => b.price - a.price);
				return setFiltredProduct(temp);
			}
			if (sort === "name-a") {
				temp = filtredProduct.sort((a, b) => {
					return a.element.localeCompare(b.element);
				});
				return setFiltredProduct(temp);
			}
			if (sort === "name-z") {
				temp = filtredProduct.sort((a, b) => {
					return b.element.localeCompare(a.element);
				});
				return setFiltredProduct(temp);
			}
			return setFiltredProduct(temp);
		}
	}, [sort, filtredProduct]);

	// filter total amount
	const handleTotal = () => {
		if (data) {
			const totalValue = filtredProduct.reduce((total, item) => {
				const { amount, price } = item;
				total += price * amount;
				return total;
			}, 0);
			setTotal(totalValue);
		}
	};

	useEffect(() => {
		handleTotal();
		// eslint-disable-next-line
	}, [filtredProduct]);

	useEffect(() => {
		if (data) {
			setFiltredProduct(data);
			setMsg(true);
		}
	}, [data]);

	return (
		<Filter.Provider
			value={{
				handleFilter,
				filtredProduct,
				msg,
				total,
				sort,
				setSort,
			}}
		>
			{children}
		</Filter.Provider>
	);
};

export const useGlobalFilter = () => {
	return useContext(Filter);
};

export { Filter, FilterStorage };
