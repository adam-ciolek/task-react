import React from "react";
import { useGlobalFilter } from "../filterContext";

const Total = () => {
	const { total } = useGlobalFilter();

	return (
		<div className="sum">
			<hr></hr>
			<h4>
				Łączna suma: <span>${total}</span>
			</h4>
		</div>
	);
};

export default Total;
