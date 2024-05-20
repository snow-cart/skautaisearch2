import Cards from "../components/Card";
import { useState, useEffect } from "react";

export default function SearchElement () {

	const [data, setData] = useState([]);


	useEffect(() => {
		fetch('https://bonk.lt/api/items')
		.then(response => {
			if (!response.ok)
				throw new Error("Fetch response not 'ok'")
			return response.json();
		})
		.then(fetchData => {
			console.log("Fetched data,", fetchData);
			setData(fetchData);
		})
		.catch(error => console.error(error));
	}, []);

	return (
		<div className="flex flex-col w-vw h-svh">

			<Cards data={data}/>
		</div>
	)
}
