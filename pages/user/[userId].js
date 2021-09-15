import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import useSWR from "swr";

import UserModal from "../../components/UserModal";

import { fetcher } from "../../helpers";

Modal.setAppElement("#__next");

const PAGE_SIZE = 50;

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.userId;
  const nat = router.query.nat;

  const [userInfo, setUserInfo] = useState(null);

  const page = Math.ceil(userId / PAGE_SIZE);
  const absolutePageIndex = (page - 1) * 50;
  const pageIndex = userId - absolutePageIndex;

  const { data } = useSWR(
    `https://randomuser.me/api/?results=50&seed=abc&page=${page}&${
      nat && `nat=${nat}`
    }`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUserInfo(data.results[pageIndex - 1]);
    }
  }, [data]);

  if (!userInfo) return <div>Loading...</div>;

  return <UserModal userInfo={userInfo} />;
};

export default UserPage;
