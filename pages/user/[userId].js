import Modal from "react-modal";
import UserModal from "../../components/UserModal";

Modal.setAppElement("#__next");

const UserPage = () => {
  return (
    <>
      <UserModal />
    </>
  );
};

export default UserPage;
