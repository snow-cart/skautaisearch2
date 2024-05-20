import Cards from "../components/Card";
import { useState, useEffect } from "react";

export default function Home () {

	const [data, setData] = useState([]);


	useEffect(() => {
		fetch('http://bonk.lt:8005/api/items')
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
			<div className="mx-auto my-8">
				<a href="/" className="underline">Homepage</a> WIP, here's <a href="/admin" className="underline">Admin UI</a>
			</div>
			<Cards data={data}/>
		</div>
	)
}
