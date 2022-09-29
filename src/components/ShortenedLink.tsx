import type { ShortLink } from "@prisma/client"
import { useState } from "react";

type ShortenedLinkComponent = {
    link: ShortLink
}

const ShortenedLink = ({link}: ShortenedLinkComponent) => {

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
    <tr key={link.id}>
        <td className="border border-[#d47fff] p-2 rounded-md"><a href={link.url}>{link.url}</a></td>
        <td className="text-right border border-[#d47fff] p-2 rounded-md"><button onClick={() => {handleCopyClick(`https://s.pointykone.com/${link.slug}`)}}><span>{isCopied ? 'Copied!' : link.slug}</span></button></td>
    </tr>
  )
}

export default ShortenedLink