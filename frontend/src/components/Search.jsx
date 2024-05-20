import Cards from "../components/Card";
import { useState, useRef } from "react";

export default function SearchElement () {

	const [data, setData] = useState([]);

	function search(searchQuery) {
	
		fetch('https://bonk.lt/api/items/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				'searchQuery': `${searchQuery}`
			}
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
			<Cards data={data}/>
		</div>
	)
}

function Searchbar ({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");
	const searchQueryRef = useRef(null);

	function handleClick(){
		setSearchQuery(searchQueryRef.current.value);
		onSearch(searchQuery);
	}
	return (
		<div>
		<input ref={searchQueryRef}></input>
		<button onClick={handleClick}>O</button>
		</div>
	);
}
