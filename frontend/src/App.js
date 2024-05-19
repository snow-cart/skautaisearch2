import './App.css';

// import { Items } from './components/Items.jsx';

export default function App () {


	function handleSubmit () {
		let formData = new FormData (document.querySelector("form"));
		let entries = [...formData.entries()];
		let authCode = entries[0][1];
		let data = entries.slice(1);
		let body = JSON.stringify({
				'authCode': authCode,
				'data': data
			});
		fetch('https://bonk.lt:8005/api/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
    	}).catch(err => console.error(err))
	}

	fetch('http://bonk.lt:8005/api/test')
		.then(response => {
			if (!response.ok)
				throw new Error("Fetch response not 'ok'")
			return response.json();
		})
		.then(data => {
			console.log(data);
			renderContent(data);
		})
		.catch(error => console.error(error));



	function renderContent(data){
		let elementHTMLs = ``;
		for (let i in data) {
			console.log(data[i]);
			const title = data[i].title;
			const author = data[i].author;
			const content = data[i].content

			elementHTMLs += `
			<div>
				The title is ${title}, author is ${author} and content is:
				${content} 
			</div>`
		}
		console.log(elementHTMLs);
		document.getElementById("storedItems").innerHTML=elementHTMLs
	}

	return (
	<div className='flex flex-col'>
		<form className='mx-auto m-4 my-6 bg-slate-300 w-fit p-2 rounded'>
			<div className='flex flex-row'>
				<button type="button" onClick={handleSubmit} className='m-1 p-1 px-2 rounded bg-green-400'> Pateikti </button><br/>
				<input placeholder='Slaptasis kodas...' type="password" name="authCode" className='m-auto h-6 w-40 py-2' ></input>

			</div>
			<input placeholder='Pavadinimas...' type="text" name="title" className='h-6 w-80 py-2'/><br/>
			<input placeholder='Autorius...' type="text" name="author" className='h-6 w-80 py-3'/><br/>
			<textarea placeholder='Dainos žodžiai...' type="text" name="content" className='h-96 w-80 py-2'/><br/>
		</form>
		<div id="storedItems">
		</div>
	</div>
	);
}
