import SearchElement from "../components/Search";

export default function Home () {

	return (
		<div className="mt-24 flex flex-col w-vw h-svh">
			<SearchElement/>

			<div className="fixed top-10 right-10 p-2 px-3 bg-white rounded-lg border-2">
				<a href="/admin">Admin</a>
			</div>
		</div>
	)
}
