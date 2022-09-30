import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Modal from "../components/CreateModal";
import ShortenedLink from "../components/ShortenedLink";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const links = trpc.useQuery(["links.getAll"]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);

  useEffect(() => {
    links.refetch();
  }, [showModal, showRemoveModal]);

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <div>
        <div className="flex justify-between mb-10">
          <h1 className="font-bold text-xl">Shortened Links</h1>
          <button
            className="border-solid border-[#d47fff] border-2 rounded-md bg-[#d47fff]"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`flex flex-col w-full border-[#d47fff] max-h-72  border-2 rounded-md rounded-t-md border-t-2`}
        >
          <div className="flex justify-between w-full">
            <p
              className={`${
                links.data?.length === 0 && !links.isLoading
                  ? "border-b-0 rounded-b-md"
                  : "border-b-2"
              } border-r-2 border-[#d47fff] flex-1 max-w-[65%] p-2 font-bold`}
            >
              URL
            </p>
            <p
              className={`${
                links.data?.length === 0 && !links.isLoading
                  ? "border-b-0 rounded-b-md"
                  : "border-b-2"
              } border-[#d47fff] border-r-2 flex-1 max-w-[35%] p-2 text-right font-bold`}
            >
              SLUG
            </p>
            <p
              className={`${
                links.data?.length === 0 && !links.isLoading
                  ? "border-b-0 rounded-b-md"
                  : "border-b-2"
              } border-[#d47fff] flex-1 max-w-[4.5%] p-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </p>
          </div>
          <div className="overflow-scroll">
            {links.data ? (
              links.data.map((link) => {
                return <ShortenedLink key={link.id} setShowRemoveModal={setShowRemoveModal} showRemoveModal={showRemoveModal} link={link} />;
              })
            ) : (
              <div className="flex justify-between w-full">
                <p className="border-2 border-[#d47fff] border-t-0 border-b-0 flex-1 max-w-[65%] p-2">
                  Loading...
                </p>
                <p className="flex-1 text-right border-2 border-t-0 border-b-0 border-l-0 border-[#d47fff] max-w-[35%] p-2">
                  Loading...
                </p>
                <p className="max-w-[4.5%] p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
    </main>
  );
};

export default Home;
