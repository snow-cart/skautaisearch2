import Cards from "../components/Card";
import { useState, useRef } from "react";

export default function SearchElement ({ admin=false, authCode=""}) {

	const [data, setData] = useState([]);

	function search(searchQuery) {

		let body=JSON.stringify({
			'searchQuery': searchQuery
		});
	
		fetch('https://bonk.lt/api/items/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
    	})
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
	}

	return (
		<div className="flex flex-col w-vw h-svh">
			<Searchbar onSearch={search}/>
			<Cards data={data} admin={admin} authCode={authCode} handleRefresh={search}/>
		</div>
	)
}

function Searchbar ({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	function handleClick(event){
		event.preventDefault();
		const form = event.currentTarget.parentElement;
		const formData = new FormData(form)
		let data = [...formData.entries()];
		setSearchQuery(data[0][1]);
		onSearch(searchQuery);
	}
	return (
	<form class="flex items-center max-w-sm mx-auto rounded bg-slate-300 p-2 px-3">
		<input type="text" name="searchQuery" placeholder="placeholder" className="rounded" required /> 

		<button type="submit" onClick={handleClick} class="p-2.5 ms-2 text-sm font-medium">
			<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
			</svg>
			<span class="sr-only">Search</span>
		</button>
	</form>);
}
