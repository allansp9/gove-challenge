import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import useSWR from "swr";

import { UserContext, UserProvider } from "../../context/userContext";
import UserModal from "../../components/UserModal";
import { useGetUsers } from "../../hooks/useRequest";

import { fetcher } from "../../helpers";

Modal.setAppElement("#__next");

const PAGE_SIZE = 50;

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.userId;
  const [userInfo, setUserInfo] = useState(null);

  const { natValue } = useContext(UserContext);

  const page = Math.ceil(userId / PAGE_SIZE);
  const absolutePageIndex = (page - 1) * 50;
  const pageIndex = userId - absolutePageIndex;

  const userIndex = Math.ceil(userId / pageIndex);
  console.log("userId: " + userId);
  console.log("page: " + page);
  console.log("absolutePageIndex: " + absolutePageIndex);
  console.log("pageIndex: " + pageIndex);

  const { data } = useSWR(
    `https://randomuser.me/api/?results=${PAGE_SIZE}&seed=abc&page=${page}&nat=${natValue}`,
    fetcher
  );

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if (data) {
      setUserInfo(data.results[pageIndex - 1]);
    }
  }, [data]);

  if (!userInfo) return <div>Loading...</div>;

  // console.log(userInfo);

  return <UserModal userInfo={userInfo} />;
};

export default UserPage;
