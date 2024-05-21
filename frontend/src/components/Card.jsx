function RemoveBtn ({ itemId, className, authCode }) {
	function handleClick(){
		console.log("Removing card with id ", itemId);

		let body = JSON.stringify({
			'authCode': authCode,
			'id': itemId
		});

		fetch('https://bonk.lt/api/items/remove', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		}).then( () => {
			console.log("Removed card with id ", itemId)
		}).catch(err => console.error(err))
	}

	return(
		<button type="button" className={className} onClick={handleClick}>X</button>
	)
}

export function Card ({ data, admin=false, authCode="", className=""}) {
	const id = data.id;
	const title = data.title;
	const author = data.author;
	const content = data.content;
	console.log("Card received: ", title);


	return(
		<div className="mx-auto flex flex-row">
		<div className={`w-[0.5em]`}></div>
		<div className={className + " flex flex-col rounded bg-slate-300 m-3 p-4"}>
			<div className="flex flex-row w-full">
				<div className="font-semibold text-lg mr-auto whitespace-nowrap">{`${title}`}</div>
				{admin && <RemoveBtn itemId={id} className="ml-auto pl-5" authCode={authCode}/>}
			</div>
			<div className="font-light text-sm whitespace-nowrap">{`${author}`}</div><br/>
			<div className="text-base whitespace-pre">{`${content}`}</div>
		</div>
		<div className={`w-[0.5em]`}></div>
		</div>
	);
}

export default function Cards ({ data, admin=false, authCode}) {
	console.log("Card collection received: ", data);
	return (
		<div className="flex flex-wrap mb-auto w-full">
			<div className='w-[5vw]'></div>
			{data.map(element => (
				<Card data={element} admin={admin} authCode={authCode} className="mx-auto"/>
			))}
			<div className='w-[5vw]'></div>
		</div>
	);
}
