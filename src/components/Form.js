import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useGlobalContext } from "../context";

const Form = () => {
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState({ msg: "", type: false });
	const [addItem, setAddItem] = useState(false);

	const {
		element,
		setElement,
		description,
		setDescription,
		option,
		setOption,
		price,
		setPrice,
		amount,
		setAmount,
		category,
		setCategory,
		fetchData,
		listCategory,
		handleNew,
	} = useGlobalContext();

	//  Post new item
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if ((element, description, option, price, amount) && option !== "") {
				axios
					.post("http://localhost:5000/api/items", {
						element,
						description,
						option,
						price,
						amount,
					})
					.then((res) => {
						fetchData();
					})
					.catch((error) => {
						console.log(error);
					});

				setElement("");
				setDescription("");
				setOption("");
				setPrice("");
				setAmount("");
				setMsg({ msg: "", type: false });
				setAddItem(true);
			} else {
				setMsg({ msg: "Proszę wybrać kategorię", type: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		localStorage.setItem("category", JSON.stringify(listCategory));
		// eslint-disable-next-line
	}, [listCategory]);

	useEffect(() => {
		const time = setTimeout(() => {
			setAddItem(false);
		}, 2000);
		return () => {
			clearTimeout(time);
		};
	}, [addItem]);

	return (
		<>
			<Link to={"/table"}>Tabela</Link>
			<form onSubmit={handleSubmit}>
				{addItem && <h4 className="updateText">Dodano Przedmiot</h4>}
				<label htmlFor="element">Nazwa produktu</label>
				<input
					id="element"
					type="text"
					value={element}
					onChange={(e) => setElement(e.target.value)}
					required
				/>
				<label htmlFor="desc">Opis</label>
				<input
					id="desc"
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<label>
					Kategoria:
					<br></br>
					<select value={option} onChange={(e) => setOption(e.target.value)}>
						<option value="oprogramowanie">oprogramowanie</option>
						<option value="podzespoły komputera">pozespoły komputera</option>
						<option value="urządzenia peryferyjne">
							urządzenia peryferyjne
						</option>
						{listCategory.length > 0 &&
							listCategory.map((el, index) => {
								return <option key={index}>{el}</option>;
							})}
					</select>
				</label>
				<span className="new-category" onClick={() => setOpen(!open)}>
					<BiPlus />
				</span>
				{!msg ? null : <h4>{msg.msg}</h4>}
				<br></br>
				<br></br>
				<label htmlFor="price">Cena</label>
				<input
					id="price"
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min="0"
					required
				/>
				<label htmlFor="amount">Ilość sztuk</label>
				<input
					id="amount"
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					min="1"
					required
				/>
				<input type="submit" value="Dodaj" />
			</form>
			{open && (
				<form className="add-category" onClick={(e) => handleNew(e)}>
					<div className="btn" onClick={() => setOpen(!open)}>
						<GrFormClose />
					</div>
					<h4>Dodaj nowa kategorie</h4>
					<input
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
					<input type="submit" value="dodaj" />
				</form>
			)}
		</>
	);
};

export default Form;
