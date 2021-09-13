import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import useSWR from "swr";

import { UserProvider } from "../../../context/userContext";
import UserModal from "../../../components/UserModal";
import { useGetUsers } from "../../../hooks/useRequest";

import { fetcher } from "../../../helpers";

Modal.setAppElement("#__next");

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.userId;
  const pageId = router.query.pageId;
  const [userInfo, setUserInfo] = useState(null);

  const { data } = useSWR(
    `https://randomuser.me/api/?results=50&seed=abc&page=${pageId}`,
    fetcher
  );

  useEffect(() => {
    setUserInfo(data?.results.filter((user) => user.login.uuid === userId)[0]);
  }, [data]);

  if (!userInfo) return <div>Loading...</div>;

  return <UserModal userInfo={userInfo} />;
};

export default UserPage;
