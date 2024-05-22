import Cards from "../components/Card";
import { useState, useEffect } from "react";

export default function Home () {

	const [data, setData] = useState([]);


	useEffect(() => {
		fetch('https://bonk.lt/api/items/all')
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
		<div className="mt-24 flex flex-col w-vw h-svh">
			<Cards data={data}/>

			<div className="fixed top-10 right-10 p-2 px-3 bg-white rounded-lg border-2">
				<a href="/admin">Admin</a>
			</div>
		</div>
	)
}
