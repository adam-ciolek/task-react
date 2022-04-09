import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const UpdateItem = () => {
	const { id } = useParams();

	// change single item and  update old value a put new one
	const [newElement, setNewElement] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newAmount, setNewAmount] = useState("");
	const [newOption, setNewOption] = useState("");
	const [msgUpdate, setMsgUpdate] = useState(false);

	const { data, setIsLoad, fetchData, listCategory } = useGlobalContext();

	// take old value from single item
	const handleUpdateSingle = () => {
		setIsLoad(false);
		if (data) {
			axios
				.get(`http://localhost:5000/api/items/${id}`)
				.then((res) => {
					const { element, description, option, amount, price } =
						res.data.tasks;
					setNewElement(element);
					setNewDescription(description);
					setNewOption(option);
					setNewPrice(price);
					setNewAmount(amount);
					setIsLoad(true);
				})
				.catch((error) => console.log(error));
		}
	};

	useEffect(() => {
		if (data) {
			handleUpdateSingle();
		}
		// eslint-disable-next-line
	}, []);

	// update old value and put new one
	const handleUpdateItem = (e) => {
		e.preventDefault();
		if (data) {
			axios
				.patch(`http://localhost:5000/api/items/${id}`, {
					element: newElement,
					description: newDescription,
					option: newOption,
					amount: newAmount,
					price: newPrice,
				})
				.then((res) => {
					// refresh data to see changes in table
					setMsgUpdate(true);
					fetchData();
				})
				.catch((error) => console.log(error));
		}
	};

	useEffect(() => {
		const time = setTimeout(() => {
			setMsgUpdate(false);
		}, 2000);
		return () => {
			clearTimeout(time);
		};
	}, [msgUpdate]);

	return (
		<>
			<Link to={"/table"}>Tabela</Link>
			<form onSubmit={(e) => handleUpdateItem(e)}>
				{msgUpdate && <h4 className="updateText">Dodano zmiany</h4>}
				<label htmlFor="element">Nazwa produktu</label>
				<input
					id="element"
					type="text"
					value={newElement}
					onChange={(e) => setNewElement(e.target.value)}
				/>
				<label htmlFor="desc">Opis</label>
				<input
					id="desc"
					type="text"
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
				/>
				<label>
					Kategoria:
					<br></br>
					<select
						value={newOption}
						onChange={(e) => setNewOption(e.target.value)}
					>
						<option value="oprogramowanie">oprogramowanie</option>
						<option value="podzespoły komputera">podzespoły komputera</option>
						<option value="urządzenia peryferyjne">
							urządzenia peryferyjne
						</option>
						{listCategory.length > 0 &&
							listCategory.map((el, index) => {
								return <option key={index}>{el}</option>;
							})}
					</select>
				</label>
				<br></br>
				<br></br>
				<label htmlFor="price">Cena</label>
				<input
					id="price"
					type="number"
					value={newPrice}
					onChange={(e) => setNewPrice(e.target.value)}
					min="0"
				/>
				<label htmlFor="amount">Ilość sztuk</label>
				<input
					id="amount"
					type="number"
					value={newAmount}
					onChange={(e) => setNewAmount(e.target.value)}
					min="0"
				/>
				<input type="submit" value="Dodaj" />
			</form>
		</>
	);
};

export default UpdateItem;
