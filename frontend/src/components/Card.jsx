export function Card ({ data }) {
	const title = data.title;
	const author = data.author;
	const content = data.content;
	console.log("Card received: ", title);

	return(
		<div className="flex flex-col rounded bg-slate-300 m-3 p-4">
			<div className="font-semibold text-lg">{`${title}`}</div>
			<div className="font-light text-sm">{`${author}`}</div><br/>
			<div className="text-base">{`${content}`}</div>
		</div>
	);
}

export default function Cards ({ data }) {
	console.log("Card collection received: ", data);
	return (
		<div className="flex m-5 mb-auto min-w-96">
			{data.map(element => (
				<Card data={element}/>
			))}
		</div>
	);
}
