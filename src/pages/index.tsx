import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Modal from "../components/CreateModal";
import ShortenedLink from "../components/ShortenedLink";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const links = trpc.useQuery(["links.getAll"]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);


  useEffect(() => {
    links.refetch();
  }, [showModal, showEditModal, showRemoveModal]);

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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </p>
          </div>
          <div className="overflow-scroll">
            {links.data ? (
              links.data.map((link) => {
                return <ShortenedLink key={link.id} setShowEditModal={setShowEditModal} showEditModal={showEditModal} setShowRemoveModal={setShowRemoveModal} showRemoveModal={showRemoveModal} link={link} />;
              })
            ) : (
              <div className="flex justify-between w-full">
                <p className="border-[#d47fff] border-r-2 flex-1 max-w-[65%] p-2">
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
