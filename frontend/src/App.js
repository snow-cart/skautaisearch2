import './App.css';

export default function App () {

	function handleSubmit () {
		let formData = new FormData (document.querySelector("form"));

		let entries = [...formData.entries()];
		console.log(entries);

		fetch('http://localhost:8005/api/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(entries[0])
    	});
	}

	
	// fetch('http://localhost:8000/api/test')
	// 	.then(response => {
	// 		if (!response.ok)
	// 			throw new Error("Fetch response not 'ok'")
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		document.getElementById("testPull").textContent=data.title
	// 	})
	// 	.catch(error => console.error(error));

	return (
	<div className='flex flex-auto '>
		<form className='mx-auto m-4 mt-6 bg-slate-300 w-fit p-2 rounded'>
			<div className='flex flex-row'>
				<button type="button" onClick={handleSubmit} className='m-1 p-1 px-2 rounded bg-green-400'> Pateikti </button><br/>
				<input placeholder='Slaptasis kodas...' type="password" name="authCode" className='m-auto h-6 w-40 py-2' ></input>

			</div>
			<input placeholder='Pavadinimas...' type="text" name="title" className='h-6 w-80 py-2'/><br/>
			<input placeholder='Autorius...' type="text" name="author" className='h-6 w-80 py-3'/><br/>
			<textarea placeholder='Dainos žodžiai...' type="text" name="content" className='h-96 w-80 py-2'/><br/>
		</form>
	</div>
	);
}
