import SearchElement from "../components/Search";

export default function _Home () {

	return (
		<div className="flex flex-col w-vw h-svh">
			<div className="mx-auto my-8">
				<a href="/" className="underline">Homepage</a> WIP, here's <a href="/admin" className="underline">Admin UI</a>
			</div>
			<SearchElement/>
		</div>
	)
}
