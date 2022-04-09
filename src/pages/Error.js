import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<>
			<h2>This page is Unavailable</h2>
			<Link to={"/"}>Wróć</Link>;
		</>
	);
};

export default Error;
