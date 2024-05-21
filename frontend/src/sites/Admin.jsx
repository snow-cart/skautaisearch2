import Cards from './../components/Card';
import { useState, useEffect, useRef } from "react";

export default function Admin () {
	const authCodeRef = useRef(null);
	const [authCode, setAuthCode] = useState("");
	function handleSubmit () {
		let formData = new FormData (document.querySelector("form"));
		let data = [...formData.entries()];
		let emptyField = false;
		let emptyFields = [];
		for (let i=0; i<data.length; i++) {
		 	if (data[i][1]==='') {
				emptyField = true;
				emptyFields.push(i);
			}
		}
		if (emptyField===true) {
			console.error("Empty fields", emptyFields);
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
    	}).catch(err => console.error(err))
	}

	function handleAuth () {
		setAuthCode(authCodeRef.current.value);
	}

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
	<div className='flex flex-col'>
		<div>
			<input ref={authCodeRef} placeholder='Slaptasis kodas...' type="password" name="authCode" className='m-auto h-6 w-40 py-2' ></input>
			<button type='button' onClick={handleAuth}>O</button>

		</div>
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
		<Cards data={data} admin={true} authCode={authCode}/>
	</div>
	);
}
