import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ShortenedLink from "../components/ShortenedLink";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const links = trpc.useQuery(["links.getAll"]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
	links.refetch
  }, [showModal])

  return (
    <main className="min-h-screen flex flex-col justify-center">
		<div>
			<div className="flex justify-between mb-10">
				<h1 className="font-bold text-xl">Shortened Links</h1>
				<button className="border-solid border-[#d47fff] border-2 rounded-md bg-[#d47fff]" type="button" onClick={() => setShowModal(true)}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			</div>
			<table className="table-auto w-full border-collapse border border-[#d47fff] rounded-md">
				<thead className="text-left">
					<tr>
						<th className="border border-[#d47fff] p-4 font-extrabold text-xl">Link</th>
						<th className="text-right border border-[#d47fff] p-4 font-extrabold text-xl">Slug</th>
					</tr>
				</thead>
				<tbody>
					{links.data ? links.data.map(link => {
						return (
							<ShortenedLink link={link} key={link.id} />
						)
					}) : (
						<tr>
							<td>Loading...</td>
							<td>Loading...</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
		{showModal ? <Modal setShowModal={setShowModal}/> : null}
    </main>
  );
};

export default Home;