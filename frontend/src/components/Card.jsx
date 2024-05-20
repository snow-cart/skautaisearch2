function RemoveBtn ({ itemId, className }) {
	function handleClick(){
		console.log("(fake) Removing card with id ", itemId);
	}

	return(
		<button type="button" className={className} onClick={handleClick}>X</button>
	)
}

export function Card ({ data, admin=false}) {
	const id = data.id;
	const title = data.title;
	const author = data.author;
	const content = data.content;
	console.log("Card received: ", title);

	return(
		<div className="flex flex-col rounded bg-slate-300 m-3 p-4">
			<div className="flex flex-row w-full">
				<div className="font-semibold text-lg mr-auto">{`${title}`}</div>
				{admin && <RemoveBtn itemId={id} className="ml-auto pl-5"/>}
			</div>
			<div className="font-light text-sm">{`${author}`}</div><br/>
			<div className="text-base">{`${content}`}</div>
		</div>
	);
}

export default function Cards ({ data, admin=false }) {
	console.log("Card collection received: ", data);
	return (
		<div className="flex m-5 mb-auto min-w-96">
			{data.map(element => (
				<Card data={element} admin={admin}/>
			))}
		</div>
	);
}
