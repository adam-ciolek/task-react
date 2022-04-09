import { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Filters from "./Filters";
import Total from "./Total";

import { useGlobalContext } from "../context";
import { useGlobalFilter } from "../filterContext";

const Items = () => {
	const { handleDelete } = useGlobalContext();
	const { filtredProduct, msg } = useGlobalFilter();

	// print table
	const print = useRef();
	const handlePrint = useReactToPrint({
		content: () => print.current,
	});

	if (!msg) {
		return <h2>Is Loading...</h2>;
	}

	if (filtredProduct.length === 0) {
		return (
			<>
				<Link to={"/"}>Menu główne</Link>
				<h2>I'm sorry but table is empty</h2>
			</>
		);
	}

	return (
		<>
			<Filters />
			<Link to={"/"}>Menu główne</Link>
			<div ref={print}>
				<table>
					<thead>
						<tr>
							<th>Nazwa produktu</th>
							<th>Opis</th>
							<th>Kategoria</th>
							<th>Ilość</th>
							<th>Cena</th>
							<th>Razem</th>
						</tr>
					</thead>
					{filtredProduct.map((item) => {
						const {
							element,
							description,
							option,
							amount,
							price,
							_id: id,
						} = item;
						return (
							<tbody key={id}>
								<tr>
									<td>{element}</td>
									<td>{description}</td>
									<td>{option}</td>
									<td>{amount}</td>
									<td>{price}</td>
									<td>{amount * price}</td>
									<td className="btn">
										<button>
											<Link to={`${id}`}>Zmień</Link>
										</button>
										<button onClick={() => handleDelete(id)}>Usuń</button>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
				<Total />
			</div>
			<button onClick={handlePrint}>Drukuj</button>
		</>
	);
};

export default Items;
