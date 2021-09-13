import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "react-modal";
import CopyUrlButton from "./CopyUrlButton";
import { UserContext } from "../context/userContext";

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
    >
      <div>
        <Image src={userInfo.picture.large} height="128" width="128" />
        <p>
          {userInfo.name.first} {userInfo.name.last}
        </p>
        <p>{userInfo.email}</p>
        <p>{userInfo.gender}</p>
        <p>{userInfo.dob.date}</p>
        <p>
          {userInfo.phone} / {userInfo.cell}
        </p>
        <p>nacionalidade: {userInfo.nat}</p>
        <br />
        <p>
          {userInfo.location.street.name}, {userInfo.location.street.number}
          <br />
          {userInfo.location.city} - {userInfo.location.state} /{" "}
          {userInfo.location.country}
        </p>
        <p>{userInfo.login.uuid}</p>

        <CopyUrlButton url={window.location.href} />

        <button onClick={() => handleCloseModal()}>Close</button>
      </div>
    </Modal>
  );
};

export default UserModal;
