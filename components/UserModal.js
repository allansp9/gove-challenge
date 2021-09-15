import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "react-modal";
import CopyUrlButton from "./buttons/CopyUrlButton";
import { format } from "date-fns";
import Navbar from "./Navbar";

Modal.setAppElement("#__next");

const UserModal = ({ userInfo }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const userId = router.query.userId;

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/", "/", { shallow: true });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => router.push("/", "/", { shallow: true })}
      contentLabel="User details modal"
      shouldReturnFocusAfterClose={true}
      className="bg-white w-[400px] h-[550px] mt-28 border-4 border-gray-400"
      overlayClassName="bg-gray-300 h-screen flex justify-center"
    >
      <div className="flex flex-col items-left pt-8">
        <div className="mb-2 self-center">
          <Image
            src={userInfo.picture.large}
            height="128"
            width="128"
            layout="fixed"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <p className="self-center mb-2">
            {userInfo.name.first} {userInfo.name.last}
          </p>

          <adress className="ml-5">
            E-mail: {userInfo.email}
            <br />
            Genre: {userInfo.gender}
            <br />
            Birthdate: {format(new Date(userInfo.dob.date), "dd/MM/yyyy")}
            <br />
            Phone: {userInfo.phone} / Cel: {userInfo.cell}
            <br />
            Nat: {userInfo.nat}
            <br />
            Street: {userInfo.location.street.name},{" "}
            {userInfo.location.street.number}
            <br />
            City/State: {userInfo.location.city} / {userInfo.location.state}
            <br />
            Country: {userInfo.location.country}
            <br />
            ID: {userId}
          </adress>
          <span className="mt-2 mb-8 flex space-x-2 self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
            <CopyUrlButton url={window.location.href} />
          </span>
        </div>

        <div className="self-center">
          <button
            onClick={() => handleCloseModal()}
            className="rounded bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-900 p-2"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
