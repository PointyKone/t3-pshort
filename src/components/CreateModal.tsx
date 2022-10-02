import { useEffect, useState } from "react"
import { trpc } from "../utils/trpc"
import { LoadingButton } from "./LoadingButton"

type ModalType = {
    setShowModal: (value: boolean) => void
}

const Modal = ({setShowModal}: ModalType) => {

  const [url, setUrl] = useState("https://")
  const [slug, setSlug] = useState("")

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value)
  }

  const mutation = trpc.useMutation(["links.create"])

  const createNewLink = () => {
    mutation.mutate({slug, url})
  }

  useEffect(() => {
    if (mutation.isSuccess) setShowModal(false)
  }, [mutation.isSuccess])


  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t bg-[#d47fff]">
                  <h3 className="text-3xl font-semibold">
                    Create ShortLink
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label className="text-black m-4" htmlFor="url">Slug:</label>
                  <input className="text-black" name="url" type="text" onChange={handleSlugChange} placeholder="mysite"/>
                  <label className="text-black m-4" htmlFor="url">Goes To:</label>
                  <input className="text-black" name="url" type="text" onChange={handleUrlChange} value={url}/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <LoadingButton loading={mutation.isLoading} onClick={() => createNewLink()}>Create New ShortLink</LoadingButton>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  )
}

export default Modal