import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import useSWRInfinite from "swr/infinite";

import CopyUrlButton from "../../components/CopyUrlButton";

Modal.setAppElement("#__next");

const fetcher = (url) => fetch(url).then((r) => r.json());

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const userId = router.query.userId;

  function handleCloseModal() {
    setIsOpen(false);
    router.push("/", "/", { shallow: true });
  }

  const { data, size, setSize } = useSWRInfinite(
    (index) =>
      `https://randomuser.me/api/?results=10&seed=abc&page=${index + 1}`,
    fetcher
  );

  let user;

  if (data) {
    data.map((page) => {
      user = page.results.filter((user) => user.login.uuid === userId)[0];
    });
    console.log(user);
  }

  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => router.push("/", "/", { shallow: true })}
        contentLabel="User details modal"
        shouldReturnFocusAfterClose={true}
      >
        {user && (
          <div>
            <Image src={user.picture.large} height="128" width="128" />
            <p>
              {user.name.first} {user.name.last}
            </p>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <p>{user.dob.date}</p>
            <p>
              {user.phone} / {user.cell}
            </p>
            <p>nacionalidade: {user.nat}</p>
            <br />
            <p>
              {user.location.street.name}, {user.location.street.number}
              <br />
              {user.location.city} - {user.location.state} /{" "}
              {user.location.country}
            </p>
            <p>{user.login.uuid}</p>

            <CopyUrlButton url={window.location.href} />

            <button onClick={() => handleCloseModal()}>Close</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserPage;
