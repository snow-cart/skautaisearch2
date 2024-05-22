import Cards from './../components/Card';
import { useState, useEffect } from "react";
import { tryAuth } from '../scripts/auth';
import Login from '../components/Login';
import SearchElement from '../components/Search';

export default function Admin () {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [authCode, setAuthCode] = useState('');
	

	async function handleSubmitLogin (event) {
		event.preventDefault();
		const form = event.target.parentElement.parentElement;
		console.log(form);
		const formData = new FormData(form);
		const attemptAuthCode = formData.get('authCode');
		const isAuthenticated = await tryAuth(attemptAuthCode);
		if ( isAuthenticated === true ) {
			setAuthCode(attemptAuthCode);
			setLoggedIn(true);
			console.log("Logged in");
		} else {
			setLoggedIn(false);
			setAuthCode("");
			alert("Auth failed");
			console.log("Not logged in", tryAuth(attemptAuthCode));
		}
	};

	return (
		<>
		<div className="fixed top-10 right-10 p-2 px-3 bg-white rounded-lg border-2">
			<a href="/">Home</a>
		</div>
		{isLoggedIn 
			? (<AdminLoggedIn authCode={authCode}/>) 
			: (<Login handleSubmit={handleSubmitLogin}/>)}
		</>
	);
}

export function AdminLoggedIn ({authCode}) {

	function handleSubmit () {
		let formData = new FormData (document.querySelector("form"));
		let data = [...formData.entries()];
		console.log(data);
		let emptyField = false;
		let emptyFieldIndexes = [];
		let emptyFieldStr = `Found empty input fields in`;
		for (let i=0; i<data.length; i++) {
		 	if (data[i][1]==='') {
				emptyField = true;
				emptyFieldIndexes.push(i);
				switch(i) {
					case 0:
						emptyFieldStr+=` title,`;
						break;
					case 1:
						emptyFieldStr+=` author,`;
						break;
					case 2:
						emptyFieldStr+=` content,`;
						break;
					default:
						emptyFieldStr+=` error,`;
				}
			}
		}
		emptyFieldStr = emptyFieldStr.slice(0, -1);
		if (emptyField===true) {
			console.error(emptyFieldStr);
			alert(emptyFieldStr);
			return -1;
		}
		let body = JSON.stringify({
				'authCode': authCode,
				'data': data
			});
		fetch('https://bonk.lt/api/items/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
    	}).then(() => {
			handleRefresh();
		}).catch(err => console.error(err))
	}

	const [data, setData] = useState([]);
	useEffect(() => {
		handleRefresh();
	}, []);

	const [isSearchToggle, __setSearchToggle] = useState(false);

	function setSearchToggle () {
		__setSearchToggle( !isSearchToggle );
	}

	function handleRefresh() {
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
	}

	return (
	<div className='flex flex-col w-full h-fit'>
		<form className='mx-auto m-4 my-6 bg-slate-300 w-fit p-2 rounded'>
			<div className='flex flex-row'>
				<button type="button" onClick={handleSubmit} className='m-1 p-1 px-2 rounded bg-green-400'> Pateikti </button><br/>
			</div>
			<input placeholder='Pavadinimas...' type="text" name="title" className='h-8 w-80 p-1 rounded'/><br/>
			<div className='h-1'/>
			<input placeholder='Autorius...' type="text" name="author" className='h-8 w-80 p-1 rounded'/><br/>
			<div className='h-1'/>
			<textarea placeholder='Dainos žodžiai...' type="text" name="content" className='h-96 w-80 p-1 rounded'/><br/>
		</form>

		<div className="fixed top-10 right-36 p-2 px-3 bg-white rounded-lg border-2">
			<label>toggleSearch </label>
			<input onClick={setSearchToggle} type="checkbox" />
		</div>
  		
		{isSearchToggle
			? (<SearchElement admin={true} authCode={authCode}/>)
			: (<Cards data={data} admin={true} authCode={authCode} handleRefresh={handleRefresh}/>)
		}
		
	</div>
	);
}
