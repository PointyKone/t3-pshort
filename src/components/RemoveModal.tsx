import { ShortLink } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { LoadingButton } from "./LoadingButton";

type ModalType = {
  setShowRemoveModal: (value: boolean) => void;
  setShowEditModal: (value: boolean) => void;
  link: ShortLink;
};

const RemoveModal = ({ setShowRemoveModal, setShowEditModal, link }: ModalType) => {

	const mutation = trpc.useMutation(["links.delete"])

	const [isMounted, setIsMounted] = useState(false)

	const deleteLink = (id: number) => {
		mutation.mutate({
			id
		})
	}

	useEffect(() => {
		if (mutation.isSuccess) setShowRemoveModal(false)
	  }, [mutation.isSuccess])

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
				{/*content*/}
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-[#d47fff]">
							<h3 className="text-3xl font-semibold">Remove ShortLink</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={() => setShowRemoveModal(false)}
							>
								<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
								x
								</span>
							</button>
						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto text-black">
							Are you sure you want to remove this ShortLink?
						</div>
						{/*footer*/}
						<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
						<button
							className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => {
								setShowRemoveModal(false)
								setShowEditModal(true)
							}}
						>
							Close
						</button>
						<LoadingButton
							loading={mutation.isLoading}
							onClick={() => deleteLink(link.id)}
						>
							Remove ShortLink
						</LoadingButton>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
  	);
};

export default RemoveModal;


