import type { ShortLink } from "@prisma/client"
import { useState } from "react";
import EditModal from "./EditModal";
import RemoveModal from "./RemoveModal";

type ShortenedLinkComponent = {
    link: ShortLink
    showEditModal: boolean
    setShowEditModal: (value: boolean) => void
	showRemoveModal: boolean
    setShowRemoveModal: (value: boolean) => void
}

const ShortenedLink = ({link, setShowEditModal, showEditModal, setShowRemoveModal, showRemoveModal}: ShortenedLinkComponent) => {

    const [isCopied, setIsCopied] = useState<boolean>(false);

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
      }
    
      // onClick handler function for the copy button
      const handleCopyClick = (text: string) => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(text)
          .then(() => {
            // If successful, update the isCopied state value
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
          });
      }


  	return (
    	<div className="flex justify-between w-full">
			<a href={link.url} className="border-r-2 border-[#d47fff] flex-1 max-w-[65%] p-2">{link.url}</a>
			<button onClick={() => handleCopyClick(`https://s.pointykone.com/${link.slug}`)} className="flex-1 text-right border-[#d47fff] border-r-2 max-w-[35%] p-2"><span>{isCopied ? "Copied!" : link.slug}</span></button>
			<button className="p-2 max-w-[4.5%]" onClick={() => setShowEditModal(true)}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>
			</button>
			{showEditModal ? <EditModal setShowModal={setShowEditModal} setShowRemoveModal={setShowRemoveModal} link={link} /> : null}
			{showRemoveModal ? <RemoveModal setShowRemoveModal={setShowRemoveModal} setShowEditModal={setShowEditModal} link={link} /> : null}
    	</div>
  )
}

export default ShortenedLink
