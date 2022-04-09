import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { Storage } from "./context";
import { FilterStorage } from "./filterContext";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
	<BrowserRouter>
		<Storage>
			<FilterStorage>
				<App />
			</FilterStorage>
		</Storage>
	</BrowserRouter>
);
