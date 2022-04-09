import { Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import Table from "./pages/Table";
import "./App.css";
import UpdateItem from "./components/UpdateItem";
import Error from "./pages/Error";

const App = () => {
	return (
		<div className="container">
			<Routes>
				<Route index path="/" element={<AddItem />} />
				<Route path="/table" element={<Table />} />
				<Route path="/table/:id" element={<UpdateItem />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
};

export default App;
