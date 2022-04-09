import React from "react";
import { useGlobalContext } from "../context";
import { useGlobalFilter } from "../filterContext";

const Filters = () => {
	const { data } = useGlobalContext();
	const { handleFilter, sort, setSort, filtredProduct } = useGlobalFilter();

	// take unique value from data.option to make filter buttons
	let unique = [];
	data.map((el) => {
		return unique.push(el.option);
	});

	const unquieCategory = ["all", ...new Set(unique)];

	return (
		<>
			<h3 className="count-position">
				Ilość pozycji: ({filtredProduct.length})
			</h3>
			<div className="filter">
				{unquieCategory.map((el, index) => {
					return (
						<button
							className="filter-btn"
							key={index}
							id={el}
							onClick={(e) => handleFilter(e)}
						>
							{el}
						</button>
					);
				})}
				<div className="sort">
					<label htmlFor="sort">Filtruj przez:</label>
					<select
						id="sort"
						name="sort"
						value={sort}
						onChange={(e) => setSort(e.target.value)}
					>
						<option value="price-lowest">cena(od najmniejszej)</option>
						<option value="price-highest">cena(od najwiekszej)</option>
						<option value="name-a">nazwa (a-z)</option>
						<option value="name-z">nazwa (z-a)</option>
					</select>
				</div>
			</div>
		</>
	);
};

export default Filters;
